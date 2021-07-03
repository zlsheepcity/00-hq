function set_ienemumi_input(nozare, year) {
  var input_prefix = 'Clc-ienem_%NOZARE%_%YEAR%_'.replace('%NOZARE%',nozare.id).replace('%YEAR%', year);
  var dom;
  if ( nozare.id == 'total' ) {
    $('#Clc-ienem_total_' + year + '_TOTAL').change(function(){
      set_rentabilitate_D66(year);
    });
  } else if ( nozare.id == 'citi' ) {
    for (var t in nozare.fields) {
      
        $('#' + input_prefix + nozare.fields[t].field).change(function(){
          //if ( isNaN($(this).val()) ) $(this).val("0");
          set_ienemumi_TOTAL(year);
          clcDispByDom($(this), clcDatiByDom($(this)));
        });
    }
  } else if ( nozare.id == 'platiba' ) {
	//
  } else if ( nozare.id == 'lopkopiba' ) {
    
    var fields = new Object();
    for (var t in nozare.fields) {
      fields[nozare.fields[t].field] = $('#' + input_prefix + nozare.fields[t].field);
      
    }
    fields['year'] = year;
    
    
    fields['D26'].change(function(){
      set_ienemumi_D28(fields);
      set_ienemumi_D29(fields);
      set_ienemumi_D30(fields);
      set_ienemumi_D31(fields);
    });
    fields['D27'].change(function(){
      set_ienemumi_D28(fields);
      set_ienemumi_D29(fields);
      set_ienemumi_D26(fields, year);
    });    
    fields['D28'].change(function(){
      set_ienemumi_D29(fields);
      set_ienemumi_D26(fields, year);
    }); 
    fields['D29'].change(function(){
      set_ienemumi_D26(fields, year);
      $(this).val( $(this).val() + '%' );       
    });   
    fields['D30'].change(function(){
      set_ienemumi_D31(fields);
    });     
    fields['D31'].change(function(){
      set_ienemumi_D30(fields);
      set_ienemumi_D34_Kopa(fields);
    }); 
    fields['D32'].change(function(){
      set_ienemumi_D34_Kopa(fields);
    }); 
    fields['D34'].change(function(){
      set_ienemumi_TOTAL(year);
    });      

    
    
  }else{

    var fields = new Object();
    for (var t in nozare.fields) {
      fields[nozare.fields[t].field] = $('#' + input_prefix + nozare.fields[t].field);
    }    
    
    fields['D13'].change(function(){
      set_ienemumi_D14(fields);
    });

    fields['D14'].change(function(){
      set_ienemumi_D15(fields, year);
    });    
    fields['D15'].change(function(){
      set_ienemumi_D14(fields);
      set_ienemumi_D17(fields);
    });
    fields['D16'].change(function(){
      set_ienemumi_D17(fields);
    });    
     fields['D17'].change(function(){
      set_ienemumi_D19(fields);
    }); 
    fields['D18'].change(function(){
      set_ienemumi_D19(fields);
    });
    fields['D19'].change(function(){
      set_ienemumi_D24_Kopa(fields);
    });     
    fields['D20'].change(function(){
      set_ienemumi_D22(fields);
    });  
    fields['D21'].change(function(){
      set_ienemumi_D22(fields);
    });
    fields['D22'].change(function(){
      set_ienemumi_D24_Kopa(fields);
    });      
/*    
    fields['D23'].change(function(){
      set_ienemumi_D24_Kopa(fields);
    });
*/    
    fields['D24'].change(function(){
      set_ienemumi_TOTAL(year);
    });     

  }
  
}
function set_ienemumi_TOTAL(year) {
  var total = 0;
  var d00;
  var use_for_data;
  for (var t in Data_Ienemumi) {
    
    //  CHECK CHECKBOXES
    if( Data_Ienemumi[t].type == 'hidenned'  ) {
      if( $('#Clc-checkbox-' + Data_Ienemumi[t].id).is(':checked') ) {
        use_for_data = true;
      } else {
        use_for_data = false;
      }
    } else use_for_data = true;
    
    // GET DATA FROM TABLE
    if(use_for_data) {
      for (var t2 in Data_Ienemumi[t].fields) {
        current_row = Data_Ienemumi[t].fields[t2];
        if( current_row.total == "yes" ) {
          if( current_row.field == 'D23' && !clcNozareFlag('augkopiba1') && !clcNozareFlag('augkopiba2') && !clcNozareFlag('augkopiba3') ) 
          {
            // skip
          } else {
            //d00 = parseFloat( $('#Clc-ienem_' + Data_Ienemumi[t].id + '_' + year + '_'  + current_row.field ).val() ); if ( isNaN(d00) ) d00 = 0;
            total += clcDatiByDom( $('#Clc-ienem_' + Data_Ienemumi[t].id + '_' + year + '_'  + current_row.field ) );
          }
        }
      }
    }
  }
  clcDispByDom($('#Clc-ienem_total_' + year + '_TOTAL'), total, true); 
  //$('#Clc-ienem_total_' + year + '_TOTAL').val(total).change();  
}

