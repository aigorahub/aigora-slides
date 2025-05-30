// src/js/components/word-cloud.js

// Sample descriptors and brand colors from WordCloudDisplay.tsx
const sampleDescriptors = [
    "Innovative", "Synergy", "Insightful", "Dynamic", "Strategy", "Solution",
    "Agile", "Robust", "Scalable", "User-centric", "Disruptive", "Optimize",
    "Efficiency", "Engagement", "Analytics", "Framework", "Integration", "Cloud",
    "Big Data", "AI-driven", "Machine Learning", "Blockchain", "Cybersecurity",
    "IoT", "Digital Transformation", "Customer Experience", "Personalization",
    "Sustainability", "Eco-friendly", "Growth Hacking", "ROI", "KPI"
];

const AigoraColorPalette = {
    sgBlue: '#0066FF',       // Strong Blue
    darkBlue: '#003399',     // Dark Blue
    sgGreen: '#00CC66',      // Strong Green
    neutralGrey: '#808080',  // Neutral Grey
    lightGrey: '#D3D3D3',    // Light Grey
    accentOrange: '#FF9900', // Accent Orange
    accentPurple: '#9900FF', // Accent Purple
};

const brandColors = [
    AigoraColorPalette.sgBlue,
    AigoraColorPalette.darkBlue,
    AigoraColorPalette.sgGreen,
    AigoraColorPalette.neutralGrey,
    AigoraColorPalette.accentOrange,
    AigoraColorPalette.accentPurple,
];

function getRandomColor() {
    return brandColors[Math.floor(Math.random() * brandColors.length)];
}

function generateWordCloudList(numWords = 20) {
    const list = [];
    const usedDescriptors = new Set();
    for (let i = 0; i < numWords; i++) {
        let descriptor;
        do {
            descriptor = sampleDescriptors[Math.floor(Math.random() * sampleDescriptors.length)];
        } while (usedDescriptors.has(descriptor) && usedDescriptors.size < sampleDescriptors.length);
        usedDescriptors.add(descriptor);
        list.push([descriptor, Math.floor(Math.random() * 50) + 10, getRandomColor()]);
    }
    return list;
}


let wordCloudIntervalId = null; // To keep track of the interval

export function initWordCloud(canvasElement) {
    if (!canvasElement) {
        console.error("Word cloud canvas not found.");
        return;
    }

    if (typeof WordCloud !== 'function') {
        console.error("WordCloud library is not loaded.");
        return;
    }

    // Clear any existing interval to prevent multiple instances on re-init
    if (wordCloudIntervalId) {
        clearInterval(wordCloudIntervalId);
        wordCloudIntervalId = null;
    }

    const drawWordCloud = () => {
        const wordList = generateWordCloudList().map(item => [item[0], item[1]]); // WordCloud expects [word, size]

        // Check if canvas is still in the DOM
        if (!document.body.contains(canvasElement)) {
            if (wordCloudIntervalId) clearInterval(wordCloudIntervalId);
            return;
        }

        WordCloud(canvasElement, {
            list: wordList,
            gridSize: Math.round(8 * canvasElement.width / 1024), // Reduced gridSize for denser cloud
            weightFactor: function (size) {
                return Math.pow(size, 1.7) * canvasElement.width / 400; // Try to make words larger
            },
            fontFamily: 'Roboto, sans-serif',
            color: function (word, weight, fontSize, distance, theta) {
                // Find the original color from our generated list if needed, or apply new logic
                // For simplicity, let's use a random brand color for each word
                return getRandomColor();
            },
            backgroundColor: '#f0f0f0', // Light grey background
            rotateRatio: 0.5, // Allow 50% of words to be rotated
            minSize: 10, // Minimum font size
            wait: 50, // Time to wait between drawing each word
            // shape: 'circle', // Can be 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        });
    };

    drawWordCloud(); // Initial draw

    // Set up interval to regenerate word cloud
    wordCloudIntervalId = setInterval(drawWordCloud, 7000); // Regenerate every 7 seconds

    // Return a cleanup function if needed by the caller
    return () => {
        if (wordCloudIntervalId) {
            clearInterval(wordCloudIntervalId);
            wordCloudIntervalId = null;
        }
        // Potentially clear the canvas if WordCloud lib doesn't do it
        const ctx = canvasElement.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
    };
}
