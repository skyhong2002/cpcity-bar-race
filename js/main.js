var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

// Define the time interval for the updates (e.g., 1000ms = 1 second)
const updateFrequency = 2000;

// Country colors or any representative color map for the candidates
const candidateColors = {
    "柯文哲": '#00008b',
    "簡舒培": '#f00',
    "賴清德": '#ffde00',
    "陳佩琪": '#002a8f',
    "黃國昌": '#003580',
};

// Load the data from the provided JSON
$.getJSON('./data/cpcity.json', function (data) {
    const dataset = data.result;
    const candidates = Object.keys(dataset);  // Candidate names
    console.log(candidates);
    // change 
    const dates = Object.keys(dataset[candidates[0]]); // Get the date range

    let startIndex = 0;  // Starting from the first date
    let currentDate = dates[startIndex];  // First date in the dataset

    // Function to extract the data for the current date
    function getDataForDate(date) {
        return candidates.map(candidate => {
            return {
                name: candidate,
                value: dataset[candidate][date] || 0 // If a date is missing, default to 0
            };
        }).sort((a, b) => b.value - a.value); // Sort by the value for bar chart race effect
    }

    // Initialize the chart option
    option = {
        grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
        },
        xAxis: {
            max: 'dataMax',
            axisLabel: {
                formatter: function (n) {
                    return Math.round(n) + '';
                }
            }
        },
        yAxis: {
            type: 'category',
            inverse: true,
            max: 10,  // Show top 10 candidates
            axisLabel: {
                show: true,
                fontSize: 14
            },
            animationDuration: 300,
            animationDurationUpdate: 300
        },
        series: [
            {
                realtimeSort: true,
                type: 'bar',
                data: getDataForDate(currentDate), // Initial data
                itemStyle: {
                    color: function (param) {
                        return candidateColors[param.name] || '#5470c6'; // Assign color based on candidate
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true
                }
            }
        ],
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
            elements: [
                {
                    type: 'text',
                    right: 160,
                    bottom: 60,
                    style: {
                        text: currentDate,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                    },
                    z: 100
                }
            ]
        }
    };

    myChart.setOption(option);

    // Function to update the chart for a new date
    function updateChart() {
        if (startIndex < dates.length - 1) {
            startIndex++;
            currentDate = dates[startIndex];
            option.series[0].data = getDataForDate(currentDate);
            option.graphic.elements[0].style.text = currentDate;
            myChart.setOption(option);
        }
    }

    // Automatically update the chart every `updateFrequency` milliseconds
    setInterval(updateChart, updateFrequency);
});
