function show_analize_tips(year) {
  var DIV = $('#Clc-Tables-Analize .Clc-insert-tips');
  DIV.empty();
  AnalTipsExport = [];
  if( !year ) return false;
  
  
  // DIV.append('<h3>Aprēķini (' + year + ')</h3>');
  var AA_dom;
  var aa;
  var aVal;
  var caption;
  var answer;
  var answer_i;
  var cenas_piens_array;
  var cenas_piens_videja;
  
  
  
  // PIENA LOPKOPIBA
  if( $('#Clc-checkbox-lopkopiba').is(':checked') ) {
  
    // VIDEJAIS IZSLAUKUMS
    AA_dom = $('#' + 'Clc-ienem_' + 'lopkopiba' + '_' + year + '_' + 'D28');         // a3=d28
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom);
                                        caption= Data_Aprekini.a3.caption; 
    if( aa < 5000 )                     { answer = Data_Aprekini.a3.fields[0].label; answer_i = 'a3c3'; }
    else if ( aa < 7000 )               { answer = Data_Aprekini.a3.fields[1].label; answer_i = 'a3c4'; }
    else if ( aa < 10000 )              { answer = Data_Aprekini.a3.fields[2].label; answer_i = 'a3c5'; }
    else                                { answer = Data_Aprekini.a3.fields[3].label; answer_i = 'a3c6'; }
    
    $('#Clc-Chart-Izlaukims-Tips').empty().append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');
    $('#Clc-Chart-Izlaukims').attr("rel",'a3_'+aVal+'_'+answer_i);
    
    
    // PIENA PASPATERINS
    AA_dom = $('#' + 'Clc-ienem_' + 'lopkopiba' + '_' + year + '_' + 'D29');         // a7=d29
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom); 
                                        caption= Data_Aprekini.a7.caption;
    if( aa >= 10 )                      { answer = Data_Aprekini.a7.fields[0].label; answer_i = 'a7c7'; }
    else if ( aa >= 2.5 )               { answer = Data_Aprekini.a7.fields[1].label; answer_i = 'a7c8'; }
    else                                { answer = Data_Aprekini.a7.fields[2].label; answer_i = 'a7c9'; }
    
    $('#Clc-Chart-Paspaterins-Tips').empty().append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');
    $('#Clc-Chart-Paspaterins').attr("rel",'a7_'+aVal+'_'+answer_i);
    
    // VIDEJA PIENA CENA
    cenas_piens_array = eval("Data_Cenas_Piens.year" +year);
    cenas_piens_videja = 0;
    for (var t1 in cenas_piens_array) cenas_piens_videja += cenas_piens_array[t1].cena;
    cenas_piens_videja = ( cenas_piens_videja / cenas_piens_array.length ).toFixed(3);
    AA_dom = $('#' + 'Clc-ienem_' + 'lopkopiba' + '_' + year + '_' + 'D30');         // a10=d30
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom); 
                                           caption= Data_Aprekini.a10.caption;
    if( aa < cenas_piens_videja - 0.01 )  { answer = Data_Aprekini.a10.fields[0].label; answer_i = 'a10c10'; }
    else if ( aa >= cenas_piens_videja - 0.01 && aa < cenas_piens_videja + 0.01 )   
                                          { answer = Data_Aprekini.a10.fields[1].label; answer_i = 'a10c11'; }
    else                                  { answer = Data_Aprekini.a10.fields[2].label; answer_i = 'a10c12'; }    

    $('#Clc-Chart-Piens-Tips').empty().append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');
    $('#Clc-Chart-Piens').attr("rel",'a10_'+aVal+'_'+answer_i);

    
  }
  
    // PAMATDARBIBAS PELNA
    AA_dom = $('#' + 'Clc-rentab_' + 'pelna' + '_' + year + '_' + 'D66');         // a13=d66
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom); 
                                     caption= Data_Aprekini.a13.caption;
    if( aa <= 0 )                    { answer = Data_Aprekini.a13.fields[0].label; answer_i = 'a13c13'; }
    else if ( aa > 0 )               { answer = Data_Aprekini.a13.fields[1].label; answer_i = 'a13c14'; }
    else                             answer = false;
    if(answer) {
      $('#Clc-Chart-EBITDA1-Tips').empty().append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');
      $('#Clc-Chart-EBITDA1').attr("rel",'a13_'+aVal+'_'+answer_i);
    }

    
    $('#Clc-Chart-Plusma-Tips').empty();
    
    // NAUDAS PLUSMA
    AA_dom = $('#' + 'Clc-rentab_' + 'plusma' + '_' + year + '_' + 'D75');         // a19=d75
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom); 
                                     caption= Data_Aprekini.a19.caption;
    if( aa <= 0 )                    { answer = Data_Aprekini.a19.fields[0].label; answer_i = 'a19c19'; }
    else if ( aa > 0 )               { answer = Data_Aprekini.a19.fields[1].label; answer_i = 'a19c20'; }
    else                             answer = false;    
    if(answer) {
      $('#Clc-Chart-Plusma-Tips').append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');
      $('#Clc-Chart-Plusma').attr("rel",'a19_'+aVal+'_'+answer_i);
    }       
    
    // Subsīdiju apjoms
    AA_dom = $('#' + 'Clc-rentab_plusma_' + year + '_' + 'D76');         // a16=d76
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom); 
                                     caption= Data_Aprekini.a16.caption;
    if( aa > 50 )                    { answer = Data_Aprekini.a16.fields[0].label; answer_i = 'a16c16'; }
    else                             { answer = Data_Aprekini.a16.fields[1].label; answer_i = 'a16c17'; }
    if(answer) {
      $('#Clc-Chart-Plusma-Tips').append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');
      if( $('#Clc-Chart-Plusma').attr("rel").length > 0 ) answer_i = $('#Clc-Chart-Plusma').attr("rel") + '|' + 'a16_'+aVal+'_' + answer_i;
      $('#Clc-Chart-Plusma').attr("rel",answer_i);
    }    

    
    // DSCR PEC SUBSIDIJAS DIVIDENTIEM
    AA_dom = $('#' + 'Clc-anal_' + 'anal1' + '_' + year + '_' + 'D102');         // a21=d102
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom);
                                     caption= Data_Aprekini.a21.caption;
    if( aa < 1 )                     { answer = Data_Aprekini.a21.fields[0].label; answer_i = 'a21c21'; }
    else if ( aa >= 1 && aa < 1.5 )  { answer = Data_Aprekini.a21.fields[1].label; answer_i = 'a21c22'; }
    else if ( aa >= 1.5 && aa < 2 )  { answer = Data_Aprekini.a21.fields[2].label; answer_i = 'a21c23'; }
    else                             { answer = Data_Aprekini.a21.fields[3].label; answer_i = 'a21c24'; }
    if(answer) {
      $('#Clc-Chart-DSCR2-Tips').empty().append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');
      $('#Clc-Chart-DSCR2').attr("rel",'a21_'+aVal+'_'+answer_i);
    }
    
    // DEBT/FCF
    AA_dom = $('#' + 'Clc-anal_' + 'anal1' + '_' + year + '_' + 'D104');         // a25=d104
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom); 
                                     caption= Data_Aprekini.a25.caption;
    if( aa < 2 )                     { answer = Data_Aprekini.a25.fields[0].label; answer_i = 'a25c25'; }
    else if ( aa >= 2 && aa < 4 )    { answer = Data_Aprekini.a25.fields[1].label; answer_i = 'a25c26'; }
    else                             { answer = Data_Aprekini.a25.fields[2].label; answer_i = 'a25c27'; }
    if(answer) {
      answer = answer.replace("%%%", aVal);
      $('#Clc-Chart-DeptEBITDA2-Tips').empty().append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');  
      $('#Clc-Chart-DeptEBITDA2').attr("rel",'a25_'+aVal+'_'+answer_i);      
    }
    
    // Peļņa kopā (EBITDA)
    AA_dom = $('#Clc-rentab_plusma_' + year + '_' + 'D75');         // a50=d75
    aVal = AA_dom.val(); if ( !aVal ) aVal = 0;
    aa = clcDatiByDom(AA_dom); 
    caption= Data_Aprekini.a50.caption;
    answer = Data_Aprekini.a50.fields[0].label; answer_i = 'a50c50';
    if(answer) {
      answer = answer.replace("%%%", aVal);
      $('#Clc-Chart-EBITDA2-Tips').empty().append('<h4>' + caption + ': <span>' + aVal + '</span></h4><p>' + answer + '</p>');  
      $('#Clc-Chart-EBITDA2').attr("rel",'a50_'+aVal+'_'+answer_i);    
    }    

    
}

