class Canvas{
  constructor(){
    this.station = station;
    this.canvas = document.getElementById('signature');
    this.context = this.canvas.getContext('2d');
    this.clickX = new Array();
    this.clickY = new Array();
    this.touchX = new Array();
    this.touchY = new Array();
    this.clickDrag = new Array();
    this.touchDrag = new Array();
    this.touchCheck = 0;
    this.pencilCursor = "url('img/cursors/pencil.png') 32 32, auto";
    this.canvas.style.cursor = this.pencilCursor;
    this.paint;
    this.submitSignature = $('#submitSignature');
    this.clearSignature = $('#clearSignature');
  } // Fin constructor
  init(reservation){
    $('#canvasesContainer').css("display", "block");
    $('#formUtilisateur').css("display", "none");
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = "black";
    this.context.lineJoin = "round";
    this.context.lineWidth = 3;
    let self = this;
    let clientRect = {
      x : self.canvas.getBoundingClientRect().left,
      y : self.canvas.getBoundingClientRect().top
    };
    $('#signature').mousemove(function(e){
      self.mousemove(e)
    });
    $('#signature').mousedown(function(e){
      if(e.which === 1){
        self.mousedown(e)
      }
    });
    $('#signature').mouseup(function(e){
      if(e.which === 1){
        self.mouseup(e)
      }
    });
    $('#signature').mouseleave(function(e){
      self.mouseleave(e)
    });
    $('#clearSignature').mousedown(function(e){
      if(e.which === 1){
        self.clearBoard(self);
      }
    });
    $('#submitSignature').mousedown(function(e){
      if(e.which === 1){
        self.validationSignature(reservation);
      }
    });
    this.canvas.addEventListener("touchstart", function(e){
      self.touchdown(e,self,clientRect)
    }, false);
    this.canvas.addEventListener("touchmove", function(e){
      self.touchmove(e,self,clientRect)
    }, false);
    this.canvas.addEventListener("touchend", function(e){
      self.touchup(e,self,clientRect)
    }, false);
    this.canvas.addEventListener("touchcancel", function(e){
      self.touchcancel(e,self,clientRect)
    }, false);
  } // Fin méthode init
  addClick(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  } // Fin méthode addClick
  redraw(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    for(let i=0; i < this.clickX.length; i++){
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
  touchdown(e,self,clientRect){
    e.preventDefault();
    let touches = e.changedTouches;
    for (let i=0; i<touches.length; i++){
      self.touchDrag.push(touches[i]);
      self.context.fillRect(touches[i].clientX-clientRect.x, touches[i].clientY - clientRect.y, 4, 4);
      self.touchCheck++;
    }
  } // Fin methode touchdown
  touchmove(e,self,clientRect){
    e.preventDefault();
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
  } // Fin methode touchmove
  touchup(e,self,clientRect){
    e.preventDefault();
    let touches = e.changedTouches;
    for (let i=0; i<touches.length; i++){
      let touchIndex = self.findTouchDragIndex(touches[i].identifier, self);
      self.context.beginPath();
      self.context.moveTo(self.touchDrag[i].clientX - clientRect.x, self.touchDrag[i].clientY - clientRect.y);
      self.context.lineTo(touches[i].clientX - clientRect.x, touches[i].clientY - clientRect.y);
      self.touchDrag.splice(i, 1);
    }
  } // Fin methode touchup
  touchcancel(e,self,clientRect){
    e.preventDefault();
    let touches = e.changedTouches;
    for (let i=0; i<touches.length; i++){
      self.touchDrag.splice(i, 1);
    }
  } // Fin methode touchCancel
  findTouchDragIndex(idToFind,self){
    for (let i=0; i<self.touchDrag.length; i++){
      let id = self.touchDrag[i].identifier;
      if (id == idToFind){
        return i;
      }
    }
    return -1;
  } // Fin methode findTouchDragIndex
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
    if(self.touchCheck){
      self.touchCheck = 0;
    }
    $('#canvasesContainer').css("display", "none");
    $('#formUtilisateur').css("display", "block");
  }; // Fin méthode clearBoard
  validationSignature(reservation){
    if(this.clickDrag.length>0 || this.touchCheck>0){
      this.clearBoard(this);
      reservation.sessionConfirm();
    }else{
      reservation.sessionError();
    }
  }; // Fin méthode validationSignature
} // Fin Class canvas