function set_ienemumi_D24_Kopa(fields) {
  var d19 = clcDatiByDom(fields['D19']); //parseFloat( fields['D19'].val() ); if ( isNaN(d19) ) d19 = 0;
  var d22 = clcDatiByDom(fields['D22']); //parseFloat( fields['D22'].val() ); if ( isNaN(d22) ) d22 = 0;
  var d23 = 0; //clcDatiByDom(fields['D23']); //parseFloat( fields['D23'].val() ); if ( isNaN(d23) ) d23 = 0;
  var d24 = d19 + d22 + d23;
  
  // clcDispByDom(fields['D23'], d23); //fields['D23'].val(d23);
  clcDispByDom(fields['D24'], d24, true); //fields['D24'].val(d24).change();
}
function set_ienemumi_D22(fields) {
  var d20 = clcDatiByDom(fields['D20']); //parseFloat( fields['D20'].val() ); if ( isNaN(d20) ) d20 = 0;
  var d21 = clcDatiByDom(fields['D21']); //parseFloat( fields['D21'].val() ); if ( isNaN(d21) ) d21 = 0;  
  var d22 = d20 * d21;
  
  clcDispByDom(fields['D20'], d20); //fields['D20'].val(d20);
  clcDispByDom(fields['D21'], d21); //fields['D21'].val(d21);
  clcDispByDom(fields['D22'], d22, true); //fields['D22'].val(d22).change();
}
function set_ienemumi_D19(fields) {
  var d17 = clcDatiByDom(fields['D17']); //parseFloat( fields['D17'].val() ); if ( isNaN(d17) ) d17 = 0;
  var d18 = clcDatiByDom(fields['D18']); //parseFloat( fields['D18'].val() ); if ( isNaN(d18) ) d18 = 0;
  var d19 = d17 * d18;
  
  clcDispByDom(fields['D17'], d17); //fields['D17'].val(d17);   
  clcDispByDom(fields['D18'], d18); //fields['D18'].val(d18);
  clcDispByDom(fields['D19'], d19, true); //fields['D19'].val(d19).change();
}
function set_ienemumi_D17(fields) {
  var d15 = clcDatiByDom(fields['D15']); //parseFloat( fields['D15'].val() );  if ( isNaN(d15) ) d15 = 0;  
  var d16 = clcDatiByDom(fields['D16']); //parseFloat( fields['D16'].val() );  if ( isNaN(d16) ) d16 = 0; 
  var d17 = d15-d16;
  
  clcDispByDom(fields['D15'], d15); //fields['D15'].val(d15);
  clcDispByDom(fields['D16'], d16); //fields['D16'].val(d16);  
  clcDispByDom(fields['D17'], d17, true); //fields['D17'].val(d17).change();
}

function set_ienemumi_D15(fields, year) { 
  if( year<current_year ) return false; // future years
  
  var d13 = clcDatiByDom(fields['D13']); //parseFloat( fields['D13'].val() );  if ( isNaN(d13) ) d13 = 0;   
  var d14 = clcDatiByDom(fields['D14']); //parseFloat( fields['D14'].val() );  if ( isNaN(d14) ) d14 = 0;  
  var d15 = d13 * d14;
  
  clcDispByDom(fields['D13'], d13); //fields['D13'].val(d13);
  clcDispByDom(fields['D14'], d14); //fields['D14'].val(d14);
  clcDispByDom(fields['D15'], d15, true); //fields['D15'].val(d15).change();  
}

function set_ienemumi_D14(fields) {
  var d13 = clcDatiByDom(fields['D13']); //parseFloat( fields['D13'].val() );  if ( isNaN(d13) ) d13 = 0;   
  var d15 = clcDatiByDom(fields['D15']); //parseFloat( fields['D15'].val() );  if ( isNaN(d15) ) d15 = 0;  
  var d14 =0;  if ( d13 != 0 ) d14 =  d15  / d13;
  
  clcDispByDom(fields['D13'], d13); //fields['D13'].val(d13);  
  clcDispByDom(fields['D14'], d14); //fields['D14'].val(d14);  
  clcDispByDom(fields['D15'], d15); //fields['D15'].val(d15);
}

function set_ienemumi_D34_Kopa(fields) { 
  var d31 = clcDatiByDom(fields['D31']); //parseFloat( fields['D31'].val() );  if ( isNaN(d31) ) d31 = 0;   
  var d32 = clcDatiByDom(fields['D32']); //parseFloat( fields['D32'].val() );  if ( isNaN(d32) ) d32 = 0;  
  var d33 = 0; //clcDatiByDom(fields['D33']); //parseFloat( fields['D33'].val() );  if ( isNaN(d33) ) d33 = 0;    
  var d34 = d31 + d32 + d33;
  
  clcDispByDom(fields['D31'], d31); //fields['D31'].val(d31);
  clcDispByDom(fields['D32'], d32); //fields['D32'].val(d32);
  //clcDispByDom(fields['D33'], d33); //fields['D33'].val(d33);
  clcDispByDom(fields['D34'], d34, true); //fields['D34'].val(d34).change();
}

