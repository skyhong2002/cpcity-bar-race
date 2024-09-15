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

// "photo":{"柯文哲":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/d\/d4\/%E6%9F%AF%E6%96%87%E5%93%B2%E4%B8%BB%E5%B8%AD.jpg\/500px-%E6%9F%AF%E6%96%87%E5%93%B2%E4%B8%BB%E5%B8%AD.jpg","陳佩琪":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/6\/62\/%E9%99%B3%E4%BD%A9%E7%90%AA.jpg","苗博雅":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/1\/1a\/%E7%A4%BE%E6%9C%83%E6%B0%91%E4%B8%BB%E9%BB%A8%E5%8F%B0%E5%8C%97%E5%B8%82%E8%AD%B0%E5%93%A1%E8%8B%97%E5%8D%9A%E9%9B%85.png","彭振聲":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/b\/b9\/%E8%87%BA%E5%8C%97%E5%B8%82%E5%89%AF%E5%B8%82%E9%95%B7%E5%BD%AD%E6%8C%AF%E8%81%B2.jpg","黃國昌":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/9\/94\/%E9%BB%83%E5%9C%8B%E6%98%8C%E5%A7%94%E5%93%A1.jpg\/500px-%E9%BB%83%E5%9C%8B%E6%98%8C%E5%A7%94%E5%93%A1.jpg","黃珊珊":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/8\/8e\/%E9%BB%83%E7%8F%8A%E7%8F%8A%E8%82%96%E5%83%8F.jpg\/500px-%E9%BB%83%E7%8F%8A%E7%8F%8A%E8%82%96%E5%83%8F.jpg","鍾小平":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/d\/d0\/%E9%8D%BE%E5%B0%8F%E5%B9%B3%E8%AD%B0%E5%93%A1.jpg","蔡壁如":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/2\/21\/%E7%AB%8B%E6%B3%95%E5%A7%94%E5%93%A1%E8%94%A1%E5%A3%81%E5%A6%82.jpg","王世堅":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/f\/fe\/%E7%8E%8B%E4%B8%96%E5%A0%85%E8%82%96%E5%83%8F.jpg\/500px-%E7%8E%8B%E4%B8%96%E5%A0%85%E8%82%96%E5%83%8F.jpg","應曉薇":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/3\/36\/%E6%87%89%E6%9B%89%E8%96%87%E8%AD%B0%E5%93%A1.jpg","郝龍斌":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/8\/8e\/%E9%83%9D%E9%BE%8D%E6%96%8C%E5%B8%82%E9%95%B7.jpg\/500px-%E9%83%9D%E9%BE%8D%E6%96%8C%E5%B8%82%E9%95%B7.jpg","林洲民":"https:\/\/upload.wikimedia.org\/wikipedia\/commons\/8\/8e\/01.27_%E7%B8%BD%E7%B5%B1%E8%A6%96%E5%AF%9F%E3%80%8C%E8%87%BA%E5%8C%97%E5%B8%82%E5%81%A5%E5%BA%B7%E5%85%AC%E5%85%B1%E4%BD%8F%E5%AE%85%E3%80%8D_%2839908541841%29_%28cropped%29.jpg"}
const photoUrls = {
    '柯文哲': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/%E6%9F%AF%E6%96%87%E5%93%B2%E4%B8%BB%E5%B8%AD.jpg/500px-%E6%9F%AF%E6%96%87%E5%93%B2%E4%B8%BB%E5%B8%AD.jpg',
    '陳佩琪': 'https://upload.wikimedia.org/wikipedia/commons/6/62/%E9%99%B3%E4%BD%A9%E7%90%AA.jpg',
    '苗博雅': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/%E7%A4%BE%E6%9C%83%E6%B0%91%E4%B8%BB%E9%BB%A8%E5%8F%B0%E5%8C%97%E5%B8%82%E8%AD%B0%E5%93%A1%E8%8B%97%E5%8D%9A%E9%9B%85.png',
};

// Load the data from the provided JSON
$.getJSON('./data/cpcity.json', function (data) {
    const dataset = data.result;
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
            max: 10,
            axisLabel: {
                show: true,
                fontSize: 25,
                color: '#000',
                formatter: function (index) {
                    // return rich text tag for the image and candidate name
                    return `{img|} ${dataForCurrentDate[index].name}`;
                },
                rich: {
                    img: {
                        height: 50,  // Set the height of the image
                        align: 'center',  // Align image with the text
                        backgroundColor: {
                            image: function (index) {
                                // return the correct image URL from photoUrls object
                                const candidateName = dataForCurrentDate[index].name;
                                return photoUrls[candidateName] || '';  // Ensure it falls back to an empty string if no image is found
                            }
                        }
                    }
                }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
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
                        return `${param.name}`;  // Display the image using the 'img' style and the candidate name with value
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
                    bottom: 60,
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
                    bottom: 130,
                    style: {
                        text: '柯文哲政治獻金＆京華城案\n    Youtube 人物聲量排行榜',
                        font: '30px sans-serif',
                        fill: 'rgba(100, 100, 100, 1)',
                        lineHeight: 30
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
            // Get data for the current date, include all candidates even with zero values
            dataForCurrentDate = getDataForDate(currentDate);
            // Update the series data and graphic element for the new date
            option.series[0].data = dataForCurrentDate;

            // Update the date text but change the format form YYYY-MM-DD to MM/DD
            option.graphic.elements[0].style.text = currentDate.slice(5);
            // Apply the updated options
            myChart.setOption(option);
        }
    }
    

    // Automatically update the chart every `updateFrequency` milliseconds
    setInterval(updateChart, updateFrequency);
});
