am5.ready(function() {

var root = am5.Root.new("chartdiv2");

root._logo.dispose();

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layout: root.horizontalLayout
  })
);


var chart = container.children.push(
  am5percent.PieChart.new(root, {
    tooltip: am5.Tooltip.new(root, {})
  })
);


var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    alignLabels: false
  })
);

series.labels.template.setAll({
  textType: "circular",
  radius: 4
});
series.ticks.template.set("visible", false);
series.slices.template.set("toggleKey", "none");

// add events
series.slices.template.events.on("click", function(e) {
  selectSlice(e.target);
});

var subChart = container.children.push(
  am5percent.PieChart.new(root, {
    radius: am5.percent(50),
    tooltip: am5.Tooltip.new(root, {})
  })
);

// Create sub series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var subSeries = subChart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  })
);

subSeries.data.setAll([
 { category: "Alto Risco", value: 0 },
  { category: "Médio Risco", value: 0 },
  { category: "Baixo Risco", value: 0 }
]);
subSeries.slices.template.set("toggleKey", "none");

var selectedSlice;

series.on("startAngle", function() {
  updateLines();
});

container.events.on("boundschanged", function() {
  root.events.once("frameended", function() {
    updateLines();
   })
});

function updateLines() {
  if (selectedSlice) {
    var startAngle = selectedSlice.get("startAngle");
    var arc = selectedSlice.get("arc");
    var radius = selectedSlice.get("radius");

    var x00 = radius * am5.math.cos(startAngle);
    var y00 = radius * am5.math.sin(startAngle);

    var x10 = radius * am5.math.cos(startAngle + arc);
    var y10 = radius * am5.math.sin(startAngle + arc);

    var subRadius = subSeries.slices.getIndex(0).get("radius");
    var x01 = 0;
    var y01 = -subRadius;

    var x11 = 0;
    var y11 = subRadius;

    var point00 = series.toGlobal({ x: x00, y: y00 });
    var point10 = series.toGlobal({ x: x10, y: y10 });

    var point01 = subSeries.toGlobal({ x: x01, y: y01 });
    var point11 = subSeries.toGlobal({ x: x11, y: y11 });

    line0.set("points", [point00, point01]);
    line1.set("points", [point10, point11]);
  }
}

// lines
var line0 = container.children.push(
  am5.Line.new(root, {
    position: "absolute",
    stroke: root.interfaceColors.get("text"),
    strokeDasharray: [2, 2]
  })
);
var line1 = container.children.push(
  am5.Line.new(root, {
    position: "absolute",
    stroke: root.interfaceColors.get("text"),
    strokeDasharray: [2, 2]
  })
);

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([
  {
    category: "Cash",
    value: 400,
    subData: [
  { category: "Alto Risco", value: 200 },
      { category: "Médio Risco", value: 150 },
      { category: "Baixo Risco", value: 150 }
    ]
  },
  {
    category: "Transferências",
    value: 300,
    subData: [
      { category: "A", value: 150 }
    ]
  },
  {
    category: "Depósitos",
    value: 200,
    subData: [
    { category: "Alto Risco", value: 110 },
      { category: "Médio Risco", value: 60 },
      { category: "Baixo Risco", value: 30 }
    ]
  },
  {
    category: "Pagamentos",
    value: 150,
    subData: [
       { category: "Alto Risco", value: 60 },
      { category: "Médio Risco", value: 30 },
      { category: "Baixo Risco", value: 30 }
    ]
  },
  {
    category: "Suspeitas",
    value: 240,
    subData: [
       { category: "Alto Risco", value: 60 },
      { category: "Médio Risco", value: 30 },
      { category: "Baixo Risco", value: 30 }
    ]
  },

]);

function selectSlice(slice) {
  selectedSlice = slice;
  var dataItem = slice.dataItem;
  var dataContext = dataItem.dataContext;

  if (dataContext) {
    var i = 0;
    subSeries.data.each(function(dataObject) {
      var dataObj = dataContext.subData[i];
      if(dataObj){
          if(!subSeries.dataItems[i].get("visible")){
              subSeries.dataItems[i].show();
          }
          subSeries.data.setIndex(i, dataObj);
      }
      else{
          subSeries.dataItems[i].hide();
      }
      
      i++;
    });
  }

  var middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
  var firstAngle = series.dataItems[0].get("slice").get("startAngle");

  series.animate({
    key: "startAngle",
    to: firstAngle - middleAngle,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
  series.animate({
    key: "endAngle",
    to: firstAngle - middleAngle + 360,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
}

container.appear(1000, 10);

series.events.on("datavalidated", function() {
  selectSlice(series.slices.getIndex(0));
});

}); // end am5.ready()