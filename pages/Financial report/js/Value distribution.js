am5.ready(function() {

var root = am5.Root.new("chartdiv7");
root._logo.dispose();

root.setThemes([
  am5themes_Animated.new(root)
]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270
  })
);

var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "faixa",
    endAngle: 270,
    tooltip: am5.Tooltip.new(root, {
      labelText: "{faixa} USD: {value} transações"
    })
  })
);

series.states.create("hidden", {
  endAngle: -90
});

series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

series.data.setAll([
  { faixa: "0-100", value: 1500 },
  { faixa: "101-500", value: 1200 },
  { faixa: "501-1000", value: 800 },
  { faixa: "1001-5000", value: 500 },
  { faixa: "5001-10000", value: 300 },
  { faixa: ">10000", value: 200 }
]);

series.appear(1000, 100);

});