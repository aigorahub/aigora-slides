// src/js/components/predictive-tool.js

export function initPredictiveTool(toolContainerElement, tfInstance) {
    if (!toolContainerElement) {
        console.error("Predictive tool container not found.");
        return;
    }
    if (!tfInstance) {
        console.error("TensorFlow.js instance (tf) not provided.");
        return;
    }

    const saltinessSlider = toolContainerElement.querySelector('input[name="saltiness"]');
    const crunchinessSlider = toolContainerElement.querySelector('input[name="crunchiness"]');
    const saltinessValueDisplay = toolContainerElement.querySelector('span[id^="saltinessValue-"]');
    const crunchinessValueDisplay = toolContainerElement.querySelector('span[id^="crunchinessValue-"]');
    const predictionResultDisplay = toolContainerElement.querySelector('span[id^="predictionResult-"]');
    const statusDisplay = toolContainerElement.querySelector('div[id^="predictiveToolStatus-"]');

    if (!saltinessSlider || !crunchinessSlider || !predictionResultDisplay || !saltinessValueDisplay || !crunchinessValueDisplay || !statusDisplay) {
        console.error("One or more elements for the predictive tool are missing in the container:", toolContainerElement);
        return;
    }

    let model = null;
    let isLoadingModel = false;

    let lastSaltiness = parseInt(saltinessSlider.value, 10);
    let lastCrunchiness = parseInt(crunchinessSlider.value, 10);

    const correlationFactor = 0.5;
    const maxNudgeAbsolute = 25;

    async function createAndCompileModel() {
        const newModel = tfInstance.sequential();
        newModel.add(tfInstance.layers.dense({ inputShape: [2], units: 10, activation: 'relu' }));
        newModel.add(tfInstance.layers.dense({ units: 1, activation: 'sigmoid' }));
        newModel.compile({
            optimizer: tfInstance.train.adam(0.01),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });
        return newModel;
    }

    async function loadModel() {
        if (model) return model;
        isLoadingModel = true;
        statusDisplay.textContent = "Loading model...";
        console.log("Predictive tool: Creating and compiling model...");
        try {
            model = await createAndCompileModel();
            const xs = tfInstance.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]], [4, 2]);
            const ys = tfInstance.tensor2d([[0], [1], [1], [0]], [4, 1]);
            await model.fit(xs, ys, {
                epochs: 10,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}`);
                    }
                }
            });
            xs.dispose();
            ys.dispose();
            console.log("Predictive tool: Model trained and ready.");
            statusDisplay.textContent = "Model loaded. Adjust sliders to see predictions.";
            isLoadingModel = false;
            return model;
        } catch (error) {
            console.error("Error loading or training model:", error);
            statusDisplay.textContent = "Error loading model.";
            isLoadingModel = false;
            return null;
        }
    }

    async function predictPreference(saltiness, crunchiness) {
        if (!model) {
            statusDisplay.textContent = "Model not loaded yet. Please wait.";
            console.warn("Prediction attempted before model was loaded.");
            return null;
        }
        if (isLoadingModel) {
            statusDisplay.textContent = "Model is still loading. Please wait.";
            return null;
        }
        statusDisplay.textContent = "Predicting...";
        try {
            const inputTensor = tfInstance.tensor2d([[saltiness / 100, crunchiness / 100]], [1, 2]);
            const prediction = model.predict(inputTensor);
            const preferenceScore = await prediction.data();
            inputTensor.dispose();
            prediction.dispose();
            statusDisplay.textContent = "";
            return (preferenceScore[0] * 100).toFixed(2);
        } catch (error) {
            console.error("Error during prediction:", error);
            statusDisplay.textContent = "Error making prediction.";
            return null;
        }
    }

    async function updatePrediction() {
        const salt = parseInt(saltinessSlider.value, 10);
        const crunch = parseInt(crunchinessSlider.value, 10);

        saltinessValueDisplay.textContent = salt;
        crunchinessValueDisplay.textContent = crunch;

        if (!model && !isLoadingModel) {
            await loadModel();
        }

        if (model) {
            const score = await predictPreference(salt, crunch);
            if (score !== null) {
                predictionResultDisplay.textContent = `${score}%`;
            } else {
                predictionResultDisplay.textContent = "Error";
            }
        } else {
            predictionResultDisplay.textContent = "N/A (Model loading...)";
        }
    }

    function handleSliderChange(sourceSlider, targetSlider, isSaltinessSource) {
        const sourceValue = parseInt(sourceSlider.value, 10);
        let currentTargetValue = parseInt(targetSlider.value, 10);
        let delta;

        if (isSaltinessSource) {
            saltinessValueDisplay.textContent = sourceValue;
            delta = sourceValue - lastSaltiness;
            lastSaltiness = sourceValue;
        } else {
            crunchinessValueDisplay.textContent = sourceValue;
            delta = sourceValue - lastCrunchiness;
            lastCrunchiness = sourceValue;
        }

        if (Math.abs(delta) > 0) {
            let nudgeAmount = delta * correlationFactor;
            nudgeAmount = Math.max(-maxNudgeAbsolute, Math.min(maxNudgeAbsolute, nudgeAmount));

            let newTargetValue = Math.round(currentTargetValue + nudgeAmount);
            newTargetValue = Math.max(0, Math.min(100, newTargetValue));

            targetSlider.value = newTargetValue;

            if (isSaltinessSource) {
                lastCrunchiness = newTargetValue;
                crunchinessValueDisplay.textContent = newTargetValue;
            } else {
                lastSaltiness = newTargetValue;
                saltinessValueDisplay.textContent = newTargetValue;
            }
        }
        updatePrediction();
    }

    saltinessSlider.addEventListener('input', () => {
        handleSliderChange(saltinessSlider, crunchinessSlider, true);
    });

    crunchinessSlider.addEventListener('input', () => {
        handleSliderChange(crunchinessSlider, saltinessSlider, false);
    });

    loadModel().then(() => {
        lastSaltiness = parseInt(saltinessSlider.value, 10);
        lastCrunchiness = parseInt(crunchinessSlider.value, 10);
        updatePrediction();
    }).catch(error => {
        console.error("Failed to initialize predictive tool model:", error);
        predictionResultDisplay.textContent = "Error";
        statusDisplay.textContent = "Failed to load model.";
    });

    return () => {
        console.log("Cleaning up predictive tool for:", toolContainerElement.id);
        if (model) {
            console.log("Predictive model kept in memory for potential reuse.");
        }
    };
}
