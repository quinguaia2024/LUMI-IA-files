am5.ready(function() {

// Data
var allData = {
  "Janeiro": {
    "Segunda": 4470000,
    "Terça": 0,
    "Quarta": 3675135,
    "Quinta": 0,
    "Sexta": 0,
    "Sábado": 9731610,
    "Domingo": 0,

  },
  "Fevereiro": {
    "Segunda": 5970054,
    "Terça": 100000000,
    "Quarta": 7399354,
    "Quinta": 0,
    "Sexta": 0,
    "Sábado": 19932360,
    "Domingo": 0,
  },
  "Março": {
    "Segunda": 7459742,
    "Terça": 276000000,
    "Quarta": 29299875,
    "Quinta": 0,
    "Sexta": 0,
    "Sábado": 29533250,
    "Domingo": 0,
    "MySpace": 69299875,
    "Orkut": 26916562
  },
  "Abril": {
    "Segunda": 51008911,
    "Terça": 517750000,
    "Quarta": 41834525,
    "Quinta": 166029650,
    "Sexta": 0,
    "Sábado": 57893524,
    "Domingo": 0,
    "MySpace": 70133095,
    "Orkut": 47366905
  },
  "Maio": {
    "Segunda": 28804331,
    "Terça": 766000000,
    "Quarta": 54708063,
    "Quinta": 170000000,
    "Sexta": 0,
    "Sábado": 59953290,
    "Domingo": 0,
    "MySpace": 68046710,
    "Orkut": 49941613
  },
  "Junho": {
    "Segunda": 0,
    "Terça": 979750000,
    "Quarta": 66954600,
    "Quinta": 170000000,
    "Sexta": 107319100,
    "Sábado": 46610848,
    "Domingo": 0,
    "MySpace": 46003536,
    "Orkut": 47609080
  },
  "Julho": {
    "Segunda": 0,
    "Terça": 1170500000,
    "Quarta": 80000000,
    "Quinta": 170000000,
    "Sexta": 205654700,
    "Sábado": 0,
    "Domingo": 117500000,
    "MySpace": 0,
    "Orkut": 45067022
  },
  "Agosto": {
    "Segunda": 0,
    "Terça": 1334000000,
    "Quarta": 0,
    "Quinta": 170000000,
    "Sexta": 254859015,
    "Sábado": 0,
    "Domingo": 250000000,
    "MySpace": 0,
    "Orkut": 0
  },
  "Setembro": {
    "Segunda": 0,
    "Terça": 1516750000,
    "Quarta": 0,
    "Quinta": 170000000,
    "Sexta": 298950015,
    "Sábado": 0,
    "Domingo": 400000000,
    "MySpace": 0,
    "Orkut": 0
  },
  "Outubro": {
    "Segunda": 0,
    "Terça": 1753500000,
    "Quarta": 0,
    "Quinta": 0,
    "Sexta": 398648000,
    "Sábado": 0,
    "Domingo": 550000000,
    "MySpace": 0,
    "Orkut": 0
  },
  "Novembro": {
    "Segunda": 0,
    "Terça": 2035750000,
    "Quarta": 0,
    "Quinta": 0,
    "Sexta": 495657000,
    "Sábado": 0,
    "Domingo": 750000000,
    "MySpace": 0,
    "Orkut": 0
  },
  "Dezembro": {
    "Segunda": 0,
    "Terça": 2255250000,
    "Quarta": 0,
    "Quinta": 0,
    "Sexta": 430000000,
    "Sábado": 0,
    "Domingo": 1000000000,
    "MySpace": 0,
    "Orkut": 0
  }
};

var root = am5.Root.new("chartdiv3");
root._logo.dispose();

root.numberFormatter.setAll({
  numberFormat: "#.0%", // Formata como percentagem
});

var stepDuration = 2000;

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "none",
  wheelY: "none",
  paddingLeft: 0
}));

chart.zoomOutButton.set("forceHidden", true);

