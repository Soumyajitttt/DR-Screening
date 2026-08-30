function [status, score, imgOut] = assessQuality(img)
    gray = rgb2gray(img);

    % Sharpness: Laplacian variance
    lap = fspecial('laplacian');
    sharpness = var(double(imfilter(gray, lap)), 0, 'all');

    % Brightness/contrast
    meanBrightness = mean(gray(:));
    contrastVal = std(double(gray(:)));

    % Field of view: is there a proper circular retina, not mostly black?
    mask = gray > 10;
    fovRatio = sum(mask(:)) / numel(mask);

    % Simple scoring — tune thresholds against a few sample images first
    score = 0;
    if sharpness > 50,  score = score + 1; end
    if meanBrightness > 40 && meanBrightness < 220, score = score + 1; end
    if contrastVal > 20, score = score + 1; end
    if fovRatio > 0.6,  score = score + 1; end

    if score == 4
        status = 'pass'; imgOut = img;
    elseif score >= 2
        status = 'enhanced'; imgOut = enhanceImage(img);
    else
        status = 'reject'; imgOut = [];
    end
end

function out = enhanceImage(img)
    img = im2double(img);   % work in a consistent 0-1 range throughout

    labImg = rgb2lab(img);
    L = labImg(:,:,1) / 100;
    Lclahe = adapthisteq(L);                 % CLAHE
    labImg(:,:,1) = Lclahe * 100;
    out = lab2rgb(labImg);
    out = max(min(out, 1), 0);               % clip to valid range

    % Illumination normalization: scale each region toward the average
    % brightness, clipped so no region gets pushed to extremes
    gray = rgb2gray(out);
    bg = imopen(gray, strel('disk', 40));
    correction = mean(bg(:)) ./ (bg + 1e-6);
    correction = min(max(correction, 0.7), 1.3);
    for c = 1:3
        out(:,:,c) = out(:,:,c) .* correction;
    end
    out = max(min(out, 1), 0);

    % Denoise
    out = imbilatfilt(out);
end