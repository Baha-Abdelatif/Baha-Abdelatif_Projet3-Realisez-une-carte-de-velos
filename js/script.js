window.onload = function(){
    sliderObject.init();
    $('.infosReservation').css('display', 'none');
    form.on('submit', (e) => {
        $('#alerteReservation').html('Réservation Impossible : Veuillez sélectionner une station.');
        $('#alerteReservation').css('display', 'block');;
        e.preventDefault();
    }); // verification qu'un marqueur est selectionné

    if(localStorage.nomUtilisateur){
      $('#nomUtilisateur').val(localStorage.nomUtilisateur);
      $('#prenomUtilisateur').val(localStorage.prenomUtilisateur);
    }
    $.get(
        "https://api.jcdecaux.com/vls/v1/stations",
        'contract=Toulouse&apiKey=ec4977f8525964284667898c365245377907bf85',
        getCallBack,
        'JSON'
    );
    function getCallBack(reponse){
        // transforme la requete en fichier JSON :
        var listeStations = reponse;
        for (station of listeStations){
            if(station.number !== 1033){
                var stationId = `stationObjectNo${station.number}`;
                window[stationId] = new StationObject(station);
                var stationMarker = window[stationId].addMarkerOnMap(mymap);
            }
        } // Fermeture For station
    } // Fermeture CallBack

} // Fermeture onLoad()
