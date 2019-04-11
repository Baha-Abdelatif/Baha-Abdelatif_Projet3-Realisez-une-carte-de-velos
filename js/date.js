let timeObjects = {
     compteur : "",
     dateFr: function(){
          // les noms de jours / mois
          var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
          var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
          // on recupere la date
          var date = new Date();
          // on construit le message
          var message = jours[date.getDay()] + " ";   // nom du jour
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
          var date = new Date();
          var heure = date.getHours();
          var minutes = date.getMinutes();
          var secondes = date.getSeconds();
          return timeObjects.ajouterZero(heure) + ":" + timeObjects.ajouterZero(minutes) + ":" + timeObjects.ajouterZero(secondes);
     },
     afficherHeure: function(){
          return timeObjects.dateFr() + ' ' + timeObjects.heure();
     },
     countDown: function(){
         if(sessionStorage.heureReservation){
           if(sessionStorage.countDownReservation >= 0){
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
};





