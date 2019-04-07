class ReservationUtilisateur{
  constructor(station, formulaire){
    this.formulaire = formulaire;
    this.nomUtilisateur = formulaire.nomUtilisateur;
    this.prenomUtilisateur = formulaire.prenomUtilisateur;
    this.signatureReservation = "";
    this.nameStationReservation = station.nameStation;
    this.idStationReservation = station.id;
    this.addressStationReservation = station.address;
    this.heureReservation = timeObjects.afficherHeure();
  } // Fin constructor
  clearSession(){
    sessionStorage.clear();
    localStorage.clear();
  } // Fin methode clearSession
  countDown(){
    if(sessionStorage.heureReservation){
      if(sessionStorage.countDownReservation > 0){
        sessionStorage.countDownReservation--;
        $('#countDown').html(sessionStorage.countDownReservation);
      }else{
        sessionStorage.clear();
        $('#alerteReservation').html("Votre reservation est expirée veuillez la renouveler.");
        $('#alerteReservation').siblings().html("");
        $('#alerteReservation').siblings().css('display', 'none');
      }
    }
  } // Fin methode countDown
  sessionStorage(){
      // Stockage des données utilisateurs en local :
    localStorage.setItem("nomUtilisateur", this.nomUtilisateur);
    localStorage.setItem("prenomUtilisateur", this.prenomUtilisateur);
    sessionStorage.setItem('nomReservation', this.nomUtilisateur);
    sessionStorage.setItem('prenomReservation', this.prenomUtilisateur);
    sessionStorage.setItem('signatureReservation', this.signatureReservation);
    sessionStorage.setItem("nameStationReservation", this.nameStationReservation);
    sessionStorage.setItem('idStationReservation', this.idStationReservation);
    sessionStorage.setItem('addressStationReservation', this.addressStationReservation);
    sessionStorage.setItem('heureReservation', this.heureReservation);
    sessionStorage.setItem('countDownReservation', 20);
  } // Fin methode sessionStorage
}// Fin class ReservationUtilisateur
