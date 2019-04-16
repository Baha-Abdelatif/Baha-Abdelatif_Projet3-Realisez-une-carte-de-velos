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
      sec : "00",
    };
  } // Fin constructor

  sessionStorage(){
    // Stockage des données utilisateurs en local :
    localStorage.setItem("nomUtilisateur", this.nomUtilisateur);
    localStorage.setItem("prenomUtilisateur", this.prenomUtilisateur);
    sessionStorage.setItem('nomReservation', this.nomUtilisateur);
    sessionStorage.setItem('prenomReservation', this.prenomUtilisateur);
    sessionStorage.setItem("nameStationReservation", this.nameStationReservation);
    sessionStorage.setItem('addressStationReservation', this.addressStationReservation);
    sessionStorage.setItem('heureReservation', this.heureReservation);
    sessionStorage.setItem('countDownReservationMin', this.countDownReservation.min);
    sessionStorage.setItem('countDownReservationSec', this.countDownReservation.sec);
    sessionStorage.setItem('timestampReservation', Date.now());
  } // Fin méthode sessionStorage

  sessionConfirm(){
    // Confirmation de la réservation
    // Initialisation du compte a rebours
    // initialisation du stockage des données utilisateur
    // Affichage des informations réservation
    clearInterval(timeObjects.compteur);
    this.sessionStorage();
    timeObjects.compteur = setInterval(timeObjects.countDown,1000);
    $('#canvasesContainer').css("display", "none");
    $('#formUtilisateur').css("display", "block");
    $('#alerteReservation').text("Confirmation : Votre réservation a été enregistrée.");
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
  } // Fin méthode sessionConfirm

  sessionError(){
    // Rejet de la réservation
    // Affichage d'un message d'erreur
    $('#alerteReservation').text("Erreur : Veuillez signer le formulaire pour confirmer la réservation.");
    $('.infosReservation').css('display', 'block');
  } // Fin Méthode sessionError

  emptyStation(station){
    // Méthode appelée si la station sélectionnée est vide
    $('.infosReservation').text('');
    $('#alerteReservation').text('Réservation Impossible : Station vide.');
    $('#nomReservation').text('Veuillez sélectionner une autre station ou revenir ultérieurement.');
    $('#dateReservation').text(`Derniere mise a jour le ${timeObjects.afficherHeure()}`);
    $('#idStationReservation').text(`Nom de la station : ${station.nameStation}`);
    $('#adresseStationReservation').text(`Adresse : ${station.address}`);
    $('.infosReservation').css('display', 'block');
  } // Fin emptyStation
}// Fin class ReservationUtilisateur

