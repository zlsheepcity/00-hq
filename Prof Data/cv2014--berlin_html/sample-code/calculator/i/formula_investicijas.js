function set_investicijas_input(year) {
  var input_prefix = 'Clc-invest_inv1_' + year + '_';
  var fieldName;
  var fields = new Object();
  for (var t in Data_Investicijas[0].fields) {
    fieldName = Data_Investicijas[0].fields[t].field;
    fields[fieldName] = $('#' + input_prefix + fieldName);
  }
  
  $('#' + input_prefix + 'D81').change(function(){
    set_investicijas_D83(fields);
  });  
  $('#' + input_prefix + 'D82').change(function(){
    set_investicijas_D83(fields);
  });  
  $('#' + input_prefix + 'D83').change(function(){
    set_investicijas_D95(year);
  });  
  $('#' + input_prefix + 'D84').change(function(){
    set_investicijas_D95(year);
    showHide_informTip('D84');
  });  
  $('#' + input_prefix + 'D86').change(function(){
    set_investicijas_D89(fields);
  });  
  $('#' + input_prefix + 'D87').change(function(){
    set_investicijas_D89(fields);
    set_investicijas_D95(year);
  });  
  $('#' + input_prefix + 'D88').change(function(){
    set_investicijas_D89(fields);
    set_investicijas_D95(year);    
    set_analize_D101(year);
    set_analize_D102(year);
  });  
  $('#' + input_prefix + 'D89').change(function(){
    kreditsaistibasChanged(year);
    set_analize_D103(year);
    set_analize_D104(year);
  });  
  $('#' + input_prefix + 'D91').change(function(){
    set_investicijas_D95(year);
    set_analize_D101(year);
    set_analize_D102(year);
  });  
  $('#' + input_prefix + 'D93').change(function(){
    set_investicijas_D95(year);
  });  
  $('#' + input_prefix + 'D95').change(function(){
    set_investicijas_D97(fields);
  });  
  $('#' + input_prefix + 'D96').change(function(){
    set_investicijas_D97(fields);
  }); 
  $('#' + input_prefix + 'D97').change(function(){
    naudasAtlikums(year);
  });   
  
}

function naudasAtlikums(year) {
  if( $.inArray(year, collumn_years) == -1 || $.inArray(year, collumn_years) >= collumn_years.length - 1 ) return false;
  var onEnd = $('#Clc-invest_inv1_' + year + '_' + 'D97');
  year++;
  var onStart = $('#Clc-invest_inv1_' + year + '_' + 'D96');
  clcDispByDom(onStart, clcDatiByDom(onEnd), true);
  //onStart.val( onEnd.val() ).change();  
}

function kreditsaistibasChanged(year) {
  if( $.inArray(year, collumn_years) == -1 || $.inArray(year, collumn_years) >= collumn_years.length - 1 ) return false;
  var onEnd = $('#Clc-invest_inv1_' + year + '_' + 'D89');
  year++;
  var onStart = $('#Clc-invest_inv1_' + year + '_' + 'D86');
  clcDispByDom(onStart, clcDatiByDom(onEnd), true);
  //onStart.val( onEnd.val() ).change();
}

function set_investicijas_D83(fields) {
  var d81 = clcDatiByDom(fields['D81']); //parseFloat( fields['D81'].val() ); if ( isNaN(d81) ) d81 = 0;
  var d82 = clcDatiByDom(fields['D82']); //parseFloat( fields['D82'].val() ); if ( isNaN(d82) ) d82 = 0;
  var d83 = d81 - d82;
  
  clcDispByDom(fields['D81'], d81); //fields['D81'].val(d81);   
  clcDispByDom(fields['D82'], d82); //fields['D82'].val(d82);
  clcDispByDom(fields['D83'], d83, true); //fields['D83'].val(d83).change();  
}


