% trainClassifier.m — IDRiD Disease Grading dataset

T = readtable('data/raw/idrid/idrid_labels.csv');

imgFolder = 'data/raw/idrid/Imagenes/Imagenes';
filenames = fullfile(imgFolder, strcat(string(T.id_code), '.jpg'));
labels = categorical(T.diagnosis);

imds = imageDatastore(filenames, 'Labels', labels);
disp('Classes found:');
disp(countEachLabel(imds));

[trainImds, valImds] = splitEachLabel(imds, 0.8, 'randomized');

net = resnet50;
lgraph = layerGraph(net);

numClasses = numel(categories(imds.Labels));
newFC = fullyConnectedLayer(numClasses, 'Name', 'new_fc');
newClass = classificationLayer('Name', 'new_output');
lgraph = replaceLayer(lgraph, 'fc1000', newFC);
lgraph = replaceLayer(lgraph, 'ClassificationLayer_fc1000', newClass);

augTrain = augmentedImageDatastore([224 224], trainImds, 'ColorPreprocessing', 'gray2rgb');
augVal   = augmentedImageDatastore([224 224], valImds,   'ColorPreprocessing', 'gray2rgb');

options = trainingOptions('adam', ...
    'InitialLearnRate', 1e-4, ...
    'MaxEpochs', 15, ...
    'MiniBatchSize', 16, ...
    'ValidationData', augVal, ...
    'ValidationFrequency', 10, ...
    'Plots', 'training-progress', ...
    'Verbose', true);

drNet = trainNetwork(augTrain, lgraph, options);

if ~exist('models', 'dir')
    mkdir('models');
end
save('models/drNet.mat', 'drNet');
disp('Done — model saved to models/drNet.mat');