var sliderTableau = ['slide1','slide2','slide3','slide4'];
var slideActive = 1;
var sliderTimer = setInterval(function(){
    slideActive++;
    tchekClasse();
    afficherSlide(slideActive);
  }, 5000);

function tchekClasse(){
  if(slideActive >= sliderTableau.length+1){
    slideActive = 1;
  }
  if(slideActive < 1){
    slideActive = 4;
  }
}
function afficherSlide(index){
  $(`#slide${index}`).siblings().removeClass('slide-active');
  $(`#slide${index}`).addClass('slide-active');
}
for(let i =0; i<sliderTableau.length; i++){
  $(`#button-slide${i+1}`).on('click', function(){
    $(`#slide${i+1}`).siblings().removeClass('slide-active');
    $(`#slide${i+1}`).addClass('slide-active');
    slideActive = i + 1;
  });
}
$('#arrowRight').on('click', function(){
    slideActive++;
    tchekClasse();
    afficherSlide(slideActive);
});
$('#arrowLeft').on('click', function(){
    slideActive--;
    tchekClasse();
    afficherSlide(slideActive);
});
$('#stopSlider').on('click', function() {
  clearInterval(sliderTimer);
  $('#stopSlider').css('display', 'none');
  $('#playSlider').css('display', 'block');
});
$('#playSlider').on('click', function() {
  sliderTimer = setInterval(function(){
    slideActive++;
    tchekClasse();
    afficherSlide(slideActive);
  }, 5000);
  $('#stopSlider').css('display', 'block');
  $('#playSlider').css('display', 'none');
});

// controle du slider a l'aide des touches directionnelles

function arrowsKeyboard(e) {
  if(e.keyCode===37){
    slideActive--;
    tchekClasse();
    afficherSlide(slideActive);
  }else if(e.keyCode===39){
    slideActive++;
    tchekClasse();
    afficherSlide(slideActive);
  }
}
$(document).on('keydown', arrowsKeyboard)

