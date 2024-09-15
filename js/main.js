var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

// Define the time interval for the updates (e.g., 1000ms = 1 second)
const updateFrequency = 5000;

// Country colors or any representative color map for the candidates
const candidateColors = {
    '應曉薇': '#080899', // 藍色（中國國民黨）
    '端木正': '#35C9CB', // 水藍色（台灣民眾黨）
    '陳佩琪': '#35C9CB', // 水藍色（台灣民眾黨）
    '陳智菡': '#35C9CB', // 水藍色（台灣民眾黨）
    '張益贍': '#808080', // 灰色（無黨派或資料不足）
    '柯文哲': '#35C9CB', // 水藍色（台灣民眾黨）
    '鍾小平': '#080899', // 藍色（中國國民黨）
    '苗博雅': '#EE2349', // 紫色（社會民主黨）
    '王世堅': '#199D13', // 綠色（民主進步黨）
    '蔡壁如': '#35C9CB', // 水藍色（台灣民眾黨）
    '彭振聲': '#808080', // 灰色（無黨派或資料不足）
    '館長': '#808080',   // 灰色（無黨派）
    '李文娟': '#808080', // 灰色（無黨派或資料不足）
    '張禹宣': '#808080', // 灰色（無黨派或資料不足）
    '李文宗': '#808080', // 灰色（無黨派或資料不足）
    '林洲民': '#808080', // 灰色（無黨派）
    '吳子嘉': '#808080', // 灰色（無黨派）
    '王瑞德': '#808080', // 灰色（無黨派）
    '四叉貓': '#808080', // 灰色（無黨派）
    '簡舒培': '#199D13', // 綠色（民主進步黨）
    '翁曉玲': '#080899', // 藍色（中國國民黨）
    '林亮君': '#199D13', // 綠色（民主進步黨）
    '沈慶京': '#080899', // 藍色（中國國民黨）
    '黃國昌': '#35C9CB', // 水藍色（台灣民眾黨）
    '林佳龍': '#199D13', // 綠色（民主進步黨）
    '劉寶傑': '#808080', // 灰色（無黨派）
    '賴清德': '#199D13', // 綠色（民主進步黨）
    '黃珊珊': '#35C9CB', // 水藍色（台灣民眾黨）
    'Grace': '#808080',   // 灰色（無黨派或資料不足）
    '尚毅夫': '#808080', // 灰色（無黨派或資料不足）
    '邵琇珮': '#808080', // 灰色（無黨派或資料不足）
    '王義川': '#199D13', // 綠色（民主進步黨）
    '周偉航': '#FBBD02', // 黃色（時代力量）
    '趙少康': '#080899', // 藍色（中國國民黨）
};

var DailyEventName;
// load event name from ./data/event.json 
$.getJSON('./data/event.json', function (data) {
    DailyEventName = data;
    console.log(DailyEventName);
});


// Load the data from the provided JSON
$.getJSON('./data/cpcity.json', function (data) {
    const dataset = data.result;
    const photoUrls = data.photo;
    const candidates = Object.keys(dataset);  // Candidate names
    // console.log(candidates);
    // change 
    const dates = Object.keys(dataset[candidates[0]]); // Get the date range

    let startIndex = 0;  // Starting from the first date
    let currentDate = dates[startIndex];  // First date in the dataset

    // Function to extract and sort the data for the current date
    function getDataForDate(date) {
        return candidates.map(candidate => {
            return {
                name: candidate, // Use the candidate name
                value: dataset[candidate][date] || 0 // Get the value for this candidate and date, default to 0 if missing
            };
        }).sort((a, b) => b.value - a.value); // Sort by value for the bar chart race effect
    }

    // Ensure the correct data is displayed
    let dataForCurrentDate = getDataForDate(currentDate);

    // Initialize the chart option
    option = {
        grid: {
            top: 30,
            bottom: 50,
            left: 80,
            right: 80
        },
        xAxis: {
            max: 'dataMax',
            axisLabel: {
                formatter: function (n) {
                    return n;
                }
            }
        },
        yAxis: {
            type: 'category',
            inverse: true,
            max: 10,
            axisLabel: {
                show: true,
                fontSize: 32,
                color: '#000',
                formatter: function (index) {
                    // return rich text tag for the image and candidate name
                    return ;//`{img|} ${dataForCurrentDate[index].name}`;
                },
                rich: {
                    img: {
                        height: 50,
                        align: 'center',
                        backgroundColor: function (param) {
                            image: `${photoUrls[dataForCurrentDate[param.dataIndex].name]}`
                        }
                    }
                }
            },
            animationDuration: 500,
            animationDurationUpdate: 500
        },
        series: [
            {
                realtimeSort: true,
                type: 'bar',
                barWidth: 52, 
                data: getDataForDate(currentDate),
                itemStyle: {
                    color: function (param) {
                        return candidateColors[param.name] || '#888'; // Assign color based on candidate name
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    fontSize: 32,
                    // move the candidate name to the left
                    offset: [-110, 2],
                    // font weight
                    fontWeight: 'bold',
                    // font rounded corner
                    borderRadius: 5,
                    valueAnimation: true,
                    formatter: function (param) {
                        return `${param.name}`;
                    }
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
                    bottom: 120,
                    style: {
                        text: currentDate,
                        font: 'bolder 60px monospace',
                        fill: 'rgba(100, 100, 100, 0.75)'
                    },
                    z: 100
                },
                {
                    type: 'text',
                    right: 160, 
                    bottom: 70,
                    style: {
                        text: '柯文哲政治獻金＆京華城案\n    Youtube 人物聲量排行榜',
                        align: 'right',
                        font: '20px sans-serif',
                        fill: 'rgba(100, 100, 100, 1)',
                        lineHeight: 23
                    },
                    z: 100
                },{
                    type: 'text',
                    right: 160,
                    bottom: 200,
                    style: {
                        text: DailyEventName[currentDate],
                        // align the text to the left
                        font: '35px sans-serif',
                        fill: 'rgba(100, 100, 100, 1)',
                        lineHeight: 35
                    },
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
            // Get data for the current date, include all candidates even with zero values
            dataForCurrentDate = getDataForDate(currentDate);
            // Update the series data and graphic element for the new date
            option.series[0].data = dataForCurrentDate;
            // Update the date text but change the format form YYYY-MM-DD to MM/DD
            option.graphic.elements[0].style.text = currentDate.slice(5);

            // Update the event text
            option.graphic.elements[2].style.text = DailyEventName[currentDate];

            // Apply the updated options
            myChart.setOption(option);
        }
    }
    

    // Automatically update the chart every `updateFrequency` milliseconds
    setInterval(updateChart, updateFrequency);
});
