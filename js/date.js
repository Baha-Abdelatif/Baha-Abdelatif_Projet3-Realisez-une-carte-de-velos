let timeObjects = {
     compteur : "",
     dateFr: function(){
          // les noms de jours / mois
          let jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
          let mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
          // on recupere la date
          let date = new Date();
          // on construit le message
          let message = jours[date.getDay()] + " ";   // nom du jour
          message += date.getDate() + " ";   // numero du jour
          message += mois[date.getMonth()] + " ";   // mois
          message += date.getFullYear();
          return message;
     },
     ajouterZero: function(chiffre){
          if(chiffre<10){
               chiffre = '0'+chiffre;
          }
          return chiffre;
     },
     heure: function (){
          let date = new Date();
          let heure = date.getHours();
          let minutes = date.getMinutes();
          let secondes = date.getSeconds();
          return timeObjects.ajouterZero(heure) + ":" + timeObjects.ajouterZero(minutes) + ":" + timeObjects.ajouterZero(secondes);
     },
     afficherHeure: function(){
          return timeObjects.dateFr() + ' ' + timeObjects.heure();
     },
     countDown: function(){
         if(sessionStorage.heureReservation){
          if(sessionStorage.countDownReservationMin > 0 || sessionStorage.countDownReservationSec > 0){
               if(sessionStorage.countDownReservationSec >= 0){
                  sessionStorage.countDownReservationSec--;
               }
               if(sessionStorage.countDownReservationSec < 0){
                   sessionStorage.countDownReservationSec = 59;
                   sessionStorage.countDownReservationMin--;
               }
             $('#countDownSec').text(timeObjects.ajouterZero(sessionStorage.countDownReservationSec));
             $('#countDownMin').text(timeObjects.ajouterZero(sessionStorage.countDownReservationMin));
          }else{
             sessionStorage.clear();
             $('#alerteReservation').text("Votre reservation est expirée veuillez la renouveler.");
             $('#alerteReservation').siblings().text("");
             $('#alerteReservation').siblings().css('display', 'none');
           }
         }
       } // Fin methode countDown
};





