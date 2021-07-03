  // create years
  function Clc_get_current_year(){ var d=new Date(); return d.getFullYear(); }
  var current_year = Clc_get_current_year();
  var last_full_year = current_year-1;
  var collumn_years = [ current_year-3, current_year-2, current_year-1, current_year, current_year+1, current_year+2 ];


  // create object with form labels and names from data files
  Labels_Aprekini = Labels_Aprekini.replace(/\%YEAR\%/g,last_full_year);
  
  var obj_labels_ienemumi = eval ("(" + Labels_Ienemumi + ")");           var Data_Ienemumi = obj_labels_ienemumi.data;  
  var obj_labels_izdevumi = eval ("(" + Labels_Izdevumi + ")");           var Data_Izdevumi = obj_labels_izdevumi.data; 
  var obj_labels_rentabilitate = eval ("(" + Labels_Rentabilitate + ")"); var Data_Rentabilitate = obj_labels_rentabilitate.data;   
  var obj_labels_investicijas = eval ("(" + Labels_Investicijas + ")");   var Data_Investicijas = obj_labels_investicijas.data;  
  var obj_labels_analize = eval ("(" + Labels_Analize + ")");             var Data_Analize = obj_labels_analize.data;   
  var obj_labels_aprekini = eval ("(" + Labels_Aprekini + ")");           var Data_Aprekini = obj_labels_aprekini; 
  var obj_cenas_piens = eval ("(" + Cenas_Piens + ")");                   var Data_Cenas_Piens = obj_cenas_piens;
  var obj_cenas_augi = eval ("(" + Cenas_Augi + ")");                     var Data_Cenas_Augi = obj_cenas_augi;  
  
  // Anal.tips global
  var AnalTipsExport = [];
  
  var showHide_informTip_Flag = false; // reminder is shown only once

  