function set_investicijas_D89(fields) {
  var d86 = clcDatiByDom(fields['D86']); //parseFloat( fields['D86'].val() ); if ( isNaN(d86) ) d86 = 0;
  var d87 = clcDatiByDom(fields['D87']); //parseFloat( fields['D87'].val() ); if ( isNaN(d87) ) d87 = 0;
  var d88 = clcDatiByDom(fields['D88']); //parseFloat( fields['D88'].val() ); if ( isNaN(d88) ) d88 = 0;
  var d89 = d86 + d87 - d88;
  
  clcDispByDom(fields['D86'], d86); //fields['D86'].val(d86);   
  clcDispByDom(fields['D87'], d87); //fields['D87'].val(d87);
  clcDispByDom(fields['D88'], d88); //fields['D88'].val(d88);
  clcDispByDom(fields['D89'], d89, true); //fields['D89'].val(d89).change();
}

function set_investicijas_D95(year) {
  var d75 = clcDati('D75', year); //parseFloat( $('#Clc-rentab_plusma_' + year + '_' + 'D75').val() ); if ( isNaN(d75) ) d75 = 0;
  var d83 = clcDati('D83', year); //parseFloat( $('#' + 'Clc-invest_inv1_' + year + '_' + 'D83').val() ); if ( isNaN(d83) ) d83 = 0;
  var d84 = clcDati('D84', year); //parseFloat( $('#' + 'Clc-invest_inv1_' + year + '_' + 'D84').val() ); if ( isNaN(d84) ) d84 = 0;
  var d87 = clcDati('D87', year); //parseFloat( $('#' + 'Clc-invest_inv1_' + year + '_' + 'D87').val() ); if ( isNaN(d87) ) d87 = 0;
  var d88 = clcDati('D88', year); //parseFloat( $('#' + 'Clc-invest_inv1_' + year + '_' + 'D88').val() ); if ( isNaN(d88) ) d88 = 0;
  var d91 = clcDati('D91', year); //parseFloat( $('#' + 'Clc-invest_inv1_' + year + '_' + 'D91').val() ); if ( isNaN(d91) ) d91 = 0;
  var d93 = clcDati('D93', year); //parseFloat( $('#' + 'Clc-invest_inv1_' + year + '_' + 'D93').val() ); if ( isNaN(d93) ) d93 = 0;  
  var d95 = d75 - d83 + d84 + d87 - d88 - d91 + d93;
  
  clcDispByDom($('#' + 'Clc-invest_inv1_' + year + '_' + 'D84'), d84); //$('#' + 'Clc-invest_inv1_' + year + '_' + 'D84').val(d84);   
  clcDispByDom($('#' + 'Clc-invest_inv1_' + year + '_' + 'D87'), d87); //$('#' + 'Clc-invest_inv1_' + year + '_' + 'D87').val(d87);
  clcDispByDom($('#' + 'Clc-invest_inv1_' + year + '_' + 'D88'), d88); //$('#' + 'Clc-invest_inv1_' + year + '_' + 'D88').val(d88);
  clcDispByDom($('#' + 'Clc-invest_inv1_' + year + '_' + 'D91'), d91); //$('#' + 'Clc-invest_inv1_' + year + '_' + 'D91').val(d91);   
  clcDispByDom($('#' + 'Clc-invest_inv1_' + year + '_' + 'D93'), d93); //$('#' + 'Clc-invest_inv1_' + year + '_' + 'D93').val(d93);
  clcDispByDom($('#' + 'Clc-invest_inv1_' + year + '_' + 'D95'), d95, true); //$('#' + 'Clc-invest_inv1_' + year + '_' + 'D95').val(d95).change();  
}

function set_investicijas_D97(fields) {
  var d95 = clcDatiByDom(fields['D95']); //parseFloat( fields['D95'].val() ); if ( isNaN(d95) ) d95 = 0;
  var d96 = clcDatiByDom(fields['D96']); //parseFloat( fields['D96'].val() ); if ( isNaN(d96) ) d96 = 0;
  var d97 = d95 + d96;
  
  clcDispByDom(fields['D96'], d96); //fields['D96'].val(d96);
  clcDispByDom(fields['D97'], d97, true); //fields['D97'].val(d97).change();  
}