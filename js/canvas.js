class Canvas{
  constructor(){
    this.station = station;
    this.canvas = document.getElementById('signature');
    this.context = this.canvas.getContext('2d');
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.pencilCursor = "url('img/cursors/pencil.png') 32 32, auto";
    this.canvas.style.cursor = this.pencilCursor;
    this.signatureUrl = "";
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
  }
  addClick(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }
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
  }
  mousedown(e){
    this.paint = true;
    this.addClick(e.offsetX, e.offsetY);
    this.redraw();
  }
  mousemove(e){
    if(this.paint){
      this.addClick(e.offsetX, e.offsetY, true);
      this.redraw();
    }
  }
  mouseup(){
    this.paint = false;
  }
  mouseleave(){
    this.paint = false;
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
  };
  validationSignature(reservation){
    if(this.clickDrag.length>0){
      clearInterval(compteur);
      reservation.sessionStorage();
      compteur = setInterval(reservation.countDown,60000);
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
    }else{
      $('#alerteReservation').html("Erreur : Veuillez signer le formulaire pour confirmer la reservation.");
      $('.infosReservation').css('display', 'block');
    }
  };
} // Fin Class canvas







