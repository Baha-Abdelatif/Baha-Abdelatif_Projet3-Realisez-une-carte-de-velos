let sliderObject = {
  sliderTableau: ['slide1','slide2','slide3','slide4'],
  slideActive: 1,
  sliderTimer: setInterval(function(){
    sliderObject.slideActive++;
    sliderObject.tchekClasse();
    sliderObject.afficherSlide(sliderObject.slideActive);
  }, 5000),
  tchekClasse: function(){
    if(sliderObject.slideActive >= sliderObject.sliderTableau.length+1){
      sliderObject.slideActive = 1;
    }
    if(sliderObject.slideActive < 1){
      sliderObject.slideActive = 4;
    }
  },
  afficherSlide: function(index){
    $(`#slide${index}`).siblings().removeClass('slide-active');
    $(`#slide${index}`).addClass('slide-active');
  },
  arrowsKeyboard: function(e){
    if(e.keyCode===37){
      sliderObject.slideActive--;
      sliderObject.tchekClasse();
      sliderObject.afficherSlide(sliderObject.slideActive);
    }else if(e.keyCode===39){
      sliderObject.slideActive++;
      sliderObject.tchekClasse();
      sliderObject.afficherSlide(sliderObject.slideActive);
    }
  },
  init: function(){
    for(let i =0; i<sliderObject.sliderTableau.length; i++){
      $(`#button-slide${i+1}`).on('click', function(){
        $(`#slide${i+1}`).siblings().removeClass('slide-active');
        $(`#slide${i+1}`).addClass('slide-active');
        sliderObject.slideActive = i + 1;
      });
    }
    $('#arrowRight').on('click', function(){
        sliderObject.slideActive++;
        sliderObject.tchekClasse();
        sliderObject.afficherSlide(sliderObject.slideActive);
    });
    $('#arrowLeft').on('click', function(){
        sliderObject.slideActive--;
        sliderObject.tchekClasse();
        sliderObject.afficherSlide(sliderObject.slideActive);
    });
    $('#stopSlider').on('click', function(){
      clearInterval(sliderObject.sliderTimer);
      $('#stopSlider').css('display', 'none');
      $('#playSlider').css('display', 'block');
    });
    $('#playSlider').on('click', function(){
      sliderObject.sliderTimer = setInterval(function(){
        sliderObject.slideActive++;
        sliderObject.tchekClasse();
        sliderObject.afficherSlide(sliderObject.slideActive);
      }, 5000);
      $('#stopSlider').css('display', 'block');
      $('#playSlider').css('display', 'none');
    });
    $(document).on('keydown', sliderObject.arrowsKeyboard)
  } // Fin Init()
}
