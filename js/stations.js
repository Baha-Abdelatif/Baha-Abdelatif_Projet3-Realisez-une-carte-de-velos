class StationObject {
  constructor(station){
    const regexStationName = /^[0-9]+\s.\s/m;
    const regexStationAddress = /[\s-\s]*31\d+\s[a-zA-z]+/m;
    this.nameStation = station.name.replace(regexStationName,"");
    this.address = station.address.replace(regexStationAddress,"");
    this.available_bike_stands = station.available_bike_stands;
    this.available_bikes = station.available_bikes;
    this.bike_stands = station.bike_stands;
    this.position = station.position;
    this.status = station.status;
    this.ficheInfoStation = new FicheInfoStation(this.nameStation,
                                                 this.address,
                                                 this.available_bike_stands,
                                                 this.bike_stands,
                                                 this.available_bikes);
  } // Fin constructor

  getMarkerColor(){
    // Méthode vérifiant l’état d'une station et retournant une couleur d’icône
    if(this.status !== "OPEN" || this.available_bikes <= 0){
      return {icon: markersColors.redIcon};
    }else if(this.status === "OPEN" && this.available_bike_stands <= 0 && this.available_bikes > 0){
      return {icon: markersColors.yellowIcon};
    }else if(this.status === "OPEN" && this.available_bikes > 0){
      return {icon: markersColors.greenIcon};
    }
  } // Fin getMarkerColor

  addMarkerOnMap(map){
    // Méthode chargée de l'ajout des marqueurs a la carte et des événements associés
    let stationMarker = L.marker([this.position.lat, this.position.lng], this.getMarkerColor());
    let self = this;
    stationMarker.on('click', ()=>{
      $('#canvasesContainer').css("display", "none");
      $('#formUtilisateur').css("display", "block");
      $('.infosReservation').css('display', 'none');
      self.markerOnClick();
    });
    stationMarker.addTo(map);
  } // Fin addMarkerOnMap

  markerOnClick(){
    // Méthode appelée lors du clic sur un marqueur
    // Crée et affiche la fiche d'infos associées
    // désactive l’écouteur de sécurité sur le formulaire
    // initialise un nouvel écouteur d’événement
    this.ficheInfoStation.eltCreator();
    let self = this;
    const form = $('#formUtilisateur');
    form.off();
    form.on('submit', (e)=>{
      self.stationSubmit(e, self)
    })
  } // Fin markerOnclick

  stationSubmit(e, self){
    // Méthode appelée lors de la soumission du formulaire si un marqueur est sélectionné
    // crée un nouvel objet formulaire, un nouvel objet canvas et un nouvel objet réservation
    let formulaire = new Formulaire();
    let canvas = new Canvas();
    let reservation = new ReservationUtilisateur(self, formulaire, canvas);
    if(self.checkStatus()){
      formulaire.checkForm(self, reservation, canvas);
    }else{
      reservation.emptyStation(self);
    }
    e.preventDefault();
  }
  checkStatus(){
    // Méthode vérifiant l’état d'une station
    if(this.status === "OPEN" && this.available_bikes > 0){
      return true;
    }else{
      return false;
    }
  } // Fin checkStatus
} // Fin Class StationObject


