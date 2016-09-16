
$(function initializeMaps() {
    $( "#items" ).autocomplete({
      source: items
    });

    var theOBJECT, selectedCountryCode;

    $('#my-button').click(function(evt){
      evt.preventDefault();
      var selectedItem = $('#items').val();
      var queryBody = {
        dst: selectedCountryCode
      }
      if (selectedItem !== '') {
        queryBody.item = selectedItem;
      }
      console.log(queryBody);

      $.post("/search", queryBody)
      .done(function (data) {
        theOBJECT = data;
        console.log("DATA", data);
        clearLines();
        drawLines();
      })

    });


    $.get('/usa', function (data) {
        theOBJECT = data;
        console.log(data);
    });

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



    var arcLines = [];

    function clearLines() {
      arcLines = [];
    }

    function drawLines() {
      theOBJECT.forEach(function(element){

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
    }




})

/*    var theOBJECT = [{'src':'ARM','dst':'AUS','item':'Chicken','val':'125'}, {'src':'BEN','dst':'BTN','item':'Dog','val':'9999'}];
*/

// Only show arrows to this destination
// function selectDst(arr, dst){
//   var returnArr = [];
//   arr.forEach(function(element){
//     if (element.destination === dst){
//       console.log('match');
//     }
//   });
// }
