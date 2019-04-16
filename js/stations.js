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
    // Methode verifiant l'etat d'une station et retournant une couleur d'icone
    if(this.status !== "OPEN" || this.available_bikes <= 0){
      return {icon: markersColors.redIcon};
    }else if(this.status === "OPEN" && this.available_bike_stands <= 0 && this.available_bikes > 0){
      return {icon: markersColors.yellowIcon};
    }else if(this.status === "OPEN" && this.available_bikes > 0){
      return {icon: markersColors.greenIcon};
    }
  } // Fin getMarkerColor

  addMarkerOnMap(map){
    // Methode chargée de l'ajout des marqueurs a la carte et des evenements associés
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
    // Cree et affiche la fiche d'infos associées
    // desactive l'ecouteur de securité sur le formulaire
    // initialise un nouvel ecouteur d'evenement
    this.ficheInfoStation.eltCreator();
    let self = this;
    const form = $('#formUtilisateur');
    form.off();
    form.on('submit', (e)=>{
      self.stationSubmit(e, self)
    })
  } // Fin markerOnclick

  stationSubmit(e, self){
    // Methode appelée lors de la soumission du formulaire si un marqueur est selectionné
    // crée un nouvel objet formulaire, un nouvel objet canvas et un nouvel objet reservation
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
    // Méthode verifiant l'etat d'une station
    if(this.status === "OPEN" && this.available_bikes > 0){
      return true;
    }else{
      return false;
    }
  } // Fin checkStatus
} // Fin Class StationObject


