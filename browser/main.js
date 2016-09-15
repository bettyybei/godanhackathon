$(function initializeMaps() {
    var map = new Datamap({element: document.getElementById('container')});
    var theOBJECT = [{'src':'Argentina','dst':'Greenland','element':'Chicken','val':'125'}, {'src':'Brazil','dst':'Russia','element':'Dog','val':'9999'}];


    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
    var countryCodeDict = {};
    for (var i = 0, j = countries.length; i < j; i++) {
      countryCodeDict[countries[i].properties.name] = countries[i].id;
    }
    console.log(countryCodeDict);


    var election = new Datamap({
        scope: 'world',
        element: document.getElementById('arcs'),
        projection: 'mercator'
      });


    var presidentialTrips = [];
    theOBJECT.forEach(function(element){
      presidentialTrips.push({
        origin: countryCodeDict[element['src']],
        destination: countryCodeDict[element['dst']]
      });
    });

    election.arc( presidentialTrips, {strokeWidth: 2});
});
// Only show arrows to this destination
// function selectDst(arr, dst){
//   var returnArr = [];
//   arr.forEach(function(element){
//     if (element.destination === dst){
//       console.log('match');
//     }
//   });
// }