$(document).ready(function(){

    // === change static values ===
    
    $('#Clc-Analize-Charts h5').each(function(){ 
      $(this).html( $(this).html().replace('%YEAR%', last_full_year) ); 
    });
    
    // ============== DISPLAY ELEMENTS ===============================
    
    // display checkboxes for years
    for( var t in collumn_years ){
      $('#Clc-Toolbar .Clc-toolbar-gadi').append('<label><input type="checkbox" ' +
        'id="Clc-checkbox-y' + collumn_years[t] + '" ' + 
        'value="' + collumn_years[t] + '" /> ' + collumn_years[t] + '</label>');
    }
    $('#Clc-checkbox-y' + current_year).attr("checked", "yes").attr("disabled","yes");
    $('#Clc-checkbox-y' + last_full_year).attr("checked", "yes").attr("disabled","yes");
    
  
    // display forms
    draw_forms('Clc-Tables-Ienemumi', 'Clc-ienem', Data_Ienemumi, 100);
    draw_forms('Clc-Tables-Izdevumi', 'Clc-izdev', Data_Izdevumi, 400);
    draw_forms('Clc-Tables-Rentabilitate', 'Clc-rentab', Data_Rentabilitate, 700);
    draw_forms('Clc-Tables-Investicijas', 'Clc-invest', Data_Investicijas, 800);
    draw_forms('Clc-Tables-Analize', 'Clc-anal', Data_Analize, 900);
    show_hide_forms();   
    
    
    
    
    // ============== CREATE EVENTS ===================================
    
    // formulas
    create_form_events();
    
    
    $('#Clc-Tables-Navigation a').click(function(){ // navigation tabs
      if( !$('#Clc-Tables-Nav-' + $(this).attr("href")).hasClass("disabled") ) show_hide_tabs($(this).attr("href"));
      $(this).blur();
      

      
      return false;
    });
    
    $('#Clc-Tables-Nav-Analize a').click(function(){ // special events while switching to 'Analize'
      show_analize_tips(last_full_year);
      draw_charts();
    });
        
    $('#Clc-Toolbar .Clc-toolbar-nozare input').change(function(){ // change nozares settings
      show_hide_forms();
	  if( $('#Clc-Tables-Analize').is(':visible') ) draw_charts();
    });

    $('#Clc-Toolbar .Clc-toolbar-gadi input').change(function(){ // change years settings
      change_years_row($(this).val());
    }); 
    
    $('.Clc-YearCollumn').click(function(){ // change years settings (from table headers)
      for( var t in collumn_years ) 
        if( $(this).hasClass("Clc-YearCollumn-" + collumn_years[t]) && collumn_years[t] != current_year && collumn_years[t] != last_full_year ) 
          change_years_row(collumn_years[t], true);        
    }); 

    
    
    $('#Clc-piekritu-nosacijumiem').change(function(){ // checkbox 'I am Agree'
      if( $(this).is(':checked') ) {
        $('#Clc-piekritu-nosacijumiem-button').removeAttr("disabled");
      }
      else {
        $('#Clc-piekritu-nosacijumiem-button').attr("disabled", "yes");
        $('#Clc-Tables-Navigation li').addClass("disabled");
        $('#Clc-Tables-Nav-Start').removeClass("disabled");        
        show_hide_tabs('Start');
      }
    });
    
    $('#Clc-piekritu-nosacijumiem-button').click(function(){ // button 'I am Agree'
      if( $('#Clc-piekritu-nosacijumiem').is(':checked') ) {
        $('#Clc-Tables-Navigation li').removeClass("disabled");
        show_hide_tabs('Ienemumi');
        $(window).scrollTop( $('#Clc-Calculator').offset().top );
      }
      else {
        $('#Clc-Tables-Navigation li').addClass("disabled");
        $('#Clc-Tables-Nav-Start').removeClass("disabled");
        show_hide_tabs('Start');
      }          
    });
    

    
    $("input[type=text]").click(function() {
       $(this).select();
    });    
    
    $('#Clc-btn-PDF').click(function(){
      draw_chartsPDF();
      $('#Clc-PDF-DataValues').val( clcFormToJson() );
      $('#Clc-PDF-DataParams').val( clcParamsToJson() );
      $('#Clc-PDF-DataImages').val( clcChartsToJson() );
      $('#Clc-PDF-Data').submit();
      return false;
    });
	
    $('#Clc-nosacijumi-text').click(function(){
      $('#Clc-Coolbar').toggle();
    });
    
    $('#Clc-ienem_platiba_inputcaption').change(function(){
      clcFieldParse($(this));
    });
    
    // === talak button ===
    $('#Clc-Tables-Ienemumi .clc-talak-area input[type="button"]').click(function(){         show_hide_tabs('Izdevumi');    });
    $('#Clc-Tables-Izdevumi .clc-talak-area input[type="button"]').click(function(){         show_hide_tabs('Rentabilitate');    });
    $('#Clc-Tables-Rentabilitate .clc-talak-area input[type="button"]').click(function(){    
      if( showHide_informTip('D74') && !showHide_informTip_Flag ) showHide_informTip_Flag = true;
      else show_hide_tabs('Investicijas');
    });
    $('#Clc-Tables-Investicijas .clc-talak-area input[type="button"]').click(function(){     $('#Clc-Tables-Nav-Analize a').click();    });
    
    
    // ============= READY TO GO =============================
    show_hide_tabs('Start');
    
    
    //zl2015 TEMPORARY VALUES
    $('#Clc-Tables-Navigation li').removeClass("disabled");
    show_hide_tabs('Ienemumi');
    
    $('#Clc-ienem_lopkopiba_2014_D26').val('12000');
    $('#Clc-ienem_lopkopiba_2014_D27').val('100');
    $('#Clc-ienem_lopkopiba_2014_D28').val('125');
    $('#Clc-ienem_lopkopiba_2014_D31').val('5000');
    $('#Clc-ienem_lopkopiba_2014_D32').val('10');
    $('#Clc-ienem_lopkopiba_2015_D27').val('90');
    $('#Clc-ienem_lopkopiba_2015_D28').val('11');
    $('#Clc-ienem_lopkopiba_2015_D29').val('18');
    $('#Clc-ienem_lopkopiba_2015_D30').val('0.2');
    $('#Clc-ienem_lopkopiba_2015_D32').val('10');
    
    $('#Clc-ienem_lopkopiba_2014_D29').val('4.00%');
    $('#Clc-ienem_lopkopiba_2014_D30').val('0.417');
    
    
    
    $('#Clc-ienem_citi_2014_D23').val('400');
    $('#Clc-ienem_citi_2014_D36').val('100');
    $('#Clc-ienem_citi_2014_D37').val('200');

    $('#Clc-izdev_augkopiba_2014_D45').val('10');
    $('#Clc-izdev_augkopiba_2014_D46').val('20');
    $('#Clc-izdev_augkopiba_2014_D47').val('30');
    $('#Clc-izdev_augkopiba_2014_D48').val('40');


  });
