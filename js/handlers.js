let handlerTools = {
  init : function(){
    $('.infosReservation').css('display', 'none');
    const form = $('#formUtilisateur');
    form.on('submit', (e) => {
      $('#alerteReservation').text('Réservation Impossible : Veuillez sélectionner une station.');
      $('#alerteReservation').css('display', 'block');;
      e.preventDefault();
    }); // verification qu'un marqueur est selectionné

    const mymap = L.map('mapid').setView([43.603887, 1.437677], 15);
    let tileStreets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 12,
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYmFoYS1hYmRlbGF0aWYiLCJhIjoiY2p0OGVib2p0MDBkZDQ0bW5lNHh6aTdtMSJ9.XYEAsEUsYpmH-2H-85NnqQ'
    });
    tileStreets.addTo(mymap);

    if(localStorage.nomUtilisateur){
      $('#nomUtilisateur').val(localStorage.nomUtilisateur);
      $('#prenomUtilisateur').val(localStorage.prenomUtilisateur);
    }
    if(sessionStorage.heureReservation){
      $('#alerteReservation').text("Confirmation : Votre reservation a été enregistrée.");
      $('#nomReservation').text(`Réservation faite au nom de ${sessionStorage.nomReservation} ${sessionStorage.prenomReservation}.`);
      $('#dateReservation').text(`Le ${sessionStorage.heureReservation}`);
      $('#countDownReservation').html(`Temps restant : <span id="countDownMin">${sessionStorage.countDownReservationMin}</span>mn<span id="countDownSec">${sessionStorage.countDownReservationSec}</span>s.`);
      $('#idStationReservation').text(`Nom de la station : ${sessionStorage.nameStationReservation}.`);
      $('#adresseStationReservation').text(`Adresse : ${sessionStorage.addressStationReservation}`);
      $('.infosReservation').css('display', 'block');
      clearInterval(timeObjects.compteur);
      timeObjects.compteur = setInterval(timeObjects.countDown,1000);
    }
    $.get(
      "https://api.jcdecaux.com/vls/v1/stations",
      'contract=Toulouse&apiKey=ec4977f8525964284667898c365245377907bf85',
      getCallBack,
      'JSON'
    );
    function getCallBack(reponse){
      // transforme la requete en fichier JSON :
      let listeStations = reponse;
      for (station of listeStations){
        if(station.number !== 1033){
          let stationId = `stationObjectNo${station.number}`;
          window[stationId] = new StationObject(station);
          let stationMarker = window[stationId].addMarkerOnMap(mymap);
        }
      } // Fermeture For station
    } // Fermeture CallBack
  }
}
