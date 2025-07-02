am5.ready(function() {

var root = am5.Root.new("chartdiv10");
root._logo.dispose();

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    innerRadius: am5.percent(40)
  })
);

var cursor = chart.set("cursor",
am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false);

var yRenderer = am5radar.AxisRendererRadial.new(root, { minGridDistance: 20 });

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "criterio",
    renderer: yRenderer
  })
);

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    min: new Date("2021-01-01 00:00:00").getTime(),
    max: new Date("2022-01-01 00:00:00").getTime(),
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {}),
    tooltip: am5.Tooltip.new(root, {
      labelText: "Período de Análise: {valueX.formatDate('yyyy-MM-dd')}"
    })
  })
);

var data = [
  {
    criterio: "Faixa de Valor",
    startDate1: new Date("2021-01-01").getTime(),
    endDate1: new Date("2021-03-01").getTime()
  },
  {
    criterio: "Faixa de Valor",
    startDate1: new Date("2021-04-01").getTime(),
    endDate1: new Date("2021-08-15").getTime()
  },
  {
    criterio: "Hora",
    startDate2: new Date("2021-03-01").getTime(),
    endDate2: new Date("2021-06-01").getTime()
  },
  {
    criterio: "Hora",
    startDate2: new Date("2021-08-01").getTime(),
    endDate2: new Date("2021-10-01").getTime()
  },
  {
    criterio: "Tipo",
    startDate3: new Date("2021-02-01").getTime(),
    endDate3: new Date("2021-07-01").getTime()
  },
  {
    criterio: "Moeda",
    startDate4: new Date("2021-06-09").getTime(),
    endDate4: new Date("2021-09-01").getTime()
  },
  {
    criterio: "Moeda",
    startDate4: new Date("2021-10-01").getTime(),
    endDate4: new Date("2021-12-15").getTime()
  },
  {
    criterio: "Score IA",
    startDate5: new Date("2021-02-01").getTime(),
    endDate5: new Date("2021-04-15").getTime()
  },
  {
    criterio: "Score IA",
    startDate5: new Date("2021-10-01").getTime(),
    endDate5: new Date("2021-12-31").getTime()
  }
];

root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX", "openValueX"]
});

for (var i = 1; i < 6; i++) {
  var series = chart.series.push(
    am5radar.RadarColumnSeries.new(root, {
      clustered: false,
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      categoryYField: "criterio",
      valueXField: "endDate" + i,
      openValueXField: "startDate" + i
    })
  );

  series.columns.template.set("cornerRadius", 25);
  series.columns.template.set(
    "tooltipText",
    "{criterio}: {openValueX.formatDate('yyyy-MM-dd')} - {valueX.formatDate('yyyy-MM-dd')}"
  );

  series.data.setAll(data);
  series.appear(2000, 100);
}

yAxis.data.setAll([
  { criterio: "Faixa de Valor" },
  { criterio: "Hora" },
  { criterio: "Tipo" },
  { criterio: "Moeda" },
  { criterio: "Score IA" }
]);

chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", exportable: false }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical", exportable: false }));

xAxis.data.setAll(data);

chart.appear(2000, 100);

});