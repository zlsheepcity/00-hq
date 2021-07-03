function draw_forms(TabID, InputPrefix, DataSource, tabindx) {
  var BlockID = TabID + "-Block";
  var TAB = $('#' + TabID + ' .Clc-insert-form');
  var DIV;
  var THEAD;
  var THEADTR;
  var TBODY;
  var TFOOT;
  var ROW;
  
  var current_nozare;
  var current_row;
  var current_row_id;
  var current_block_id;
  var current_input_prefix;
  var current_input_name;
  var current_work_year;
  
  var t;
  var t2;  
  var tYear;
  var newHTML = "";
  var clas;
  var trclass;
  
  
  // BEGIN CYCLE OF DISPLAY
  for (t in DataSource) {
    current_nozare = DataSource[t];
    current_block_id = BlockID + '-' + current_nozare.id;
    current_input_prefix = InputPrefix + '_' + current_nozare.id;
	if ( current_nozare.id =='anal2')  current_input_prefix = InputPrefix + '_anal1'; // CRISTMAS SPECIAL
    
    
    // create pre-table div
    TAB.append("\n" + '<div id="' + current_block_id + '" class="Clc-pre-table-div"></div>' + "\n");
    DIV = $('#' + current_block_id);
    
    // display caption
    if( current_nozare.caption ) DIV.append('<h3>' + current_nozare.caption + '</h3>');
    if( current_nozare.inputcaption ) DIV.children('h3').append(' <input type="text" id="' + 
      InputPrefix + '_' + current_nozare.id + '_inputcaption" tabindex="99" value="' + current_nozare.inputcaption + 
    '">');
    
    // create table
    DIV.append('<table cellspacing="0" cellpadding="0" border="0"><thead></thead><tbody></tbody><tfoot></tfoot></table>');
    THEAD = $('#' + current_block_id + ' thead'); THEAD.empty();
    TBODY = $('#' + current_block_id + ' tbody');
    TFOOT = $('#' + current_block_id + ' tfoot');
    
    
    // CIRCLE 1: DISPLAY LABELS
    THEAD.append('<tr><td></td></tr>');
    THEADTR = $('#' + current_block_id + ' thead tr');
    for (t2 in current_nozare.fields) {
      current_row = current_nozare.fields[t2];
      current_row_id = current_block_id + '-TR-' + current_row.field;
      clas = current_row.clas; 
        if(clas=="futureinput") clas="calc";
        if(clas=="futurecalc")  clas="input";
      newHTML = '';
      if( current_row.textlabel ) newHTML = '<tr id="' + 
        current_row_id + '"><th><div>' + 
        '<input type="text" name="' + current_input_prefix + '_' + current_row.textlabel + '_'  + current_row.field + '" ' + 
        'value="" placeholder="' + current_row.label + '"/>' +
        '</div></th></tr>';
      else newHTML = '<tr id="' + current_row_id + '"><th><div class="' + clas + '">' + current_row.label + '</div></th></tr>';
      
      if( current_row.footer == "yes" ) TFOOT.append(newHTML);
      else TBODY.append(newHTML);
      
      if( current_row.orange == "yes" ) $('#' + current_row_id ).addClass("orange");
        
      // additional check labels
      if( current_row.checklabel ) {
        trclass = current_block_id + '_informTip_' + current_row.field;
        TBODY.append('<tr class="Clc-inform-tip" id="' + trclass + '"><th></th><td colspan="6">' + current_row.checklabel + '</div></tr>');
      }    
    }
    
    // CIRCLE 2: DISPLAY FIELDS
    for (tYear in collumn_years) {
      current_work_year = collumn_years[tYear];
      THEADTR.append('<th class="Clc-YearCollumn Clc-YearCollumn-' + current_work_year + '"><span>' + current_work_year + '</span></th>');
      if(current_nozare.fields) for (t2 in current_nozare.fields) {
        current_row = current_nozare.fields[t2];
        current_input_name = current_input_prefix + '_' + current_work_year + '_'  + current_row.field;
        clas = current_row.clas; 
          if(clas=="futureinput") { if(current_work_year>=current_year) clas="input"; else clas="calc"; }
          if(clas=="futurecalc")  { if(current_work_year>=current_year) clas="calc"; else clas="input"; }
        newHTML = '<td class="Clc-YearCollumn-' + current_work_year + '"><div>' + 
          '<input type="text" ' +
          'name="' + current_input_name + '" ' +
          'id="' + current_input_name + '" ' +
          'class="' + clas + '" ';
        if ( clas == "input" )  newHTML +=  'tabindex="' + tabindx + '" ';
        newHTML += 'value=""/></div></td>';
        tabindx++;
        $('#' + current_block_id + '-TR-' + current_row.field).append(newHTML);
        if( $('#' + current_input_name).hasClass("calc") ) {
          $('#' + current_input_name).attr("readonly", "yes");
          $('#' + current_input_name).val("0");
        }
        if(current_row.format) $('#' + current_input_name).addClass(current_row.format);
      }
    }
    

    
    // HIDE YEARS CAPTIONS
    if( current_nozare.hideyears == 'yes' ) THEAD.css("display","none");
  }

  
  
};

