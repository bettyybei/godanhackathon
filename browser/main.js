
$(function initializeMaps() {
    var map = new Datamap({element: document.getElementById('container')});

    var theOBJECT;
    $.get('/usa', function (data) {
        theOBJECT = data;
        console.log(data);

            var election = new Datamap({
        scope: 'world',
        element: document.getElementById('arcs'),
        projection: 'mercator'
      });


    var presidentialTrips = [];
    theOBJECT.forEach(function(element){
      presidentialTrips.push({
        origin: element['src'],
        destination: element['dst']
      });
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
