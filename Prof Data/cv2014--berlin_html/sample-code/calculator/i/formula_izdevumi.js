function set_izdevumi_input(nozare, year) {
  var input_prefix = 'Clc-izdev_' + nozare.id + '_' + year + '_';
  if ( nozare.id == 'total' ) {
    $('#Clc-izdev_total_' + year + '_TOTAL').change(function(){
      set_rentabilitate_D66(year);
    });
  } else {
    for (var t in nozare.fields) {
      $('#' + input_prefix + nozare.fields[t].field).change(function(){
       //if ( isNaN($(this).val()) ) $(this).val("0");       
       set_izdevumi_TOTAL(year);
       clcDispByDom($(this), clcDatiByDom($(this)));
      });
    }
  }  
}

function set_izdevumi_TOTAL(year) {
  var Ddata = Data_Izdevumi;
  var input_prefix = '#Clc-izdev_';
  var total = 0;
  var d00;
  var use_for_data;
  for (var t in Ddata) {
    
    //  CHECK CHECKBOXES
    if( Ddata[t].type == 'hidenned'  ) {
      if( clcNozareFlag(Ddata[t].id) ) {
        use_for_data = true;
      } else {
        use_for_data = false;
      }
    } else use_for_data = true;
    
    // GET DATA FROM TABLE
    if(use_for_data) {
      for (var t2 in Ddata[t].fields) {
        current_row = Ddata[t].fields[t2];
        if( current_row.total == "yes" ) {
          // d00 = parseFloat( $(input_prefix + Ddata[t].id + '_' + year + '_'  + current_row.field ).val() ); if ( isNaN(d00) ) d00 = 0;
          total += clcDatiByDom( $(input_prefix + Ddata[t].id + '_' + year + '_'  + current_row.field ) );
        }
      }
    }
  }
  clcDispByDom( $(input_prefix + 'total_' + year + '_TOTAL') , total, true); 
  //$(input_prefix + 'total_' + year + '_TOTAL').val(total).change();
}