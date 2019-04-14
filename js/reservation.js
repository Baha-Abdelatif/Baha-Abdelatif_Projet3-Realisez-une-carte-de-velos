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
  sessionConfirm(){
    clearInterval(timeObjects.compteur);
    this.sessionStorage();
    timeObjects.compteur = setInterval(timeObjects.countDown,1000);
    $('#canvasesContainer').css("display", "none");
    $('#formUtilisateur').css("display", "block");
    $('#alerteReservation').text("Confirmation : Votre reservation a été enregistrée.");
    $('#nomReservation').text(`Réservation faite au nom de ${sessionStorage.nomReservation} ${sessionStorage.prenomReservation}.`);
    $('#dateReservation').text(`Le ${sessionStorage.heureReservation}`);
    $('#countDownReservation').html(`Temps restant : <span id="countDownMin">${sessionStorage.countDownReservationMin}</span>mn<span id="countDownSec">${sessionStorage.countDownReservationSec}</span>s.`);
    $('#idStationReservation').text(`Nom de la station : ${sessionStorage.nameStationReservation}.`);
    $('#adresseStationReservation').text(`Adresse : ${sessionStorage.addressStationReservation}`);
    $('.infosReservation').css('display', 'block');
    $('#stationAvailableStands').text(`${this.station.available_bike_stands+1}/${this.station.bike_stands} place(s) disponible(s).`);
    $('#stationAvailableBikes').text(`${this.station.available_bikes-1} vélo(s) disponible(s).`);
    $('.stationsToulouse').removeClass('hidden');
    $('#availableStands').css('width', `${(((this.station.available_bike_stands+1) * 100)/this.station.bike_stands)*2-2}px`);
    $('#availableBikes').css('width', `${(((this.station.available_bikes-1) * 100)/this.station.bike_stands)*2-2}px`);
  }
  sessionError(){
    $('#alerteReservation').text("Erreur : Veuillez signer le formulaire pour confirmer la reservation.");
    $('.infosReservation').css('display', 'block');
  }
}// Fin class ReservationUtilisateur
