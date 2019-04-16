class Canvas{
  constructor(){
    this.canvas = document.getElementById('signature');
    this.context = this.canvas.getContext('2d');
    this.clickX = new Array();
    this.clickY = new Array();
    this.touchX = new Array();
    this.touchY = new Array();
    this.clickDrag = new Array();
    this.touchDrag = new Array();
    this.touchCheck = 0;
    this.canvas.style.cursor = "url('img/cursors/pencil.png') 32 32, auto";
    this.paint;
    this.submitSignature = $('#submitSignature');
    this.clearSignature = $('#clearSignature');
  } // Fin constructor

  init(reservation){
    // Affiche le canvas et masque le formulaire
    // initialise le style du canvas
    // et les gestionnaires d’événements associés
    $('#canvasesContainer').css("display", "block");
    $('#formUtilisateur').css("display", "none");
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = "black";
    this.context.lineJoin = "round";
    this.context.lineWidth = 3;
    let self = this;
    $('#signature').mousemove((e)=>{self.mousemove(e)});
    $('#signature').mousedown((e)=>{if(e.which === 1){self.mousedown(e)}});
    $('#signature').mouseup((e)=>{if(e.which === 1){self.mouseleave(e)}});
    $('#signature').mouseleave((e)=>{self.mouseleave(e)});
    $('#clearSignature').mousedown((e)=>{if(e.which === 1){self.clearBoard(self);}});
    $('#submitSignature').mousedown((e)=>{if(e.which === 1){self.validationSignature(reservation);}});
    this.canvas.addEventListener("touchstart", (e)=>{self.touchdown(e,self)});
    this.canvas.addEventListener("touchmove", (e)=>{self.touchmove(e,self)});
    this.canvas.addEventListener("touchend", (e)=>{self.touchup(e,self)});
    this.canvas.addEventListener("touchcancel", (e)=>{self.touchup(e,self)});
  } // Fin méthode init

  addClick(x, y, dragging){
    // Stocke la position et le clic de la souris dans les tableaux correspondants
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  } // Fin méthode addClick

  redraw(){
    // Efface et redessine le canvas selon les données stockées dans clickX et clickY
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    for(let i=0; i < this.clickX.length; i++){
      this.context.beginPath();
      if(this.clickDrag[i] && i){
        this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
       }else{
        this.context.moveTo(this.clickX[i]-1, this.clickY[i]-1);
       }
       this.context.lineTo(this.clickX[i], this.clickY[i]);
       this.context.closePath();
       this.context.stroke();
    }
  } // Fin méthode redraw

  mousedown(e){
    // Méthode appelée lors du clic sur le canvas
    // indique que l'on peut dessiner en fixant paint a true
    // envoie la position du curseur au moment du clic a la méthode addClick
    this.paint = true;
    this.addClick(e.offsetX, e.offsetY);
    this.redraw();
  } // Fin méthode mousedown

  mousemove(e){
    // Méthode appelée lors du déplacement de la souris sur le canvas
    if(this.paint){
      this.addClick(e.offsetX, e.offsetY, true);
      this.redraw();
    }
  } // Fin méthode mousemove

  mouseleave(){
    // Méthode appelée a la sortie du canvas et lors du relâchement du clic
    this.paint = false;
  } // Fin méthode mouseleave

  touchdown(e,self){
    // Méthode appelée lors du toucher sur le canvas
    // récupère la position du point de toucher et trace un point de 3px
    e.preventDefault();
    let clientRect = {
      x : self.canvas.getBoundingClientRect().left,
      y : self.canvas.getBoundingClientRect().top
    };
    let touches = e.changedTouches;
    for (let i=0; i<touches.length; i++){
      self.touchDrag.push(touches[i]);
      self.context.fillRect(touches[i].clientX-clientRect.x, touches[i].clientY - clientRect.y, 3, 3);
      self.touchCheck++;
    }
  } // Fin méthode touchdown

  touchmove(e,self){
    // Méthode appelée lorsque le toucher est maintenu et que le doigt se déplace sur le canvas
    // récupère les positions de la souris lors du déplacement du toucher
    // redessine le canvas a chaque déplacement
    e.preventDefault();
    let clientRect = {
      x : self.canvas.getBoundingClientRect().left,
      y : self.canvas.getBoundingClientRect().top
    };
    let touches = e.changedTouches;
    for (let i=0; i<touches.length; i++){
      let touchIndex = self.findTouchDragIndex(touches[i].identifier, self);
      self.context.beginPath();
      self.context.moveTo(self.touchDrag[touchIndex].clientX - clientRect.x, self.touchDrag[touchIndex].clientY - clientRect.y);
      self.context.lineTo(touches[i].clientX - clientRect.x, touches[i].clientY - clientRect.y);
      self.context.closePath();
      self.context.stroke();
      self.touchDrag.splice(touchIndex, 1, touches[i]);
      self.touchCheck++;
    }
  } // Fin méthode touchmove

  touchup(e,self){
    // Méthode appelée lorsque le toucher est relâché
    // retire le dernier point de la liste des touchers
    e.preventDefault();
    let touches = e.changedTouches;
    for (let i=0; i<touches.length; i++){
      self.touchDrag.splice(i, 1);
    }
  } // Fin méthode touchup

  findTouchDragIndex(idToFind,self){
    // analyse le tableau touchDrag contenant la liste des points du toucher en cours,
    // et recherche un toucher correspondant a un identifiant donné
    for (let i=0; i<self.touchDrag.length; i++){
      let id = self.touchDrag[i].identifier;
      if (id == idToFind){
        return i;
      }
    }
    return -1;
  } // Fin méthode findTouchDragIndex

  clearBoard(self){
    // Efface et masque le canvas, pour ré-afficher le formulaire
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
    if(self.touchCheck){
      self.touchCheck = 0;
    }
    $('#canvasesContainer').css("display", "none");
    $('#formUtilisateur').css("display", "block");
  } // Fin méthode clearBoard

  validationSignature(reservation){
    // Vérifie qu'une signature a été saisie a la souris ou au toucher
    if(this.clickDrag.length>0 || this.touchCheck>0){
      this.clearBoard(this);
      reservation.sessionConfirm();
    }else{
      reservation.sessionError();
    }
  } // Fin méthode validationSignature
} // Fin Class canvas



