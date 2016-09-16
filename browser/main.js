
$(function initializeMaps() {

    // var theOBJECT;
    // $.get('/usa', function (data) {
    //     theOBJECT = data;
    //     console.log(data);
    //
    //         var election = new Datamap({
    //     scope: 'world',
    //     element: document.getElementById('arcs'),
    //     projection: 'mercator'
    //   });

    var theOBJECT = [{"id":7436,"dst":"USA","src":"AUS","item":"Bread","value":189,"createdAt":"2016-09-16T00:52:17.449Z","updatedAt":"2016-09-16T00:52:17.449Z"},
    {"id":13981,"dst":"USA","src":"BLR","item":"Bread","value":4,"createdAt":"2016-09-16T00:52:17.680Z","updatedAt":"2016-09-16T00:52:17.680Z"},
    {"id":19013,"dst":"USA","src":"BEL","item":"Bread","value":1,"createdAt":"2016-09-16T00:52:17.832Z","updatedAt":"2016-09-16T00:52:17.832Z"},
    {"id":19495,"dst":"USA","src":"BLZ","item":"Bread","value":2,"createdAt":"2016-09-16T00:52:17.844Z","updatedAt":"2016-09-16T00:52:17.844Z"},
    {"id":28976,"dst":"USA","src":"KHM","item":"Bread","value":6,"createdAt":"2016-09-16T00:52:18.116Z","updatedAt":"2016-09-16T00:52:18.116Z"},
    {"id":33716,"dst":"USA","src":"CAN","item":"Bread","value":7379,"createdAt":"2016-09-16T00:52:18.251Z","updatedAt":"2016-09-16T00:52:18.251Z"},
    {"id":35514,"dst":"USA","src":"CHL","item":"Bread","value":140,"createdAt":"2016-09-16T00:52:18.304Z","updatedAt":"2016-09-16T00:52:18.304Z"},
    {"id":36862,"dst":"USA","src":"COL","item":"Bread","value":109,"createdAt":"2016-09-16T00:52:18.338Z","updatedAt":"2016-09-16T00:52:18.338Z"},
    {"id":38293,"dst":"USA","src":"CRI","item":"Bread","value":106,"createdAt":"2016-09-16T00:52:18.382Z","updatedAt":"2016-09-16T00:52:18.382Z"},
    {"id":54388,"dst":"USA","src":"SLV","item":"Bread","value":45,"createdAt":"2016-09-16T00:52:18.882Z","updatedAt":"2016-09-16T00:52:18.882Z"}];
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
      presidentialTrips.push({
        origin: element['src'],
        destination: element['dst'],
        options: {
          strokeWidth: Math.log(element.value)/Math.log(15)
        }
      });
    });

    election.arc( presidentialTrips, {strokeWidth: 2});
});



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