function show_hide_forms(){
  var dData;
  var css_prefix;
  
  // STEP 1: hide years
  for (var tYear in collumn_years) {
    if( $('#Clc-checkbox-y' + collumn_years[tYear]).is(':checked') ) {
      $('.Clc-YearCollumn-' + collumn_years[tYear]).removeClass("Clc-hidden-year");
    } else {
      $('.Clc-YearCollumn-' + collumn_years[tYear]).addClass("Clc-hidden-year");
    }
  }    

  // STEP 2: hide blocks
  dData = Data_Ienemumi;
  css_prefix = '#Clc-Tables-Ienemumi-Block-';
  for (var t in dData) {
    if( dData[t].type == 'hidenned'  ) {
      if( $('#Clc-checkbox-' + dData[t].id).is(':checked') ) { $(css_prefix + dData[t].id).slideDown(); $(css_prefix + dData[t].id).show(); }
      else { $(css_prefix + dData[t].id).slideUp(); $(css_prefix + dData[t].id).hide(); }
    }    
  }
  dData = Data_Izdevumi;
  css_prefix = '#Clc-Tables-Izdevumi-Block-';
  for (var t in dData) {
    if( dData[t].type == 'hidenned'  ) {
      if( $('#Clc-checkbox-' + dData[t].id).is(':checked') ) { $(css_prefix + dData[t].id).slideDown(); $(css_prefix + dData[t].id).show(); }
      else { $(css_prefix + dData[t].id).slideUp(); $(css_prefix + dData[t].id).hide(); }
    }    
  } 

  
  // STEP 3: kreditsaistibas
  var firstYearIndex = 2;
  for( var t = 2; t >= 0; t-- ) if( $('#Clc-checkbox-y' + collumn_years[t]).is(':checked') ) firstYearIndex = t;
  var firstYear = collumn_years[firstYearIndex];
  for( var t in collumn_years ) 
    $('#Clc-invest_inv1_' + collumn_years[t] + '_' + 'D86').removeClass("input").addClass("calc").attr("readonly","yes");
  $('#Clc-invest_inv1_' + firstYear + '_' + 'D86').removeClass("calc").addClass("input").removeAttr("readonly");
  
  // STEP 4: sakumsumma
  var firstYearIndex = 2;
  for( var t = 2; t >= 0; t-- ) if( $('#Clc-checkbox-y' + collumn_years[t]).is(':checked') ) firstYearIndex = t;
  var firstYear = collumn_years[firstYearIndex];
  var firstSumm = parseFloat( $('#Clc-invest_inv1_' + firstYear + '_' + 'D96').val() ); if ( isNaN(firstSumm) ) firstSumm = 0;
  for ( var t = collumn_years.length - 1; t > firstYearIndex; t-- ) 
    $('#Clc-invest_inv1_' + collumn_years[t] + '_' + 'D96').removeClass("input").addClass("calc").attr("readonly","yes");
  $('#Clc-invest_inv1_' + firstYear + '_' + 'D96').removeClass("calc").addClass("input").removeAttr("readonly").val(firstSumm).change();  

  // STEP 5: citi ienemumi
  if( !clcNozareFlag('augkopiba1') && !clcNozareFlag('augkopiba2') && !clcNozareFlag('augkopiba3'))
    $( '#Clc-Tables-Ienemumi-Block-citi-TR-D23' ).hide();
  else $( '#Clc-Tables-Ienemumi-Block-citi-TR-D23' ).show();
  
  // LAST STEP: recalculate total
  for (var tYear in collumn_years) {
    set_ienemumi_TOTAL(collumn_years[tYear]);
    set_izdevumi_TOTAL(collumn_years[tYear]);
  }  

}

function create_form_events(){

  for (t in Data_Ienemumi) {
    for (tYear in collumn_years) {
      set_ienemumi_input(Data_Ienemumi[t], collumn_years[tYear]);
    }
  }
  
  for (t in Data_Izdevumi) {
    for (tYear in collumn_years) {
      set_izdevumi_input(Data_Izdevumi[t], collumn_years[tYear]);
    }
  } 

  for (t in Data_Rentabilitate) {
    for (tYear in collumn_years) {
      set_rentabilitate_input(Data_Rentabilitate[t], collumn_years[tYear]);
    }
  }    

  for (tYear in collumn_years) {
    set_investicijas_input(collumn_years[tYear]);
  }  

}
