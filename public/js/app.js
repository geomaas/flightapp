$(document).ready(function() {

  $('#map').gmap3({
    address: "13 wraggborough Ln Charleston SC",
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
flightApp.init();

});
var flightApp  = {
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
      var objToSave = {
        description: $('input[name="desc"]').val()
      }
      debugger
      flightApp.create(JSON.stringify(objToSave));

      $('input').val("");
    })
  },

  create: function() {

  },

  read: function() {
    $.ajax({
          type: 'GET',
          url: 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/tracks/AA/5507/arr/2017/06/21?appId=b3c08bb5&appKey=02ec90f725f1222fc377b108101d59f3&utc=false',
          dataType: 'json',
          // jsonpCallback: 'flightstatus',
          success: function(data) { console.log('Success!', data); },
          error: function() { console.log('Uh Oh!'); }
        });
  },
  update: function() {

  },

  destroy: function() {

  }
}
