let timeObjects = {
     compteur : "",
     dateFr(){
          // Retourne une date au format "Dimanche 01 Janvier 2020"
          // les noms de jours / mois
          let jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
          let mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
          let date = new Date();
          let message = `${jours[date.getDay()]} `;
          message += `${timeObjects.ajouterZero(date.getDate())} `;
          message += `${mois[date.getMonth()]} `;
          message += date.getFullYear();
          return message;
     }, // Fin méthode dateFr

     ajouterZero(chiffre){
          // Ajoute un zéro avant un chiffre s'il est inférieur a 10
          if(chiffre<10){
               chiffre = '0'+chiffre;
          }
          return chiffre;
     }, // Fin méthode ajouterZero

     heure(){
          // Retourne une heure au format "hh:mm:ss"
          let date = new Date();
          let heure = date.getHours();
          let minutes = date.getMinutes();
          let secondes = date.getSeconds();
          return `${timeObjects.ajouterZero(heure)}:${timeObjects.ajouterZero(minutes)}:${timeObjects.ajouterZero(secondes)}`;
     }, // Fin méthode heure

     afficherHeure(){
          // Retourne la date et l'heure
          return timeObjects.dateFr() + ' ' + timeObjects.heure();
     }, // Fin méthode afficherHeure

     countDown(){
        // Compte a rebours réservation
        let instantT = Date.now(); // timestamp lors de l'appel a la fonction
        let expirationDate = parseInt(sessionStorage.timestampReservation) + 1200000; // timestamp lors de la confirmation de la réservation + 1200000 millisecondes (20mn)
        let tempsRestant = (expirationDate-instantT);
        let min = Math.floor(tempsRestant/60000);
        let sec = Math.floor((tempsRestant - (min*60000))/1000);
        if(min > 0 || sec > 0){
          $('#countDownSec').text(timeObjects.ajouterZero(sec));
          $('#countDownMin').text(timeObjects.ajouterZero(min));
          sessionStorage.setItem('countDownReservationMin', timeObjects.ajouterZero(min));
          sessionStorage.setItem('countDownReservationSec', timeObjects.ajouterZero(sec));
        }else{
          sessionStorage.clear();
          clearInterval(timeObjects.compteur);
          $('#alerteReservation').text("Votre réservation est expirée veuillez la renouveler.");
          $('#alerteReservation').siblings().text("");
          $('#alerteReservation').siblings().css('display', 'none');
        }
     } // Fin méthode countDown
};





