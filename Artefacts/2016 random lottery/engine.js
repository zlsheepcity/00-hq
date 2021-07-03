var ThisIsRecord = true;

var recordedDropPosition = [];
if (ThisIsRecord) recordedDropPosition = [46,15,41,39,47,60,14,48,30,54,23,37,53,40,57,-35,45,35];

var recordedSteps = [];
if (ThisIsRecord) recordedSteps = [6,6,5,6,5,6,3,3,4,7,8,4,5,3,3,6,8,10,5,4,10,4,7,4,4,5,5,3,6,9,5,7,6,8,5,5,10,6,6,5,7,8,4,7,3,4,7,4,4,4,6,7,5,6,7,4,8,7,8,3,3,7,3,6,4,7,6,7,6,6,5,9,6];

var recordedDecision = [];
if (ThisIsRecord) recordedDecision = [83,8,21,83,32,16,86,31,41,52,45,23,78,15,58,79,29,69,33,64,24,63,77,62,40,62,68,38,54,89,29,20,80,83,1,31,99,26,55,76,86,35,91,1,45,11,57,7,26,48,67,28,68,30,9];



var AW = [];
AW.push({
  title:'IrinaNurgaleyeva',
  img:'IrinaNurgaleyeva'
});
AW.push({
  title:'MargoTretjakova',
  img:'MargoTretjakova'
});
AW.push({
  title:'DaryaGert',
  img:'DaryaGert'
});
AW.push({
  title:'AleksejsFilatovs',
  img:'AleksejsFilatovs'
});
AW.push({
  title:'Regina',
  img:'Regina'
});
AW.push({
  title:'JelenaDebrere',
  img:'JelenaDebrere'
});
AW.push({
  title:'OlgaPashkova',
  img:'OlgaPashkova'
});
AW.push({
  title:'Dana',
  img:'Dana'
});
AW.push({
  title:'NadjaLytchakova',
  img:'NadjaLytchakova'
});
AW.push({
  title:'JanaGrjunberg',
  img:'JanaGrjunberg'
});
AW.push({
  title:'EkaterinaPevneva',
  img:'EkaterinaPevneva'
});
AW.push({
  title:'NataljaSorokina',
  img:'NataljaSorokina'
});
AW.push({
  title:'pasjuk',
  img:'pasjuk'
});
AW.push({
  title:'MarinaRabazova',
  img:'MarinaRabazova'
});
AW.push({
  title:'Lera',
  img:'Lera'
});
AW.push({
  title:'Lilija',
  img:'Lilija'
});

AW.push({
  title:'ElenaBogdanovic',
  img:'ElenaBogdanovic'
});
AW.push({
  title:'AlisaRjascenko',
  img:'AlisaRjascenko'
});




var AWATARAS = $('#awataras');
var aww, $aw, $img, position, posx, poscoord, dir, step, $log;
var timeset;
var step, decision;
var playersIngame = 0;

$(function(){

  if (ThisIsRecord) $('#log').hide();
  
  for ( awa in AW ) { 
    $('#cash').append('<img src="awataras/'+AW[awa].img+'.jpg">');
  }

  $('#Start').on('click', function(){
    startGame();
    $('#Start').hide();
  });
  
});
function startGame() {
  
  // DROP AWATARAS
  dropAwataras();
  setTimeout(function(){ 
      $('.awatar')
        .removeClass('animated bounceInDown')
        .addClass('animated bounce infinite');
  }, 1000);    
  setTimeout(function(){ 
      timeset = setInterval(function(){
        for ( awa in AW ) { 
          if (AW[awa].ingame) {
            AW[awa].pos = AW[awa].pos + AW[awa].dir;
            if ( AW[awa].pos > 59 ) AW[awa].pos = 10;
            if ( AW[awa].pos < 10 ) AW[awa].pos = 59;
            display( AW[awa] );
            AW[awa].step--;
            if  (AW[awa].step == 0) {
              decision = loadDecision(); // Math.random() * 100;
              if ( decision < 30 ) {
                
                AW[awa].ingame = false;
                AW[awa].q.removeClass('animated bounce infinite');
                AW[awa].q.addClass('animated bounceOutUp');
                playersIngame--;     
                console.log(AW[awa].title + ' - out ---------------------------------------');
              } 
              if ( playersIngame == 1) endGame();
              
              step = loadStep(); //Math.round( Math.random() * 7 + 3);
              AW[awa].step = step;
            }
          }
        }
      }, 500);
  }, 2000);    


}