var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 20,
  inversed: true,
  minorGridEnabled: true
});
yRenderer.grid.template.set("visible", false);

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "network",
  renderer: yRenderer
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,
  strictMinMax: true,
  extraMax: 0.1,
  renderer: am5xy.AxisRendererX.new(root, {})
}));

xAxis.set("interpolationDuration", stepDuration / 10);
xAxis.set("interpolationE  easing", am5.ease.linear);

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "value",
  categoryYField: "network"
}));

series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });

series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

// Função para calcular percentagens
function calculatePercentages(data) {
  var total = 0;
  for (var n in data) {
    total += data[n];
  }
  var result = {};
  for (var n in data) {
    result[n] = total > 0 ? (data[n] / total) : 0;
  }
  return result;
}

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 1,
    sprite: am5.Label.new(root, {
      text: "{valueXWorking.formatNumber('#.0%')}",
      fill: root.interfaceColors.get("alternativeText"),
      centerX: am5.p100,
      centerY: am5.p50,
      populateText: true
    })
  });
});

var label = chart.plotContainer.children.push(am5.Label.new(root, {
  text: "Janeiro",
  fontSize: "8em",
  opacity: 0.2,
  x: am5.p100,
  y: am5.p100,
  centerY: am5.p100,
  centerX: am5.p100
}));

function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
      return dataItem;
    }
  }
}

function sortCategoryAxis() {
  series.dataItems.sort(function (x, y) {
    return y.get("valueX") - x.get("valueX");
  });

  am5.array.each(yAxis.dataItems, function (dataItem) {
    var seriesDataItem = getSeriesItem(dataItem.get("category"));
    if (seriesDataItem) {
      var index = series.dataItems.indexOf(seriesDataItem);
      var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
      if (dataItem.get("index") != index) {
        dataItem.set("index", index);
        dataItem.set("deltaPosition", -deltaPosition);
        dataItem.animate({
          key: "deltaPosition",
          to: 0,
          duration: stepDuration / 2,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    }
  });
  yAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}

var month = "Janeiro";
var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
var monthIndex = 0;

var interval = setInterval(function () {
  monthIndex++;
  if (monthIndex >= months.length) {
    clearInterval(interval);
    clearInterval(sortInterval);
  } else {
    month = months[monthIndex];
    updateData();
  }
}, stepDuration);

var sortInterval = setInterval(function () {
  sortCategoryAxis();
}, 100);

function setInitialData() {
  var d = calculatePercentages(allData[month]);
  for (var n in d) {
    series.data.push({ network: n, value: d[n] });
    yAxis.data.push({ network: n });
  }
}

function updateData() {
  var itemsWithNonZero = 0;
  if (allData[month]) {
    label.set("text", month);
    var d = calculatePercentages(allData[month]);
    am5.array.each(series.dataItems, function (dataItem) {
      var category = dataItem.get("categoryY");
      var value = d[category] || 0;
      if (value > 0) {
        itemsWithNonZero++;
      }
      dataItem.animate({
        key: "valueX",
        to: value,
        duration: stepDuration,
        easing: am5.ease.linear
      });
      dataItem.animate({
        key: "valueXWorking",
        to: value,
        duration: stepDuration,
        easing: am5.ease.linear
      });
    });
    yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
  }
}

setInitialData();
setTimeout(function () {
  monthIndex++;
  month = months[monthIndex];
  updateData();
}, 50);

series.appear(1000);
chart.appear(1000, 100);

});

// Highcharts chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Participação de Mercado dos Navegadores em Fevereiro de 2025'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderRadius: 5,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    series: [{
        name: 'Participação',
        data: [
            { name: 'Chrome', y: 74.03 },
            { name: 'Edge', y: 12.66 },
            { name: 'Firefox', y: 4.96 },
            { name: 'Safari', y: 2.49 },
            { name: 'Internet Explorer', y: 2.31 },
            { name: 'Outros', y: 3.398 }
        ]
    }]
});