class StationObject {
  constructor(station){
    //    Creation du titre de la station :
    const regexStationName = /^[0-9]+\s.\s/gm;
    const regexStationAddress = /[\s-\s]*31\d+\s[a-zA-z]+/gm;
    this.id = station.contract_name+station.number;
    this.nameStation = station.name.replace(regexStationName,"");
    this.address = station.address.replace(regexStationAddress,"");
    this.available_bike_stands = station.available_bike_stands;
    this.available_bikes = station.available_bikes;
    this.banking = station.banking;
    this.bike_stands = station.bike_stands;
    this.bonus = station.bonus;
    this.contract_name = station.contract_name;
    this.last_update = station.last_update;
    this.number = station.number;
    this.position = station.position;
    this.status = station.status;
    this.ficheInfoStation = new FicheInfoStation(this.id, this.nameStation, this.address, this.available_bike_stands, this.bike_stands, this.available_bikes);
  } // Fin constructor
  getMarkerColor(){
    if(this.status !== "OPEN" || this.available_bikes <= 0){
      return {icon: redIcon};
    }else if(this.status === "OPEN" && this.available_bike_stands <= 0 && this.available_bikes > 0){
      return {icon: yellowIcon};
    }else if(this.status === "OPEN" && this.available_bikes > 0){
      return {icon: greenIcon};
    }
  } // Fin getMarkerColor
  addMarkerOnMap(map){
    let stationMarker = L.marker([this.position.lat, this.position.lng], this.getMarkerColor());
    let self = this;
    stationMarker.on('click', function(){
      $('#canvasesContainer').css("display", "none");
      $('#submitForm').css("display", "block");
      $('.infosReservation').css('display', 'none');
      self.markerOnClick();
      form.off();
      form.on('submit', function(e){
        var formulaire = new Formulaire();
        var canvas = new Canvas();
        var reservation = new ReservationUtilisateur(self, formulaire);
        if(self.checkStatus()){
          formulaire.checkForm(self, reservation, canvas)
        }else{
          self.emptyStation();
        }
        e.preventDefault(); // Annulation de l'envoi des données
      })
    });
    stationMarker.addTo(map);
  } // Fin addMarkerOnMap
  markerOnClick(){
    this.ficheInfoStation.eltCreator();
  } // Fin markerOnclick
  checkStatus(){
    if(this.status === "OPEN" && this.available_bikes > 0){
      return true;
    }else{
      return false;
    }
  } // Fin checkStatus
  emptyStation(){
    $('#alerteReservation').html('Réservation Impossible : Station vide.');
    $('#nomReservation').html('Veuillez selectionner une autre station ou revenir ulterieurement.');
    $('#dateReservation').html('Derniere mise a jour le '+ afficherHeure());
    $('#idStationReservation').html('Nom de la station : '+this.nameStation);
    $('#adresseStationReservation').html('Adresse : '+this.address);
    $('.infosReservation').css('display', 'block');
  } // Fin emptyStation
} // Fin Class StationObject

