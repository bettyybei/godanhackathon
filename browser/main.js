
$(function initializeMaps() {
    $( "#items" ).autocomplete({
      source: items
    });

    var theOBJECT, selectedCountryCode, queryTitle;

    $('#my-button').click(function(evt){
      evt.preventDefault();
      var selectedItem = $('#items').val();
      var selectedCountry  = $('#dst').val();

      queryTitle = selectedCountry + "'s Top 5 Import Countries of " + selectedItem;
      var queryBody = {}

      if (selectedCountry !== '') {
        queryBody.dst = selectedCountryCode
      }

      if (selectedItem !== '') {
        queryBody.item = selectedItem;
      }

      if (selectedItem == '' && selectedCountry == '') {
        queryTitle = "Top 5 Exports by Country"
      }

      $("#graphTitle").html(queryTitle);

      $.post("/search", queryBody)
      .done(function (data) {
        theOBJECT = data;
        clearLines();
        drawLines();
      })

    });

    $('#hamburger').click(function (evt) {
      evt.preventDefault();

      $.post("/hamburger", {dst: selectedCountryCode})
      .done(function (data) {
        theOBJECT = data;
        clearLines();
        drawLines();

        queryTitle = "Top Countries Exporting Hamburger Ingredients (Bread, Meat, Onions, Lettuce, Tomatoes)"
        $("#graphTitle").html(queryTitle);
      })
    })

    var worldmap = new Datamap({
      scope: 'world',
      element: document.getElementById('arcs'),
      projection: 'mercator',
      done: function(datamap) {
           datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
               $( "#dst" ).val(geography.properties.name);
               selectedCountryCode = geography.id;
           });
       }
    });

    var arrForChart = [];
    var arcLines = [];

    function clearLines() {
      arcLines = [];
    }

    var temp;
    function drawLines() {
      arrForChart = [];
      theOBJECT.forEach(function(element, idx){

        if (theOBJECT.length - idx <= 5){
          temp = {};
          temp.label = element.src;
          temp.y = element.value;
          arrForChart.push(temp);
        }

        if (element.src === 'USA') {
          arcLines.push({
            origin: {
              latitude: 40,
              longitude: -99
            },
            destination: element.dst,
            options: {
              strokeWidth: Math.log(element.value)/Math.log(5)
            }
          })
        }
        else if (element.dst === 'USA') {
          arcLines.push({
            origin: element.src,
            destination: {
              latitude: 40,
              longitude: -99
            },
            options: {
              strokeWidth: 1+Math.log(element.value)
            }
          })
        }
        else {
          arcLines.push({
            origin: element.src,
            destination: element.dst,
            options: {
              strokeWidth: 1+Math.log(element.value)
            }
          });
        }

      });

      console.log(arcLines);
      worldmap.arc( arcLines, {strokeWidth: 2});

      var chart = new CanvasJS.Chart("chartContainer", {
        theme: "theme2",//theme1
        backgroundColor: null,
        title:{
          fontColor: "#ffffff"
        },
        axisX: {
          title: "Countries",
          labelFontColor: "#ffffff",
          titleFontColor: "#ffffff"
        },
        axisY: {
          title: "Tons of Product",
          labelFontColor: "#ffffff",
          titleFontColor: "#ffffff"
        },
        animationEnabled: true,
        data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "column",
          dataPoints: arrForChart
        }
        ]
      });
      chart.render();


      var donut_chart = new CanvasJS.Chart("donutChart",
        {
        backgroundColor: null,
        interactivityEnabled: true,
        data: [
        {
         type: "doughnut",
         indexLabelFontSize: 10,
         indexLabelFontColor: "white",
         indexLabelFontStyle: "bold",
         radius: "100%",
         innerRadius: "50%",
         dataPoints: arrForChart,
         exploded: true
       },
       ]
        });
      donut_chart.render();

      $('#json-title').html("JSON Object of Query");
      $('#json-label').html("Double Click to Highlight All")

      $('#json').val(JSON.stringify(theOBJECT));
    }


});
