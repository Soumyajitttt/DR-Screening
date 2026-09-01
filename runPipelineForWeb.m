function runPipelineForWeb(imagePath, outputDir)
    img = imread(imagePath);
    [status, score, imgOut] = assessQuality(img);

    result.status = status;
    result.score = score;

    if strcmp(status, 'enhanced') || strcmp(status, 'pass')
        imwrite(imgOut, fullfile(outputDir, 'enhanced.png'));
    end

    fid = fopen(fullfile(outputDir, 'result.json'), 'w');
    fprintf(fid, '%s', jsonencode(result));
    fclose(fid);
end