function exMask = detectExudates(img, discMask)
    labImg = rgb2lab(img);
    bMap = labImg(:,:,3);
    bw = bMap > prctile(bMap(:), 99.5);
    bw = bw & ~imdilate(discMask, strel('disk', 20));
    exMask = bwareaopen(bw, 50);
end