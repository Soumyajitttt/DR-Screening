function exMask = detectExudates(img, discMask)
    labImg = rgb2lab(img);
    bMap = labImg(:,:,3);
    bw = bMap > prctile(bMap(:), 97);
    bw = bw & ~imdilate(discMask, strel('disk', 20));
    exMask = bwareaopen(bw, 20);
end