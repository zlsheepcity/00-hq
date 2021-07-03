// Here is a settings to switch Flotr between SCREEN and PDF views

var clcFlotrSettings = {

  screen: {
    
    font: 'px arial, sans-serif',
    fontSize: 7.5,
    lineWidth: 1
    
  },
  
  pdf: {
    
    font: 'px clcpdf, sans-serif',
    fontSize: 40,
    lineWidth: 8
    
    
  } 

};

// arial for ie7, ie8
if( $.browser.msie  && ( parseInt($.browser.version, 10) === 7 || parseInt($.browser.version, 10) === 8 ) ) {
  clcFlotrSettings['screen'].font = 'px arial, sans-serif';
  clcFlotrSettings['pdf'].font = 'px arial, sans-serif';
}

var clcFlotrView = 'screen'; // default current view

// swithc view
function clcSwitchFlotrView(view)
{
  clcFlotrView = view;
  Flotr.defaultOptions.fontSize = clcFlotrSettings[clcFlotrView].fontSize;
  
  // hide/display div in ie7
  if( $.browser.msie  && parseInt($.browser.version, 10) === 7 ) 
  {
   if( view == 'screen' )     $('#Clc-Charts-for-PDF').hide();
   else                       $('#Clc-Charts-for-PDF').show();
  }  
}
