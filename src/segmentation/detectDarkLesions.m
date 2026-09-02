function [maMask, hemMask] = detectDarkLesions(img, discMask, vesselMask)
    green = img(:,:,2);
    tophat = imtophat(imcomplement(green), strel('disk', 8));
    bw = tophat > prctile(tophat(:), 99.9); 

    fovMask = imerode(green > 10, strel('disk', 15));
    bw = bw & ~imdilate(discMask, strel('disk', 15));
    bw = bw & ~imdilate(vesselMask, strel('disk', 2));
    bw = bw & fovMask;
    bw = bwareaopen(bw, 5);

    stats = regionprops(bw, 'Area', 'PixelIdxList');
    areas = [stats.Area];
    maMask = false(size(bw)); hemMask = false(size(bw));
    for i = 1:numel(stats)
        if areas(i) < 15
            maMask(stats(i).PixelIdxList) = true;
        elseif areas(i) < 200
            hemMask(stats(i).PixelIdxList) = true;
        end
    end
end