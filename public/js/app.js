$(document).ready(function() {

  $('#map').gmap3({
    address: "Charleston SC",
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  flightApp.init();

});
var flightApp = {
  url: "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/tracks/",
  appId: "?appId=b3c08bb5&appKey=02ec90f725f1222fc377b108101d59f3&utc=false&includeFlightPlan=true&maxPositions=2&sourceType=raw",
  init: function() {
    flightApp.events();
    flightApp.styling();
  },


  styling: function() {
    flightApp.read();
  },

  events: function() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      let flightInfoString = $('.selectpicker option:selected').val() + "/" + $('input[name="flight-num"]').val() + "/arr/" + moment(new Date).format('YYYY/MM/DD');

      $.ajax({
        type: 'GET',
        url: flightApp.url + flightInfoString.toString() + flightApp.appId,
        dataType: 'jsonp',
        jsonpCallback: 'flightstatus',
        success: function(data) {
          console.log('Success!', data);

          let planePosition = [data.flightTracks[0].positions[0].lat, data.flightTracks[0].positions[0].lon];
          console.log(planePosition);

          $('#map')
            .gmap3({
              center: planePosition,
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            })
            .marker({
              position: planePosition,
              icon: 'http://maps.google.com/mapfiles/marker_green.png'
            })
            .marker({
              position: userPosition,
              icon: 'http://maps.google.com/mapfiles/marker_green.png'
            })
            .polyline({
              strokeColor: "#000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
              path: [
                planePosition,
                userPosition
              ]
            });

            console.log('distance:', haversineDistance(userPosition, planePosition, true).toFixed(2) + "miles");
            $('#dist').append("<h3>" + haversineDistance(userPosition, planePosition, true).toFixed(2) + 'miles' + "</h3>")

        },
        error: function() {
          console.log('Uh Oh!');
        }
      });
      $('input').val("");
    })

    function haversineDistance(coords1, coords2, isMiles) {
      function toRad(x) {
        return x * Math.PI / 180;
      }

      var lat1 = coords1[0];
      var lon1 = coords1[1];

      var lat2 = coords2[0];
      var lon2 = coords2[1];

      var R = 6371; // km

      var x1 = lat2 - lat1;
      var dLat = toRad(x1);
      var x2 = lon2 - lon1;
      var dLon = toRad(x2)
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;

      if (isMiles) d /= 1.60934;

      return d;
    }
    // grab users position
    let userPosition = [];
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log("position", position);
        userPosition = [position.coords.latitude, position.coords.longitude]
      },
      function(error) {
        alert("Can't get location!")
      }
    );

  },

  create: function() {

  },

  read: function() {

  },
  update: function() {

  },

  destroy: function() {

  }
}

$('.selectpicker').selectpicker();
