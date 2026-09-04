function generateGradCAM(drNet, imgResized, predictedLabel, outputPath, imgFull)
% Generates a Grad-CAM heatmap overlay showing which regions of the image
% the network focused on to reach its prediction, and saves it as a PNG.
%
% imgResized : the 224x224 image that was fed to the classifier
% imgFull    : the full-resolution enhanced image (used for a smooth,
%              high-quality overlay instead of a blocky 224x224 one)

    map = gradCAM(drNet, imgResized, predictedLabel);

    % Resize the heatmap up to full resolution with smooth interpolation
    mapFull = imresize(map, [size(imgFull,1) size(imgFull,2)], 'bilinear');

    grayFull = rgb2gray(imgFull);
    fovMask = imerode(grayFull > 10, strel('disk', round(size(imgFull,1) * 0.02)));
    mapFull(~fovMask) = 0;

    % Feather the mask edge so the heat fades smoothly instead of a hard cutoff
    fovMaskSoft = imgaussfilt(double(fovMask), round(size(imgFull,1) * 0.01));

    mapNorm = mat2gray(mapFull);
    heatmapRGB = ind2rgb(im2uint8(mapNorm), jet(256));

    alpha = 0.4 * fovMaskSoft;
    baseImg = im2double(imgFull);

    overlay = baseImg .* (1 - alpha) + heatmapRGB .* alpha;
    imwrite(im2uint8(overlay), outputPath);
end