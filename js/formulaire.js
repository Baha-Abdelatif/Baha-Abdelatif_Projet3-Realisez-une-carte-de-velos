class Formulaire {
  constructor(){
    this.returnedMessage = "Réservation Impossible : </br>";
    this.nomUtilisateur = document.getElementById('nomUtilisateur').value;
    this.prenomUtilisateur = document.getElementById('prenomUtilisateur').value;
  } // Fin constructor
  checkLength(){
    const formRegex = /[\W+\d+]*[^\s\'a-zA-Z+\-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+/m;
    if((this.nomUtilisateur.length < 3) || (this.prenomUtilisateur.length < 3) || (this.nomUtilisateur.length > 21) || (this.prenomUtilisateur.length > 21) || (formRegex.test(this.prenomUtilisateur)) || (formRegex.test(this.nomUtilisateur))){
      if(this.nomUtilisateur.length < 3){
        this.returnedMessage += "Le nom est trop court (3 caracteres min.)<br/>";
      }
      if(this.nomUtilisateur.length > 21){
        this.returnedMessage += "Le nom est trop long (21 caracteres max.)<br/>";
      }
      if(this.prenomUtilisateur.length < 3){
        this.returnedMessage += "Le prénom est trop court (3 caracteres min.)<br/>";
      }
      if(this.prenomUtilisateur.length > 21){
        this.returnedMessage += "Le prénom est trop long (21 caracteres max.)<br/>";
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
  } // Fin methode checkLength
  checkForm(self, reservation, canvas){
    if(this.checkLength()){
      this.returnedMessage = "Formulaire vérifié : Veuillez signer pour confirmer votre réservation.";
      $('#alerteReservation').html(this.returnedMessage);
      $('#alerteReservation').siblings().text("");
      $('#alerteReservation').siblings().css('display', 'none');
      $('#alerteReservation').css('display', 'block');
      $('.infosReservation').css('display', 'block');
      canvas.init(reservation);
    }else{ // fin if verif syntaxe form
      $('#alerteReservation').text("");
      $('#alerteReservation').html(this.returnedMessage);
      $('#alerteReservation').siblings().text("");
      $('#alerteReservation').siblings().css('display', 'none');
      $('#alerteReservation').css('display', 'block');
      $('.infosReservation').css('display', 'block');
    } // fin else if verif syntaxe form
  } // Fin methode checkForm
} // Fin Classe Formulaire
