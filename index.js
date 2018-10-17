// import axios from 'axios'
var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};

option = null;
app.title = "Trading chart";
/**
 * option = {
    xAxis: {
        data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
    },
    yAxis: {},
    series: [{
        type: 'k',
        data: [
            [open, close, lowest, highest],
            [40, 35, 30, 55],
            [33, 38, 33, 40],
            [40, 40, 32, 42]
        ]
    }]
};

*/
const plainData = []
var rawData = [
  ["2015/12/31", "3570.47", "3539.18", "3538.35", "3580.6"],
  ["2015/12/30", "3566.73", "3572.88", "3538.11", "3573.68"],
  ["2015/12/29", "3528.4", "3563.74", "3515.52", "3564.17"],
  ["2015/12/28", "3635.77", "3533.78", "3533.78", "3641.59"],
  ["2015/12/25", "3614.05", "3627.91", "3601.74", "3635.26"]
];

axios.get("http://localhost:3000/assets").then(response => {
  const { date, name, open_price, close_price, highest_price, lowest_price } = response.data.assets;
  response.data.assets.forEach(asset => {
        // plainData.push(asset)
        // plainData.slice(2)
        // plainData.slice(3,7)
        // rawData.push(plainData)
        // rawData = [asset.date,asset.open_price,asset.close_price,asset.lowest_price,asset.highest_price]
        
        console.log(rawData)
    });
});

function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}

var dates = rawData.map(function(item) {
  return item[0];
});

var data = rawData.map(function(item) {
  return [+item[1], +item[2], +item[3], +item[4]];
});
var option = {
  backgroundColor: "#21202D",
  legend: {
    data: ["Data"],
    inactiveColor: "#777",
    textStyle: {
      color: "#fff"
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
      type: "cross",
      lineStyle: {
        color: "#376df4",
        width: 2,
        opacity: 1
      }
    }
  },
  xAxis: {
    type: "category",
    data: dates,
    axisLine: {
      lineStyle: {
        color: "#8392A5"
      }
    }
  },
  yAxis: {
    position: "right",
    scale: true,
    axisLine: {
      lineStyle: {
        color: "#8392A5"
      }
    },
    splitLine: {
      show: false
    }
  },
  grid: {
    bottom: 80
  },
  dataZoom: [
    {
      textStyle: {
        color: "#8392A5"
      },
      handleIcon:
        "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
      handleSize: "80%",
      dataBackground: {
        areaStyle: {
          color: "#8392A5"
        },
        lineStyle: {
          opacity: 0.8,
          color: "#8392A5"
        }
      },
      handleStyle: {
        color: "#fff",
        shadowBlur: 3,
        shadowColor: "rgba(0, 0, 0, 0.6)",
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    },
    {
      type: "inside"
    }
  ],
  animation: false,
  series: [
    {
      type: "candlestick",
      name: "Data",
      data: data,
      itemStyle: {
        normal: {
          color: "#FD1050",
          color0: "#0CF49B",
          borderColor: "#FD1050",
          borderColor0: "#0CF49B"
        }
      }
    }
  ]
};
if (option && typeof option === "object") {
  myChart.setOption(option, true);
}
