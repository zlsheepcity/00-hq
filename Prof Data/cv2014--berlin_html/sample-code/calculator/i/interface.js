function clcDati(field, year, nozare){
  var dom = clcGetInputDom(field, year, nozare);  
  if(!dom) 
  { 
    console.log("incorrect dom name: FIELD:" + field + ', YEAR:' + year + ', NOZARE: ' + nozare); 
    return 0;
  }
  return parseValue2int(dom.val());
}
function clcSkaistiDati(field, year, nozare){
  var dom = clcGetInputDom(field, year, nozare);
  //var val = parseValue2int(dom.val());
  //var tofx = dom.hasClass("format2") ? 2 : 0;
  //return sdf_FTS(val, tofx);
  if(!dom) console.log(field);
  return dom.val();
}
function clcDatiByDom(dom){
  return parseValue2int(dom.val());
}
function clcDispByDom(dom, value, change){
  var tofx=0;
  if(dom.hasClass("format2")) tofx=2;
  if(dom.hasClass("format3")) tofx=3;
  value = sdf_FTS(value, tofx);
  dom.val(value);
  if(change) dom.change();
}
function clcFieldParse(dom, change){
  clcDispByDom(dom, clcDatiByDom(dom), change);
}
function parseValue2int(value) {
  value = value.replace(",",".").replace(/\s/g, "").replace("%","");
  value = parseFloat(value);
  if( isNaN(value) ) value = 0;
  return value;
}

function clcYear(year) {
  if( !isNaN(year) && year < 1841 ) year = collumn_years[year];
  return $('#Clc-checkbox-y%YEAR%'.replace("%YEAR%",year)).is(':checked');
}

function clcNozareFlag(nozare) {
	if( $('#Clc-checkbox-'+nozare) ) if( $('#Clc-checkbox-'+nozare).is(':checked') ) return true;
	else return false;
}


function show_hide_tabs(target){
  $('.Clc-TAB').hide();
  $('#Clc-Tables-' + target).show();
  $('#Clc-Tables-Navigation li').removeClass("active");
  $('#Clc-Tables-Nav-' + target).addClass("active");      
}  

function change_years_row(clickedYear, changeState) {
  // Calculate new states
  if(clickedYear) {
    var posClicked = $.inArray(clickedYear-0, collumn_years); //collumn_years.indexOf(clickedYear-0);
    var statusClicked = $('#Clc-checkbox-y' + clickedYear).is(':checked');
    if(changeState) {
      statusClicked = !statusClicked;
      if(statusClicked) $('#Clc-checkbox-y' + clickedYear).attr("checked","yes");
      else $('#Clc-checkbox-y' + clickedYear).removeAttr("checked");
    }
    switch(posClicked){
      case 0:
        if( statusClicked ) $('#Clc-checkbox-y' + collumn_years[1]).attr("checked","yes");
        break;
      case 1:
        if( !statusClicked ) $('#Clc-checkbox-y' + collumn_years[0]).removeAttr("checked");
        break;
      case 4:  
        if( !statusClicked ) $('#Clc-checkbox-y' + collumn_years[5]).removeAttr("checked");
        break;
      case 5:  
        if( statusClicked ) $('#Clc-checkbox-y' + collumn_years[4]).attr("checked","yes");
        break;  
      default:
        //
    }
  }
  
  // Reset interface elements
  show_hide_forms();
  if( $('#Clc-Tables-Analize').is(':visible') ) {
    show_analize_tips(last_full_year);
    draw_charts();
  }
  
}

function showHide_informTip(label){
  var TR;
  var state = false;
  switch(label) 
  {
    case 'D74':
      TR = $( '#Clc-Tables-Rentabilitate-Block-plusma_informTip_D74' );
      for( var yi in collumn_years) 
      {
        //if(clcYear(yi) && clcDati('D74', yi) == 0 ) 
        var TRF = clcGetInputDom('D74', yi)
        if(clcYear(yi) && TRF.val() == '' ) 
        {
          state = true;
          $('#Clc-rentab_plusma_%YEAR%_D74'.replace('%YEAR%', collumn_years[yi])).addClass('Clc-fieldNote');
        }else{
          $('#Clc-rentab_plusma_%YEAR%_D74'.replace('%YEAR%', collumn_years[yi])).removeClass('Clc-fieldNote');
        }
      }    
      break;
    case 'D84':
    /*
      TR = $( '#Clc-Tables-Investicijas-Block-plusma_informTip_D74' );
      for( var yi in collumn_years) 
      {
        if(clcYear(yi) && clcDati('D74', yi) == 0 ) 
        {
          state = true;
          $('#Clc-rentab_plusma_%YEAR%_D74'.replace('%YEAR%', collumn_years[yi])).css("background","yellow");
        }else{
          $('#Clc-rentab_plusma_%YEAR%_D74'.replace('%YEAR%', collumn_years[yi])).css("background","white");
        }
      }    
      */
      return false;
      break;     
      
  }
  
  if(state) TR.show(); else TR.hide();
  return state;
}

