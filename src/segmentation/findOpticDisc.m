function [discCenter, discMask] = findOpticDisc(img)
    green = img(:,:,2);
    bw = green > prctile(green(:), 99);
    bw = bwareaopen(bw, 500);
    stats = regionprops(bw, 'Centroid', 'Area');
    [~, idx] = max([stats.Area]);
    discCenter = stats(idx).Centroid;
    discMask = bwlabel(bw) == idx;
end