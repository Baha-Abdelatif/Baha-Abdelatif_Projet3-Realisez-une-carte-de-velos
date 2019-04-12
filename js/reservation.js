class ReservationUtilisateur{
  constructor(station, formulaire){
    this.formulaire = formulaire;
    this.station = station;
    this.nomUtilisateur = formulaire.nomUtilisateur;
    this.prenomUtilisateur = formulaire.prenomUtilisateur;
    this.nameStationReservation = station.nameStation;
    this.idStationReservation = station.id;
    this.addressStationReservation = station.address;
    this.heureReservation = timeObjects.afficherHeure();
    this.countDownReservation = {
      min : 20,
      sec : 0,
    }
  } // Fin constructor
  sessionStorage(){
      // Stockage des données utilisateurs en local :
    localStorage.setItem("nomUtilisateur", this.nomUtilisateur);
    localStorage.setItem("prenomUtilisateur", this.prenomUtilisateur);
    sessionStorage.setItem('nomReservation', this.nomUtilisateur);
    sessionStorage.setItem('prenomReservation', this.prenomUtilisateur);
    sessionStorage.setItem("nameStationReservation", this.nameStationReservation);
    sessionStorage.setItem('idStationReservation', this.idStationReservation);
    sessionStorage.setItem('addressStationReservation', this.addressStationReservation);
    sessionStorage.setItem('heureReservation', this.heureReservation);
    sessionStorage.setItem('countDownReservationMin', this.countDownReservation.min);
    sessionStorage.setItem('countDownReservationSec', this.countDownReservation.sec);
  } // Fin methode sessionStorage
}// Fin class ReservationUtilisateur
