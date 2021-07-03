var BaCkGrOuNdInTeRvAl;

$(document).ready(function(){

if( console ) console.log('Morggirgng bird!');
//
  
  BaCkGrOuNdInTeRvAl = setInterval(backgroundInterval,200);
  //backgroundInterval();
});

function backgroundInterval()
{
  if( $('body').hasClass('bgr2') )
  {
    $('body').css('background-image','url(pics/noiz1.jpg)');
    $('body').removeClass('bgr2');
    //-webkit-filter: invert(1);
  }
  else
  {
    $('body').css('background-image','url(pics/noiz2.jpg)');
    $('body').addClass('bgr2');
    console.log('ddd');
  }
}