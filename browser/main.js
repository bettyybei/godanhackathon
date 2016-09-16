
$(function initializeMaps() {
    $( "#items" ).autocomplete({
      source: items
    });
/*
    $('#my-button').submit(){}*/

    var theOBJECT;
    $.get('/usa', function (data) {
        theOBJECT = data;
        console.log(data);

      var election = new Datamap({
        scope: 'world',
        element: document.getElementById('arcs'),
        projection: 'mercator',
        done: function(datamap) {
             datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                 alert(geography.properties.name);
             });
         }
      });


    var presidentialTrips = [];
    theOBJECT.forEach(function(element){

      if (element.src === 'USA') {
        presidentialTrips.push({
          origin: {
            latitude: 40,
            longitude: -99
          },
          destination: element.dst,
          options: {
            strokeWidth: Math.log(element.value)/Math.log(15)
          }
        })
      }
      else if (element.dst === 'USA') {
        presidentialTrips.push({
          origin: element.src,
          destination: {
            latitude: 40,
            longitude: -99
          },
          options: {
            strokeWidth: Math.log(element.value)/Math.log(15)
          }
        })
      }
      else {
        presidentialTrips.push({
          origin: element.src,
          destination: element.dst,
          options: {
            strokeWidth: Math.log(element.value)/Math.log(15)
          }
        });
      }

    });

    election.arc( presidentialTrips, {strokeWidth: 2});
});

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
