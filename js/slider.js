let sliderObject = {
  sliderTableau: ['slide1','slide2','slide3','slide4'],
  slideActive: 1,
  sliderTimer: setInterval(()=>{
    sliderObject.nextSlide();
  }, 5000),

  init(){
    for(let i =0; i<sliderObject.sliderTableau.length; i++){
      $(`#button-slide${i+1}`).on('click', ()=>{
        sliderObject.slideActive = i + 1;
        sliderObject.checkInterval()
        sliderObject.afficherSlide(sliderObject.slideActive);
      });
    }
    $('#arrowRight').on('click', ()=>{
        sliderObject.nextSlide();
    });
    $('#arrowLeft').on('click', ()=>{
        sliderObject.previousSlide();
    });
    $('#stopSlider').on('click', ()=>{
      clearInterval(sliderObject.sliderTimer);
      $('#stopSlider').css('display', 'none');
      $('#playSlider').css('display', 'block');
    });
    $('#playSlider').on('click', ()=>{
      sliderObject.sliderTimer = setInterval(()=>{
        sliderObject.nextSlide();
      }, 5000);
      $('#stopSlider').css('display', 'block');
      $('#playSlider').css('display', 'none');
    });
    $(document).on('keydown', sliderObject.arrowsKeyboard)
  }, // Fin Init()

  previousSlide(){
    // Méthode chargée de passer a la slide suivante
    sliderObject.slideActive--;
    sliderObject.checkInterval();
    sliderObject.afficherSlide(sliderObject.slideActive);
  }, // Fin Méthode previousSlide

  nextSlide(){
    // Méthode chargée de passer a la slide précédente
    sliderObject.slideActive++;
    sliderObject.checkInterval();
    sliderObject.afficherSlide(sliderObject.slideActive);
  }, // Fin Méthode nextSlide

  checkInterval(){
    // Méthode vérifiant que la variable slideActive est dans l’intervalle
    if(sliderObject.slideActive >= sliderObject.sliderTableau.length+1){
      sliderObject.slideActive = 1;
    }
    if(sliderObject.slideActive < 1){
      sliderObject.slideActive = sliderObject.sliderTableau.length;
    }
  }, // Fin Méthode checkInterval

  afficherSlide(index){
    // Méthode chargée d'afficher et masquer les slides
    $(`#slide${index}`).siblings().removeClass('slide-active');
    $(`#slide${index}`).addClass('slide-active');
    $(`#button-slide${index}`).siblings().removeClass('button-active');
    $(`#button-slide${index}`).addClass('button-active');
  }, // Fin Méthode afficherSlide

  arrowsKeyboard(e){
    // Méthode de contrôle du slider aux flèches du clavier
    if(e.keyCode===37){ // flèche gauche
      sliderObject.previousSlide();
    }else if(e.keyCode===39){ // flèche droite
      sliderObject.nextSlide();
    }
  } // Fin Méthode arrowsKeyboard
}