function set_ienemumi_D31(fields) {
  if( fields['year']<current_year ) return false; // future years
  
  var d26 = clcDatiByDom(fields['D26']); //parseFloat( fields['D26'].val() );  if ( isNaN(d26) ) d26 = 0;
  var d30 = clcDatiByDom(fields['D30']); //parseFloat( fields['D30'].val() );  if ( isNaN(d30) ) d30 = 0;
  var d31 = Math.floor( d26 * d30 );
  
  clcDispByDom(fields['D26'], d26); //fields['D26'].val(d26);
  clcDispByDom(fields['D30'], d30); //fields['D30'].val(d30.toFixed(3));
  clcDispByDom(fields['D31'], d31, true); //fields['D31'].val(d31).change();
}

function set_ienemumi_D30(fields) {
  if( fields['year']>=current_year ) return false; // past years

  var d26 = clcDatiByDom(fields['D26']); //parseFloat( fields['D26'].val() );  if ( isNaN(d26) ) d26 = 0;
  var d31 = clcDatiByDom(fields['D31']); //parseFloat( fields['D31'].val() );  if ( isNaN(d31) ) d31 = 0;
  var d30 = 0;  if ( d26 != 0 ) d30 = d31 / d26;
  
  clcDispByDom(fields['D26'], d26); //fields['D26'].val(d26);
  clcDispByDom(fields['D30'], d30); //fields['D30'].val(d30.toFixed(3));
  clcDispByDom(fields['D31'], d31); //fields['D31'].val(d31);
}

function set_ienemumi_D29(fields) {
  if( fields['year']>=current_year ) return false; // past years

  var d26 = clcDatiByDom(fields['D26']); //parseFloat( fields['D26'].val() );  if ( isNaN(d26) ) d26 = 0;  
  var d27 = clcDatiByDom(fields['D27']); //parseFloat( fields['D27'].val() );  if ( isNaN(d27) ) d27 = 0;   
  var d28 = clcDatiByDom(fields['D28']); //parseFloat( fields['D28'].val() );  if ( isNaN(d28) ) d28 = 0;    
  d29 = 0;  if ( d27 * d28 != 0 ) d29 =  ( 1 - d26  / ( d27 * d28  ) ) * 100;
  
  clcDispByDom(fields['D26'], d26); //fields['D26'].val(d26);
  clcDispByDom(fields['D27'], d27); //fields['D27'].val(d27);
  clcDispByDom(fields['D28'], d28); //fields['D28'].val(d28);
  clcDispByDom(fields['D29'], d29, true); //fields['D29'].val(d29).change();
}

function set_ienemumi_D28(fields) {
  if( fields['year']>=current_year ) return false; // past years
  
  var d28 = clcDatiByDom(fields['D28']); //parseFloat( fields['D28'].val() );  if ( isNaN(d28) ) d28 = 0;
  if( d28 != 0 ) return false; // double input

  var d26 = clcDatiByDom(fields['D26']); //parseFloat( fields['D26'].val() );  if ( isNaN(d26) ) d26 = 0;
  var d27 = clcDatiByDom(fields['D27']); //parseFloat( fields['D27'].val() );  if ( isNaN(d27) ) d27 = 0;
  d28 = 0;  if ( d27 != 0 ) d28 = Math.ceil( d26 / d27 );
  
  clcDispByDom(fields['D26'], d26); //fields['D26'].val(d26);
  clcDispByDom(fields['D27'], d27); //fields['D27'].val(d27);
  clcDispByDom(fields['D28'], d28, true); //fields['D28'].val(d28).change();
}

function set_ienemumi_D26(fields, year) {
  if( year<current_year ) return false; // future years

  var d27 = clcDatiByDom(fields['D27']); //parseFloat( fields['D27'].val() );  if ( isNaN(d27) ) d27 = 0;
  var d28 = clcDatiByDom(fields['D28']); //parseFloat( fields['D28'].val() );  if ( isNaN(d28) ) d28 = 0;
  var d29 = clcDatiByDom(fields['D29']); //parseFloat( fields['D29'].val() );  if ( isNaN(d29) ) d29 = 0;
  
  var d26 = Math.floor( d27 * d28 * ( 1 - (d29/100) ) );
  
  clcDispByDom(fields['D26'], d26, true); //fields['D26'].val(d26).change();
  clcDispByDom(fields['D27'], d27); //fields['D27'].val(d27);
  clcDispByDom(fields['D28'], d28); //fields['D28'].val(d28);
}