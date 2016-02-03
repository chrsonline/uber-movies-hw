jQuery(document).ready(function () {
    var map;

    var options = {
        zoom: 11,
        center:  new google.maps.LatLng(37.793, -122.394),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    map = new google.maps.Map($('#map')[0], options);

    var resultsView = new ResultsView({ map: map });
    var autocompleteView = new AutocompleteView({ resultsView: resultsView });

    $('#search-term').keydown(
      function(e) {
        if(e.keyCode == 13) {
          $('#search-term').autocomplete('close');
          resultsView.updateItems();
        }
      }
    );

});
