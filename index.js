
// Bounds for the map
const KS_BOUNDS = {
  north: 44.110592,
  south: 43.674324,
  west: 18.068088,
  east: 18.542087,
}
// Center
const Sarajevo = {
    lat: 43.86, 
    lng : 18.41,
}
//declaring variables of start and end locations, also button
let start_latitude, start_longitude, end_latitude, end_longitude;
let button = document.querySelector(".search")
let start, end;
// function to find start and end
// input: values from input text field
// => start and end locations are found/not found in our "base"
// also used to call initMap()
// will probably be removed
function findStartEnd() {
    let start = document.getElementById('start').value
    let end = document.getElementById('end').value
    console.log(start)
    locations.forEach(function(location){
    
    if (location.Name == start){
       start_latitude = location.Latitude;
       start_longitude = location.Longitude
    }
    if (location.Name == end){
        end_latitude = location.Latitude;
        end_longitude = location.Longitude;
    }
    
})
    initMap()
}
// on click call findStartEnd
document.querySelector('.search').addEventListener("click", ()=>findStartEnd());
//declaring necessary variables for googlemaps
let map;
let directionsService;
let directionsDisplay;
// Initialize and add the map
      function initMap() {
        // Some random location in Sarajevo, used to "center" Kanton Sarajevo
        // The map, centered at Sarajevo

        const map = new google.maps.Map(document.getElementById("map"), {
          zoom:  12,
          center: Sarajevo,
          restriction: {
              latLngBounds: KS_BOUNDS,
              strictBounds: true,
          }
        });

        // necessary for directions
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map)
        // start and end points on the map
        //start = new google.maps.LatLng(start_latitude, start_longitude)
        //end = new google.maps.LatLng(end_latitude, end_longitude)


        calcRoute (start, end);
        // marker can be added
        /* const marker = new google.maps.Marker({
          position: location,
          map: map,
        }); */

        map.setZoom(map.getZoom() + 5);
      
    
    }
    
    function calcRoute (start, end){
        // changing request, more details on directions api documentation page
        // https://developers.google.com/maps/documentation/directions/get-directions
        let request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.TRANSIT, // change to transit,
            provideRouteAlternatives: true
        };

        directionsService.route(request, function(response, status){
            console.log(response.routes)
            let duration = []
            response.routes.forEach(x => duration.push(x.legs[0].duration.text))
            duration.forEach(x => x=getDuration(x))
            newDuration = duration.map(x => getDuration(x))
            console.log(newDuration)
            let minimumDuration = Math.min.apply(Math,newDuration)
            let minimumDurationIndex = newDuration.indexOf(minimumDuration)
            console.log(minimumDuration)
            console.log(minimumDurationIndex)
            if(status == "OK"){
                for (i = 0; i < typeOfRoute.length; i++){
                    console.log(typeOfRoute[i])
                    console.log(typeOfRoute[i].checked)
                    console.log(typeOfRoute[i].value)
                    if (typeOfRoute[i].checked && typeOfRoute[i].value == 'Fastest'){
                        /* response.routes.forEach(function(x){
                            console.log(minimumDuration)
                            console.log((x.legs[0].duration.text))
                            if (Number(x.legs[0].duration.text) === minimumDuration){
                                console.log(response.routes[0])
                                console.log(x)
                                response.routes[0] = x;
                            }
                        }) */
                        response.routes[0]=response.routes[minimumDurationIndex]
                    }
                }
                //Ilidža Thermal Riviera, Butmirska cesta, Ilidža, Bosnia and Herzegovina
                //Vogošća, Partizanskog odreda Zvijezda, Vogošća, Bosnia and Herzegovina

                console.log(response)
                directionsDisplay.setDirections(response);
            }
        })
    }
// Converts from duration in string to duration in minutes (number)
function getDuration(time){
    time = time.split(' ')
    if (time.length == 2){
        return Number(time[0])
    }
    if (time.length == 4){
        return Number(time[0]*60) + Number(time[2])
    }
}
// autocomplete search part

let autocomplete
function initAutocomplete(){
    
    autocomplete1 = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
        types:['establishment'],
        componentRestrictions:{'country':['BA']},
        fields:['geometry']
    });
    const southwest = { lat: KS_BOUNDS['south'], lng: KS_BOUNDS['west'] };
    const northeast = { lat: KS_BOUNDS['north'], lng: KS_BOUNDS['east'] };
    const newBounds = new google.maps.LatLngBounds(southwest, northeast);
    autocomplete1.setBounds(newBounds);
    autocomplete2 = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete2'),
    {
        types:['establishment'],
        componentRestrictions:{'country':['BA']},
        fields:['geometry']
    });
    autocomplete2.setBounds(newBounds)
    google.maps.event.addListener(autocomplete1, 'place_changed', function(){
        var near_place = autocomplete1.getPlace();
        start_latitude = near_place.geometry.location.lat();
        start_longitude = near_place.geometry.location.lng()
    })

    google.maps.event.addListener(autocomplete2, 'place_changed', function(){
        var near_place = autocomplete2.getPlace();
        end_latitude = near_place.geometry.location.lat()
        end_longitude = near_place.geometry.location.lng()
        
    })
    
}
initAutocomplete()
function startCalcRoute(){

    start = new google.maps.LatLng(start_latitude, start_longitude)
    end = new google.maps.LatLng(end_latitude, end_longitude)

    initMap();
}

document.querySelector('#search_2').addEventListener("click", ()=>startCalcRoute());
let typeOfRoute = document.getElementsByName('typeOfRoute')