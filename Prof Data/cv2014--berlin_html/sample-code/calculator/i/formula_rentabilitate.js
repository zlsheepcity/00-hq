function set_rentabilitate_input(nozare, year) {
  var input_prefix = 'Clc-rentab_' + nozare.id + '_' + year + '_';
  if ( nozare.id == 'pelna' ) {
    $('#' + input_prefix + 'D66').change(function(){
      set_rentabilitate_D75(year);
      set_analize_D101(year);
      set_analize_D103(year);
    });
  } else if ( nozare.id == 'subsidijas' ) {
    
    var fields = new Object();
    for (var t in nozare.fields) {
      fields[nozare.fields[t].field] = $('#' + input_prefix + nozare.fields[t].field);
    }    
    
    for (var t in nozare.fields) {
      if( nozare.fields[t].field == 'D72' ) {
        $('#' + input_prefix + nozare.fields[t].field).change(function(){
          set_rentabilitate_D75(year);
        });              
      } else { 
        $('#' + input_prefix + nozare.fields[t].field).change(function(){
          set_rentabilitate_D72(fields);
        });
      }
    }
  } else if ( nozare.id == 'plusma' ) {
    $('#' + input_prefix + 'D74').change(function(){
      set_rentabilitate_D75(year);
      $( '#Clc-Tables-Rentabilitate-Block-plusma_informTip_D74' ).hide(); //showHide_informTip('D74'); // removed du new rules
    });
    $('#' + input_prefix + 'D75').change(function(){
      set_rentabilitate_D76(year);
      set_investicijas_D95(year);
      set_analize_D102(year);
      set_analize_D104(year);
    });
    $('#' + input_prefix + 'D76').change(function(){
      $(this).val( $(this).val() + '%' );       
    });    
  }
}

function set_rentabilitate_D66(year) {
  var d39 = clcDatiByDom( $('#Clc-ienem_total_' + year + '_TOTAL') ); //$('#Clc-ienem_total_' + year + '_TOTAL').val();
  var d60 = clcDatiByDom( $('#Clc-izdev_total_' + year + '_TOTAL') ); //$('#Clc-izdev_total_' + year + '_TOTAL').val();
  var d66 = d39 - d60;

  clcDispByDom( $('#Clc-rentab_pelna_' + year + '_D66') , d66, true); 
  //$('#Clc-rentab_pelna_' + year + '_D66').val(d66.toFixed(2)).change();
}

function set_rentabilitate_D72(fields) {
  var d68 = clcDatiByDom(fields['D68']); //parseFloat( fields['D68'].val() ); if ( isNaN(d68) ) d68 = 0;
  var d69 = clcDatiByDom(fields['D69']); //parseFloat( fields['D69'].val() ); if ( isNaN(d69) ) d69 = 0;
  var d70 = clcDatiByDom(fields['D70']); //parseFloat( fields['D70'].val() ); if ( isNaN(d70) ) d70 = 0;
  var d71 = clcDatiByDom(fields['D71']); //parseFloat( fields['D71'].val() ); if ( isNaN(d71) ) d71 = 0;
  var d72 = d68 + d69 + d70 + d71;
  
  clcDispByDom(fields['D68'], d68); //fields['D68'].val(d68);   
  clcDispByDom(fields['D69'], d69); //fields['D69'].val(d69);
  clcDispByDom(fields['D70'], d70); //fields['D70'].val(d70);   
  clcDispByDom(fields['D71'], d71); //fields['D71'].val(d71);  
  clcDispByDom(fields['D72'], d72, true); //fields['D72'].val(d72).change();  
}

function set_rentabilitate_D75(year) {
  var d66 = clcDati('D66', year); //parseFloat( $('#Clc-rentab_pelna_' + year + '_D66').val() );
  var d72 = clcDati('D72', year); //parseFloat( $('#Clc-rentab_subsidijas_' + year + '_D72').val() );
  var d74 = clcDati('D74', year); //parseFloat( $('#Clc-rentab_plusma_' + year + '_D74').val() ); if ( isNaN(d74) ) d74 = 0;
  var d75 = ( d66 * 1 ) + d72 - d74;
  
  clcDispByDom($('#Clc-rentab_plusma_' + year + '_D74'), d74); //$('#Clc-rentab_plusma_' + year + '_D74').val(d74);
  clcDispByDom($('#Clc-rentab_plusma_' + year + '_D75'), d75, true); //$('#Clc-rentab_plusma_' + year + '_D75').val(d75).change();
}

function set_rentabilitate_D76(year) {
  var d72 = clcDati('D72', year); //$('#Clc-rentab_subsidijas_' + year + '_D72').val();
  var d75 = clcDati('D75', year); //$('#Clc-rentab_plusma_' + year + '_D75').val();
  var d76 = 0; if( d75 != 0) d76 = ( d72 / d75 ) * 100;
  
  clcDispByDom($('#Clc-rentab_plusma_' + year + '_D76'), d76, true); 
  //$('#Clc-rentab_plusma_' + year + '_D76').val(d76.toFixed(2)).change();
}