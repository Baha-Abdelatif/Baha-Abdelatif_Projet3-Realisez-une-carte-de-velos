class Formulaire {
  constructor(){
    this.returnedMessage = "Réservation Impossible : </br>";
    this.nomUtilisateur = document.getElementById('nomUtilisateur').value;
    this.prenomUtilisateur = document.getElementById('prenomUtilisateur').value;
  } // Fin constructor

  checkLength(){
    // Vérification des information saisies dans le formulaire
    // retourne false et ajoute le message d'erreur associé en cas d'erreur
    // retourne true en cas de succès
    const formRegex = /[\W+\d+]*[^\s\'a-zA-Z+\-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+/m;
    if((this.nomUtilisateur.length < 3)
      || (this.prenomUtilisateur.length < 3)
      || (this.nomUtilisateur.length > 21)
      || (this.prenomUtilisateur.length > 21)
      || (formRegex.test(this.prenomUtilisateur))
      || (formRegex.test(this.nomUtilisateur))){
        if(this.nomUtilisateur.length < 3){
          this.returnedMessage += "Le nom est trop court (3 caractères min.)<br/>";
        }
        if(this.nomUtilisateur.length > 21){
          this.returnedMessage += "Le nom est trop long (21 caractères max.)<br/>";
        }
        if(this.prenomUtilisateur.length < 3){
          this.returnedMessage += "Le prénom est trop court (3 caractères min.)<br/>";
        }
        if(this.prenomUtilisateur.length > 21){
          this.returnedMessage += "Le prénom est trop long (21 caractères max.)<br/>";
        }
        if(formRegex.test(this.prenomUtilisateur)){
          this.returnedMessage += "Le prénom contient des caractères non autorisés.<br/>";
        }
        if(formRegex.test(this.nomUtilisateur)){
          this.returnedMessage += "Le nom contient des caractères non autorisés.<br/>";
        }
        return false;
      }else{
        return true;
      }
  } // Fin méthode checkLength

  checkForm(self, reservation, canvas){
    // Méthode de confirmation du formulaire
    // Affiche les informations de réservation
    // appelle la méthode d'initialisation du canvas
    if(this.checkLength()){
      $('#alerteReservation').text("Formulaire vérifié : Veuillez signer pour confirmer votre réservation.");
      $('#alerteReservation').siblings().text("");
      $('#alerteReservation').siblings().css('display', 'none');
      $('#alerteReservation').css('display', 'block');
      $('.infosReservation').css('display', 'block');
      canvas.init(reservation);
    }else{
      $('#alerteReservation').text("");
      $('#alerteReservation').html(this.returnedMessage);
      $('#alerteReservation').siblings().text("");
      $('#alerteReservation').siblings().css('display', 'none');
      $('#alerteReservation').css('display', 'block');
      $('.infosReservation').css('display', 'block');
    }
  } // Fin méthode checkForm
} // Fin Classe Formulaire

