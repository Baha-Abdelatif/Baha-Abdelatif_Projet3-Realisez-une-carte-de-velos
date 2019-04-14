class StationObject {
  constructor(station){
    //    Creation du titre de la station :
    const regexStationName = /^[0-9]+\s.\s/m;
    const regexStationAddress = /[\s-\s]*31\d+\s[a-zA-z]+/m;
    this.id = station.contract_name+station.number;
    this.nameStation = station.name.replace(regexStationName,"");
    this.address = station.address.replace(regexStationAddress,"");
    this.available_bike_stands = station.available_bike_stands;
    this.available_bikes = station.available_bikes;
    this.bike_stands = station.bike_stands;
    this.position = station.position;
    this.status = station.status;
    this.ficheInfoStation = new FicheInfoStation(this.id, this.nameStation, this.address, this.available_bike_stands, this.bike_stands, this.available_bikes);
  } // Fin constructor
  getMarkerColor(){
    if(this.status !== "OPEN" || this.available_bikes <= 0){
      return {icon: markersColors.redIcon};
    }else if(this.status === "OPEN" && this.available_bike_stands <= 0 && this.available_bikes > 0){
      return {icon: markersColors.yellowIcon};
    }else if(this.status === "OPEN" && this.available_bikes > 0){
      return {icon: markersColors.greenIcon};
    }
  } // Fin getMarkerColor
  addMarkerOnMap(map){
    let stationMarker = L.marker([this.position.lat, this.position.lng], this.getMarkerColor());
    let self = this;
    stationMarker.on('click', function(){
      $('#canvasesContainer').css("display", "none");
      $('#formUtilisateur').css("display", "block");
      $('.infosReservation').css('display', 'none');
      self.markerOnClick();
    });
    stationMarker.addTo(map);
  } // Fin addMarkerOnMap
  markerOnClick(){
    this.ficheInfoStation.eltCreator();
    const form = $('#formUtilisateur');
    form.off();
    let self = this;
    form.on('submit', function(e){
      let formulaire = new Formulaire();
      let canvas = new Canvas();
      let reservation = new ReservationUtilisateur(self, formulaire, canvas);
      if(self.checkStatus()){
        formulaire.checkForm(self, reservation, canvas);
      }else{
        self.emptyStation();
      }
      e.preventDefault(); // Annulation de l'envoi des données
    })
  } // Fin markerOnclick
  checkStatus(){
    if(this.status === "OPEN" && this.available_bikes > 0){
      return true;
    }else{
      return false;
    }
  } // Fin checkStatus
  emptyStation(){
    $('.infosReservation').text('');
    $('#alerteReservation').text('Réservation Impossible : Station vide.');
    $('#nomReservation').text('Veuillez selectionner une autre station ou revenir ulterieurement.');
    $('#dateReservation').text('Derniere mise a jour le '+ timeObjects.afficherHeure());
    $('#idStationReservation').text('Nom de la station : '+this.nameStation);
    $('#adresseStationReservation').text('Adresse : '+this.address);
    $('.infosReservation').css('display', 'block');
  } // Fin emptyStation
} // Fin Class StationObject

