// src/js/components/radar-chart.js
// Verified: October 26, 2023

// import Chart from 'chart.js/auto'; // Removed this line

// Aigora brand colors
const AigoraColorPalette = {
    sgBlue: '#0066FF',
    sgBlueTransparent: 'rgba(0, 102, 255, 0.2)',
    darkBlue: '#003399', // Kept for reference, but Product B will use sgGreen
    darkBlueTransparent: 'rgba(0, 51, 153, 0.2)',
    sgGreen: '#00CC66',
    sgGreenTransparent: 'rgba(0, 204, 102, 0.2)',
    signalRed: '#DB2955', // Added for Product C
    signalRedTransparent: 'rgba(219, 41, 85, 0.2)', // Added for Product C
    neutralGrey: 'rgba(128, 128, 128, 0.7)',
    lightGrey: 'rgba(211, 211, 211, 0.5)',
    hiddenDatasetColor: 'rgba(180, 180, 180, 0.7)' // Color for hidden legend items
};

const commonLabels = ['Salty', 'Sweet', 'Crunchy', 'Fruity', 'Spicy', 'Umami'];

const productAData = {
    label: 'Product A',
    data: [75, 60, 80, 40, 30, 65],
    backgroundColor: AigoraColorPalette.sgBlueTransparent,
    borderColor: AigoraColorPalette.sgBlue,
    pointBackgroundColor: AigoraColorPalette.sgBlue,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: AigoraColorPalette.sgBlue,
    borderWidth: 2,
    hidden: false // Initially visible
};

const productBData = {
    label: 'Product B',
    data: [60, 70, 50, 80, 45, 75],
    backgroundColor: AigoraColorPalette.sgGreenTransparent, // Changed to Green
    borderColor: AigoraColorPalette.sgGreen, // Changed to Green
    pointBackgroundColor: AigoraColorPalette.sgGreen, // Changed to Green
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: AigoraColorPalette.sgGreen, // Changed to Green
    borderWidth: 2,
    hidden: true // Initially hidden
};

const productCData = {
    label: 'Product C',
    data: [50, 85, 60, 70, 55, 40],
    backgroundColor: AigoraColorPalette.signalRedTransparent, // Changed to Red
    borderColor: AigoraColorPalette.signalRed, // Changed to Red
    pointBackgroundColor: AigoraColorPalette.signalRed, // Changed to Red
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: AigoraColorPalette.signalRed, // Changed to Red
    borderWidth: 2,
    hidden: true // Initially hidden
};

export function initRadarChart(canvasElement) {
    if (!canvasElement) {
        console.error("Radar chart canvas not found.");
        return;
    }

    if (Chart.getChart(canvasElement)) {
        Chart.getChart(canvasElement).destroy();
    }

    const datasets = [
        { ...productAData },
        { ...productBData },
        { ...productCData }
    ];

    const chartConfig = {
        type: 'radar',
        data: {
            labels: commonLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { display: true, color: AigoraColorPalette.lightGrey },
                    grid: { color: AigoraColorPalette.lightGrey },
                    pointLabels: {
                        font: { size: 14, family: 'Roboto Condensed' },
                        color: AigoraColorPalette.neutralGrey // Text color for axis labels like "Salty", "Sweet"
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        stepSize: 20,
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 16, family: 'Roboto Condensed' },
                        usePointStyle: true, // Using point style (circle/rect) instead of line
                        padding: 20,
                        generateLabels: (chart) => {
                            const originalDefaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            console.log("--- Regenerating Legend Labels ---"); // Debug line

                            originalDefaultLabels.forEach(label => {
                                const datasetIndex = label.datasetIndex;
                                const currentDataset = chart.data.datasets[datasetIndex];

                                // Debugging output for each dataset
                                console.log(`Processing: ${currentDataset.label}, Hidden: ${currentDataset.hidden}, Target Color: ${currentDataset.borderColor}`);

                                if (currentDataset.hidden) {
                                    console.log(`  Applying HIDDEN style to ${currentDataset.label}`); // Debug line
                                    label.fillStyle = AigoraColorPalette.hiddenDatasetColor;
                                    label.strokeStyle = AigoraColorPalette.hiddenDatasetColor;
                                    label.fontColor = AigoraColorPalette.hiddenDatasetColor;
                                    label.hidden = false; // Prevent default strikethrough
                                } else {
                                    console.log(`  Applying VISIBLE style to ${currentDataset.label} using color ${currentDataset.borderColor}`); // Debug line
                                    label.fillStyle = currentDataset.borderColor;
                                    label.strokeStyle = currentDataset.borderColor;
                                    label.fontColor = currentDataset.borderColor;
                                    label.hidden = false;
                                }
                            });
                            return originalDefaultLabels;
                        },
                        onClick: (e, legendItem, legend) => {
                            const index = legendItem.datasetIndex;
                            const ci = legend.chart;

                            ci.data.datasets[index].hidden = !ci.data.datasets[index].hidden;

                            const meta = ci.getDatasetMeta(index);
                            meta.hidden = ci.data.datasets[index].hidden;

                            ci.update();
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        titleFont: { size: 14, family: 'Roboto Condensed' },
                        bodyFont: { size: 12, family: 'Roboto Condensed' },
                    }
                }
            }
        }
    };
    new Chart(canvasElement, chartConfig);
}