function clcGetInputDom(field, year, nozare){
  // get jq dom element by field name
  
  // CHECK YEAR
  if( !year ) year = last_full_year;
  if( !isNaN(year) && year < 1841 ) year = collumn_years[year];
  
  // SELECT JQ ELEMENT
  var dom = false;  
  switch(field){
  
	// ienemumi augkopiba
	case "D13":
	case "D14":
	case "D15":
	case "D16":
	case "D17":
	case "D18":
	case "D19":
	case "D20":
	case "D21":
	case "D22":
	case "D24":
		if( !nozare ) nozare = 'augkopiba3';
		dom = $('#Clc-ienem_%NOZARE%_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%NOZARE%', nozare).replace('%FIELD%',field));
		break;
		
	// ienemumi lopkopiba
	case "D26":
	case "D27":
	case "D28":
	case "D29":
	case "D30":
	case "D31":
	case "D32":
	case "D33":
	case "D34":
    dom = $('#Clc-ienem_lopkopiba_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
		break;
		
	// ienemumi citi
	case "D23":  
	case "D36":
	case "D37":
		dom = $('#Clc-ienem_citi_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
		break;	
		
	// ienemumi total
	case "D39":
		dom = $('#Clc-ienem_total_%YEAR%_TOTAL'.replace('%YEAR%', year));
		break;	
		
	// izdevumi augkopiba
  case "D45":
  case "D46":
  case "D47":
  case "D48":
  case "D49":
  case "D50":
    dom = $('#Clc-izdev_augkopiba_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
    break;
    
	// izdevumi lopkopiba
  case "D51":
  case "D52":
    dom = $('#Clc-izdev_lopkopiba_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
    break;

	// izdevumi citi
  case "D53":
  case "D54":
  case "D55":
  case "D56":
  case "D57":
  case "D58":
    dom = $('#Clc-izdev_citi_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
    break;    
    
	// izdevumi total
	case "D60":
		dom = $('#Clc-izdev_total_%YEAR%_TOTAL'.replace('%YEAR%', year));
		break;	    
	
  // rentabilitate pelna
	case "D66":
		dom = $('#Clc-rentab_pelna_%YEAR%_D66'.replace('%YEAR%', year));
		break;
    
  // rentabilitate subsidijas
	case "D68":
  case "D69":
  case "D70":
  case "D71":
  case "D72":
		dom = $('#Clc-rentab_subsidijas_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
		break;
		
  // rentabilitate plusma
  case "D74":
  case "D75":
  case "D76":
		dom = $('#Clc-rentab_plusma_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
		break;  
  
  // investicijas  
  case "D81":
  case "D82":
  case "D83":
  case "D84":
  case "D86":
  case "D87":
  case "D88":
  case "D89":
  case "D91":
  case "D93":
  case "D95":
  case "D96":
  case "D97":
		dom = $('#Clc-invest_inv1_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
		break;   

  // analize
  case "D101":
  case "D102":
  case "D103":  
  case "D104":
		dom = $('#Clc-anal_anal1_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%FIELD%',field));
		break;  

  case "TOTAL":
    if( !nozare ) nozare = 'ienem'; // or "izdev"
    dom = $('#Clc-%NOZARE%_total_%YEAR%_%FIELD%'.replace('%YEAR%', year).replace('%NOZARE%', nozare).replace('%FIELD%',field));
    break;
    
  }
  return dom;
}
  



// ---------------------------------------------------------------------------------------------------------
// This is the hacks for IE
  
 
  
if ($.browser.msie) {
  $("input").click(function() {
    this.blur();
    this.focus();
  });
}


// _____________________________________________________________________________
// Преобразует число в строку формата 1 000 000._decimal
function sdf_FTS(_number, tofx)
{
//console.log('in:'+_number);
var separator = ' ';
var rr=Number(_number);
if( !tofx ) tofx = 0;
rr = rr.toFixed(tofx);
rr = rr.toString().split('.');

var b=rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1"+separator);
var r=b;
if(rr[1]) r += '.'+rr[1];
//console.log('out:'+r);
return r;
}