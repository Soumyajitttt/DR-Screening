function runPipelineForWeb(imagePath, outputDir)
% Called from the web backend via: matlab -batch "runPipelineForWeb('img.jpg','outdir')"
% Writes result.json (+ enhanced.png) into outputDir.

    img = imread(imagePath);
    [status, score, imgOut] = assessQuality(img);

    result.status = status;
    result.score = score;

    if strcmp(status, 'reject')
        fid = fopen(fullfile(outputDir, 'result.json'), 'w');
        fprintf(fid, '%s', jsonencode(result));
        fclose(fid);
        return;
    end

    imgOut = im2uint8(imgOut);   % normalize to a consistent 0-255 range regardless of pass/enhanced branch
    imwrite(imgOut, fullfile(outputDir, 'enhanced.png'));

    % --- Segmentation (Module 2) ---
    [discCenter, discMask] = findOpticDisc(imgOut);
    vesselMask = segmentVessels(imgOut);
    exMask = detectExudates(imgOut, discMask);
    [maMask, hemMask] = detectDarkLesions(imgOut, discMask, vesselMask);

    result.maCount = numel(regionprops(maMask, 'Area'));
    result.hemCount = numel(regionprops(hemMask, 'Area'));
    result.exudateCount = numel(regionprops(exMask, 'Area'));

    % --- Classification (Module 3) ---
    load('models/drNet.mat', 'drNet');
    imgResized = imresize(imgOut, [224 224]);
    [predictedLabel, scores] = classify(drNet, imgResized);
    result.grade = double(string(predictedLabel));
    result.confidence = max(scores);
    generateGradCAM(drNet, imgResized, predictedLabel, fullfile(outputDir, 'gradcam.png'), imgOut);

    fid = fopen(fullfile(outputDir, 'result.json'), 'w');
    fprintf(fid, '%s', jsonencode(result));
    fclose(fid);
end