am5.ready(function() {

var root = am5.Root.new("chartdiv9");
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
    categoryField: "category",
    endAngle: 270
  })
);

series.states.create("hidden", {
  endAngle: -90
});

series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

series.data.setAll([{
  category: "Risco Alto",
  value: 501.9
}, {
  category: "Risco Moderado-Alto",
  value: 301.9
}, {
  category: "Risco Moderado",
  value: 201.1
}, {
  category: "Risco Moderado-Baixo",
  value: 165.8
}, {
  category: "Risco Baixo",
  value: 139.9
}, {
  category: "Risco Muito Baixo",
  value: 128.3
}, {
  category: "Risco Mínimo",
  value: 99
}]);

series.appear(1000, 100);

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

var annotationData = {
  "width": 897,
  "height": 500,
  "markers": [
    {
      "bgColor": "#EF4444",
      "tipPosition": { "x": 276.00001525878906, "y": 92.33334350585938 },
      "color": "#FFFFFF",
      "fontFamily": "Helvetica, Arial, sans-serif",
      "padding": 5,
      "text": "Melhoria Necessária",
      "left": 96.66667175292969,
      "top": 178,
      "width": 230,
      "height": 48.333343505859375,
      "rotationAngle": 0,
      "visualTransformMatrix": { "a": 1, "b": 0, "c": 0, "d": 1, "e": 0, "f": 0 },
      "containerTransformMatrix": { "a": 1, "b": 0, "c": 0, "d": 1, "e": 0, "f": 0 },
      "typeName": "CalloutMarker",
      "state": "select"
    },
    {
      "arrowType": "end",
      "strokeColor": "#7C3AED",
      "strokeWidth": 3,
      "strokeDasharray": "",
      "x1": 733.3333740234375,
      "y1": 125.33334350585938,
      "x2": 539.3333740234375,
      "y2": 225.6666717529297,
      "typeName": "ArrowMarker",
      "state": "select"
    },
    {
      "arrowType": "end",
      "strokeColor": "#7C3AED",
      "strokeWidth": 3,
      "strokeDasharray": "",
      "x1": 736.6666870117188,
      "y1": 153.33334350585938,
      "x2": 518.6666870117188,
      "y2": 343.0000915527344,
      "typeName": "ArrowMarker",
      "state": "select"
    },
    {
      "color": "#EF4444",
      "fontFamily": "Helvetica, Arial, sans-serif",
      "padding": 5,
      "text": "Aceitável",
      "left": 706.0000610351562,
      "top": 125.00001525878906,
      "width": 100,
      "height": 30,
      "rotationAngle": 0,
      "visualTransformMatrix": { "a": 1, "b": 0, "c": 0, "d": 1, "e": 0, "f": 0 },
      "containerTransformMatrix": { "a": 1, "b": 0, "c": 0, "d": 1, "e": 0, "f": 0 },
      "typeName": "TextMarker",
      "state": "select"
    }
  ]
};

var annotator = am5plugins_exporting.Annotator.new(root, {
  markerState: annotationData
});

var menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function() {
    this.close();
    annotator.toggle();
  }
});

}); // end am5.ready()