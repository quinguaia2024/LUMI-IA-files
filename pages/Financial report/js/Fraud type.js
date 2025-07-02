am5.ready(function() {

var root = am5.Root.new("chartdiv5");
root._logo.dispose();

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "none",
  wheelY: "none",
  paddingLeft: 0
}));

chart.zoomOutButton.set("forceHidden", true);

var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30,
  minorGridEnabled: true
});
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: 0,
  paddingRight: 15
});
xRenderer.grid.template.set("visible", false);

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,
  categoryField: "date",
  renderer: xRenderer
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));
yAxis.get("renderer").labels.template.set("text", "{value.formatNumber('#')}");

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Quantidade de Fraudes Detectadas",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{categoryX}: {valueY} fraudes"
  })
}));

series.columns.template.setAll({
  cornerRadiusTL: 5,
  cornerRadiusTR: 5,
  strokeOpacity: 0
});

series.columns.template.adapters.add("fill", function(fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function(stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Label.new(root, {
      text: "{valueYWorking.formatNumber('#')}",
      fill: root.interfaceColors.get("alternativeText"),
      centerY: 0,
      centerX: am5.p50,
      populateText: true
    })
  });
});

// Dados para diário, semanal e mensal
var dataDaily = [
  { date: "01/01", value: 120 },
  { date: "02/01", value: 150 },
  { date: "03/01", value: 180 },
  { date: "04/01", value: 100 },
  { date: "05/01", value: 90 },
  { date: "06/01", value: 110 },
  { date: "07/01", value: 130 }
];

var dataWeekly = [
  { date: "Sem 1", value: 850 },
  { date: "Sem 2", value: 900 },
  { date: "Sem 3", value: 750 },
  { date: "Sem 4", value: 820 },
  { date: "Sem 5", value: 600 },
  { date: "Sem 6", value: 700 },
  { date: "Sem 7", value: 650 }
];

var dataMonthly = [
  { date: "Jan", value: 2025 },
  { date: "Fev", value: 1882 },
  { date: "Mar", value: 1809 },
  { date: "Abr", value: 1322 },
  { date: "Mai", value: 1122 },
  { date: "Jun", value: 1114 },
  { date: "Jul", value: 984 },
  { date: "Ago", value: 711 },
  { date: "Set", value: 665 },
  { date: "Out", value: 443 },
  { date: "Nov", value: 441 },
  { date: "Dez", value: 500 }
];

// Função para atualizar dados com base no intervalo selecionado
function updateChartData(interval) {
  var data;
  if (interval === "diario") {
    data = dataDaily;
  } else if (interval === "semanal") {
    data = dataWeekly;
  } else {
    data = dataMonthly;
  }
  xAxis.data.setAll(data);
  series.data.setAll(data);
  sortCategoryAxis();
}

// Inicializar com dados mensais
updateChartData("mensal");

// Adicionar dropdown para alternar intervalos
var select = document.createElement("select");
select.innerHTML = `
  <option value="diario">Diário</option>
  <option value="semanal">Semanal</option>
  <option value="mensal" selected>Mensal</option>
`;
select.style.padding = "5px";
select.style.border = "1px solid #657786";
select.style.outline = "none"; // Remove o outline padrão
document.getElementById("chartdiv5").parentNode.insertBefore(select, document.getElementById("chartdiv5"));

// Aplicar estilo de foco dinamicamente
select.addEventListener("focus", function() {
  select.style.boxShadow = "0 0 0 2px #ffffff4d"; // Cor de foco
});
select.addEventListener("blur", function() {
  select.style.boxShadow = "none"; // Remove o foco
});
select.addEventListener("change", function() {
  updateChartData(select.value);
});

// Atualizar dados dinamicamente a cada 1.5s
setInterval(function() {
  updateData();
}, 1500);

function updateData() {
  am5.array.each(series.dataItems, function(dataItem) {
    var value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
    if (value < 0) {
      value = 10;
    }
    dataItem.set("valueY", value);
    dataItem.animate({
      key: "valueYWorking",
      to: value,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  });
  sortCategoryAxis();
}

function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryX") == category) {
      return dataItem;
    }
  }
}

function sortCategoryAxis() {
  series.dataItems.sort(function(x, y) {
    return y.get("valueY") - x.get("valueY");
  });

  am5.array.each(xAxis.dataItems, function(dataItem) {
    var seriesDataItem = getSeriesItem(dataItem.get("category"));
    if (seriesDataItem) {
      var index = series.dataItems.indexOf(seriesDataItem);
      var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
      dataItem.set("index", index);
      dataItem.set("deltaPosition", -deltaPosition);
      dataItem.animate({
        key: "deltaPosition",
        to: 0,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }
  });

  xAxis.dataItems.sort(function(x, y) {
    return x.get("index") - y.get("index");
  });
}

series.appear(1000);
chart.appear(1000, 100);

});