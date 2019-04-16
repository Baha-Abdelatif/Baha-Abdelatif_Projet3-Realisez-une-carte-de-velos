let handlerTools = {
  init(){
    // Appellee au chargement de la page
    // appelle la fonction d'initialisation du slider
    // initialise la requete ajax
    // verifie qu'un marqueur est selectionné et les informations de sessions
    sliderObject.init();
    const form = $('#formUtilisateur');
    handlerTools.checkSession(form)
    handlerTools.noMarkerSelected(form);
    $.get(
      "https://api.jcdecaux.com/vls/v1/stations",
      'contract=Toulouse&apiKey=ec4977f8525964284667898c365245377907bf85',
      handlerTools.getCallBack,
      'JSON'
    );
  }, // Fermeture Méthode init

  getCallBack(reponse){
    // Méthode appelée a la reception de la reponse AJAX
    // initialise la carte
    // parcours la reponse de l'api jc decaux et Cree un nouvel objet station avec chaque station recuperée
    const mymap = L.map('mapid').setView([43.603887, 1.437677], 15);
    handlerTools.mapbox(mymap);
    let listeStations = reponse;
    for (station of listeStations){
      if(station.number !== 1033){ // Station de test non affichée
        let stationId = `stationObjectNo${station.number}`;
        window[stationId] = new StationObject(station);
        let stationMarker = window[stationId].addMarkerOnMap(mymap);
      }
    }
  }, // Fermeture Méthode CallBack

  mapbox(mymap){
    // Méthode d'initialisation de la carte
    let tileStreets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
    minZoom: 12,
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYmFoYS1hYmRlbGF0aWYiLCJhIjoiY2p0OGVib2p0MDBkZDQ0bW5lNHh6aTdtMSJ9.XYEAsEUsYpmH-2H-85NnqQ',
    });
    tileStreets.addTo(mymap);
  }, // Fermeture Méthode mapbox

  noMarkerSelected(form){
    // "ecouteur de securité" verification qu'un marqueur est selectionné lors de la soumission du formulaire
    form.on('submit', (e) => {
      $('#alerteReservation').text('Réservation Impossible : Veuillez sélectionner une station.');
      $('#alerteReservation').siblings().css('display', 'none');
      $('#alerteReservation').css('display', 'block');
      e.preventDefault();
    });
  }, // Fermeture Méthode noMarkerSelected

  checkSession(form){
    // Méthode verifiant si une reservation ulterieure existe
    // pour pré remplir le formulaire et afficher les infos reservation
    if(localStorage.nomUtilisateur){
      $('#nomUtilisateur').val(localStorage.nomUtilisateur);
      $('#prenomUtilisateur').val(localStorage.prenomUtilisateur);
    }
    if(sessionStorage.heureReservation){
      $('#alerteReservation').text("Information : Une reservation est enregistrée.");
      $('#nomReservation').text(`Réservation faite au nom de ${sessionStorage.nomReservation} ${sessionStorage.prenomReservation}.`);
      $('#dateReservation').text(`Le ${sessionStorage.heureReservation}`);
      $('#countDownReservation').html(`Temps restant : <span id="countDownMin">${sessionStorage.countDownReservationMin}</span>mn<span id="countDownSec">${sessionStorage.countDownReservationSec}</span>s.`);
      $('#idStationReservation').text(`Nom de la station : ${sessionStorage.nameStationReservation}.`);
      $('#adresseStationReservation').text(`Adresse : ${sessionStorage.addressStationReservation}`);
      $('.infosReservation').css('display', 'block');
      clearInterval(timeObjects.compteur);
      timeObjects.compteur = setInterval(timeObjects.countDown,1000);
    }
  } // Fermeture Méthode checkSession
} // Fermeture objet handlerTools