function loadDecision() {
  var answer;
  if (ThisIsRecord) {
    answer = recordedDecision[0];
    recordedDecision.shift();
    console.log('read recordedDecision ' + answer);
  } else {
    answer = Math.round( Math.random() * 100 );
    recordedDecision.push(answer);
    console.log('recorded recordedDecision ' + answer);
    $('#logDecision').html( $('#logDecision').html() + '' + answer + ',' );
  }
  return answer;  
}

function endGame() {
  clearInterval(timeset);
  step = 0;
  for ( awa in AW ) {  
    if (AW[awa].ingame) {
      step = awa;
      $aw = AW[awa].q;
    }
  }
  $aw.addClass('winner');
  console.log(AW[step].title + ' - winner');
}



function loadDropPosition() {
  var answer;
  var di;
  if (ThisIsRecord) {
    //
    answer = recordedDropPosition[0];
    recordedDropPosition.shift();
    console.log('read DropPosition ' + answer);
  } else {
    answer = Math.round( Math.random() * 50 + 10);
    if ( $.inArray(answer, recordedDropPosition) >= 0 ) { 
      console.log(answer, recordedDropPosition,'=got double='); 
      answer = Math.round( Math.random() * 50 + 10); 
      if ( $.inArray(answer, recordedDropPosition) >= 0 ) { 
          console.log(answer, recordedDropPosition,'=got triple='); 
          answer = Math.round( Math.random() * 50 + 10); 
      } 
      di = Math.random() * 100;
      di = ( dir < 50 ? -1 : 1 );
      answer = answer * di;
    }
    recordedDropPosition.push(answer);
    console.log('recorded DropPosition ' + answer);
    $('#logDropPosition').html( $('#logDropPosition').html() + '' + answer + ',' );
  }
  return answer;
}



function loadStep() {
  var answer;
  if (ThisIsRecord) {
    answer = recordedSteps[0];
    recordedSteps.shift();
    console.log('read recordedSteps ' + answer);
  } else {
    answer = Math.round( Math.random() * 7 + 3);
    recordedSteps.push(answer);
    console.log('recorded recordedSteps ' + answer);
    $('#logStepPosition').html( $('#logStepPosition').html() + '' + answer + ',' );
  }
  return answer;  
}

function dropAwataras() {
  for ( awa in AW ) {
    playersIngame++;
    aww = AW[awa];
    if (!ThisIsRecord) aww.img = 'opiata';
    aww.img = 'opiata';
    $img = $('<img src="awataras/'+aww.img+'.jpg">');
    $aw = $('<div class="awatar"></div>');
    position = loadDropPosition();
    dir = ( position < 0 ? -1 : 1 );
    position = Math.abs(position);
    posx = position % 10;
    poscoord = posx * 10;
    step = loadStep(); //Math.round( Math.random() * 7 + 3);
    
    // set
    AW[awa].pos = position;
    AW[awa].dir = dir;
    AW[awa].q = $aw;
    AW[awa].step = step;
    AW[awa].ingame = true;
    
    // display
    $aw
      .append($img)
      .attr('id',aww.title)      
      .addClass('animated bounceInDown');
    $aw.appendTo(AWATARAS);

    
    display(AW[awa]);
  }  
}

function display( item ) {
    var left, street;
    posx = item.pos % 10;
    poscoord = posx * 10;
    street = getStreet(item.pos);
    left = poscoord;
    if (street == 'onStreet1' || street == 'onStreet3' || street == 'onStreet5' ) left = 90-poscoord;
    item.q
      .removeClass('onStreet1 onStreet2 onStreet3 onStreet4 onStreet5')
      .addClass( street )
      .css('left', left+'vw');
}

function getStreet(position) {
  var street;
  if (position<20) street = 'onStreet1';
  else if (position<30) street = 'onStreet2';
  else if (position<40) street = 'onStreet3';
  else if (position<50) street = 'onStreet4';
  else street = 'onStreet5';
  return street;
}