function set_analize_input(year) {
  var input_prefix = 'Clc-anal_anal1_' + year + '_';
  var fieldName;
  var fields = new Object();

  for (var t in Data_Analize.fields) {
    fieldName = Data_Analize.fields[t].field;
    fields[fieldName] = $('#' + input_prefix + fieldName);
  }
  
  $('#' + input_prefix + 'D101').change(function(){
    //
  });  
  $('#' + input_prefix + 'D102').change(function(){
    //
  });  
  $('#' + input_prefix + 'D103').change(function(){
    //
  });  
  $('#' + input_prefix + 'D104').change(function(){
    //
  });  

}

function set_analize_D101(year) {
  
  var d66 = clcDati('D66', year); //parseFloat( $('#Clc-rentab_pelna_' + year + '_D66').val() ); if ( isNaN(d66) ) d66 = 0;
  var d88 = clcDati('D88', year); //parseFloat( $('#Clc-invest_inv1_' + year + '_D88').val() ); if ( isNaN(d88) ) d88 = 0;
  var d91 = clcDati('D91', year); //parseFloat( $('#Clc-invest_inv1_' + year + '_D91').val() ); if ( isNaN(d91) ) d91 = 0;
  var d101 = 0; if ( d88 + d91 != 0 ) d101 = d66 / ( d88 + d91);
  
  //clcDispByDom($('#Clc-invest_inv1_' + year + '_D88'), d88); //$('#Clc-invest_inv1_' + year + '_D88').val(d88);   
  //clcDispByDom($('#Clc-invest_inv1_' + year + '_D91'), d91); //$('#Clc-invest_inv1_' + year + '_D91').val(d91);
  clcDispByDom($('#Clc-anal_anal1_' + year + '_D101'), d101, true); 
  //$('#Clc-anal_anal1_' + year + '_D101').val(d101.toFixed(3)).change();  
}
function set_analize_D102(year) {
  
  var d75 = clcDati('D75', year); //parseFloat( $('#Clc-rentab_plusma_' + year + '_D75').val() ); if ( isNaN(d75) ) d75 = 0;
  var d88 = clcDati('D88', year); //parseFloat( $('#Clc-invest_inv1_' + year + '_D88').val() ); if ( isNaN(d88) ) d88 = 0;
  var d91 = clcDati('D91', year); //parseFloat( $('#Clc-invest_inv1_' + year + '_D91').val() ); if ( isNaN(d91) ) d91 = 0;
  var d102 = 0; if ( d88 + d91 != 0 ) d102 = d75 / ( d88 + d91);
  
  clcDispByDom($('#Clc-anal_anal1_' + year + '_D102'), d102, true);
  //$('#Clc-invest_inv1_' + year + '_D88').val(d88);   
  //$('#Clc-invest_inv1_' + year + '_D91').val(d91);
  //$('#Clc-anal_anal1_' + year + '_D102').val(d102.toFixed(3)).change();  
}
function set_analize_D103(year) {
  
  var d66 = clcDati('D66', year); //parseFloat( $('#Clc-rentab_pelna_' + year + '_D66').val() ); if ( isNaN(d66) ) d66 = 0;
  var d89 = clcDati('D89', year); //parseFloat( $('#Clc-invest_inv1_' + year + '_D89').val() ); if ( isNaN(d89) ) d89 = 0;
  var d103 = 0; if ( d66 != 0 ) d103 = d89 / d66;
  
  clcDispByDom($('#Clc-anal_anal1_' + year + '_D103'), d103, true);
  //$('#Clc-invest_inv1_' + year + '_D89').val(d89);   
  //$('#Clc-anal_anal1_' + year + '_D103').val(d103.toFixed(3)).change();  
}
function set_analize_D104(year) {
  
  var d75 = clcDati('D75', year); //parseFloat( $('#Clc-rentab_plusma_' + year + '_D75').val() ); if ( isNaN(d75) ) d75 = 0;
  var d89 = clcDati('D89', year); //parseFloat( $('#Clc-invest_inv1_' + year + '_D89').val() ); if ( isNaN(d89) ) d89 = 0;
  var d104 = 0; if ( d75 != 0 ) d104 = d89 / d75;
  
  clcDispByDom($('#Clc-anal_anal1_' + year + '_D104'), d104, true);
  //$('#Clc-invest_inv1_' + year + '_D89').val(d89);   
  //$('#Clc-anal_anal1_' + year + '_D104').val(d104.toFixed(3)).change();  
}