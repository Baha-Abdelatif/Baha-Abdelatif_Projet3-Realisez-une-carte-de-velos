class Canvas{
  constructor(){
    this.station = station;
    this.canvas = document.getElementById('signature');
    this.context = this.canvas.getContext('2d');
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.clientRectX = this.canvas.getBoundingClientRect().x;
    this.clientRectY = this.canvas.getBoundingClientRect().y;
    this.touchDrag = new Array();
    this.pencilCursor = "url('img/cursors/pencil.png') 32 32, auto";
    this.canvas.style.cursor = this.pencilCursor;
    this.paint;
    this.submitSignature = $('#submitSignature');
    this.clearSignature = $('#clearSignature');
  } // Fin constructor
  init(reservation){
    $('#canvasesContainer').css("display", "block");
    $('#formUtilisateur').css("display", "none");
    var self = this;
    $('#signature').mousemove(function(e){
      self.mousemove(e)
    });
    $('#signature').mousedown(function(e){
      self.mousedown(e)
    });
    $('#signature').mouseup(function(e){
      self.mouseup(e)
    });
    $('#signature').mouseleave(function(e){
      self.mouseleave(e)
    });
    $('#clearSignature').mousedown(function(){
      self.clearBoard(self);
    });
    $('#submitSignature').mousedown(function(){
      self.validationSignature(reservation);
    });
    this.canvas.addEventListener("touchstart", function(e){
      self.touchStart(e,self)
    }, false);
  } // Fin méthode init
  addClick(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  } // Fin méthode addClick
  redraw(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.strokeStyle = "black";
    this.context.lineJoin = "round";
    this.context.lineWidth = 3;
    for(var i=0; i < this.clickX.length; i++) {
      this.context.beginPath();
      if(this.clickDrag[i] && i){
        this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
       }else{
         this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
       }
       this.context.lineTo(this.clickX[i], this.clickY[i]);
       this.context.closePath();
       this.context.stroke();
    }
  } // Fin méthode redraw
  mousedown(e){
    this.paint = true;
    this.addClick(e.offsetX, e.offsetY);
    this.redraw();
  } // Fin méthode mousedown
  mousemove(e){
    if(this.paint){
      this.addClick(e.offsetX, e.offsetY, true);
      this.redraw();
    }
  } // Fin méthode mousemove
  mouseup(){
    this.paint = false;
  } // Fin méthode mouseup
  mouseleave(){
    this.paint = false;
  } // Fin méthode mouseleave

  touchStart(e,self) {
    infosSouris
    e.preventDefault();
    var touches = e.changedTouches;
    for (var i=0; i<touches.length; i++) {
      self.touchDrag.push(touches[i]);
      self.context.fillRect(touches[i].clientX+self.clientRectX, touches[i].clientY+self.clientRectY, 4, 4);
      console.log(touches[i].clientX+self.clientRectX, touches[i].clientY+self.clientRectY);
    }
  }

  clearBoard(self){
    self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
    if(self.clickX){
      self.clickX.splice(0, self.clickX.length);
    }
    if(self.clickY){
      self.clickY.splice(0, self.clickY.length);
    }
    if(self.clickDrag){
      self.clickDrag.splice(0, self.clickDrag.length);
    }
    if(self.paint){
      self.paint = false;
    }
    $('#canvasesContainer').css("display", "none");
    $('#formUtilisateur').css("display", "block");
  }; // Fin méthode clearBoard
  validationSignature(reservation){
    if(this.clickDrag.length>0){
      clearInterval(timeObjects.compteur);
      reservation.sessionStorage();
      timeObjects.compteur = setInterval(timeObjects.countDown,60000);
      this.clearBoard(this);
      $('#canvasesContainer').css("display", "none");
      $('#formUtilisateur').css("display", "block");
      $('#alerteReservation').html("Confirmation : Votre reservation a été enregistrée.");
      $('#nomReservation').html(`Réservation faite au nom de ${sessionStorage.nomReservation} ${sessionStorage.prenomReservation}.`);
      $('#dateReservation').html(`Le ${sessionStorage.heureReservation}`);
      $('#countDownReservation').html(`Temps restant : <span id="countDown">${sessionStorage.countDownReservation}</span> minutes.`);
      $('#idStationReservation').html(`Nom de la station : ${sessionStorage.nameStationReservation}.`);
      $('#adresseStationReservation').html(`Adresse : ${sessionStorage.addressStationReservation}`);
      $('.infosReservation').css('display', 'block');
      $('#stationAvailableStands').text(`${reservation.station.available_bike_stands+1}/${reservation.station.bike_stands} place(s) disponible(s).`);
      $('#stationAvailableBikes').text(`${reservation.station.available_bikes-1} vélo(s) disponible(s).`);
      $('.stationsToulouse').removeClass('hidden');
      $('#availableStands').css('width', `${(((reservation.station.available_bike_stands+1) * 100)/reservation.station.bike_stands)*2-2}px`);
      $('#availableBikes').css('width', `${(((reservation.station.available_bikes-1) * 100)/reservation.station.bike_stands)*2-2}px`);
    }else{
      $('#alerteReservation').html("Erreur : Veuillez signer le formulaire pour confirmer la reservation.");
      $('.infosReservation').css('display', 'block');
    }
  }; // Fin méthode validationSignature
} // Fin Class canvas


