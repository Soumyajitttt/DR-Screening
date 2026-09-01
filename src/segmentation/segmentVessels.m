function vesselMask = segmentVessels(img)
    green = img(:,:,2);
    response = fibermetric(green, [2 4 6], 'ObjectPolarity', 'bright');
    vesselMask = response > 0.15;
    vesselMask = bwareaopen(vesselMask, 30);
end