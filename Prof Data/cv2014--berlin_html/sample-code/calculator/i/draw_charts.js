function clc_getChartSettings() 
{
  var chart_settings = {
  
    bar: {
      HtmlText: false,
      resolution: 1, 
      fontColor: '#000000',
      color: '#111111',      
      markers: {
        show: true,
        position: 'ca',
        labelFormatter: function (o) { return o.y+''; },
      fontSize: 9,
      verticalMargin: 4
      },
     xaxis: {
      showLabels: true,
      tickDecimals: 0,
      color: '#000000'
      },
     yaxis: {
      showLabels: false,
      autoscale: true, 
      autoscaleMargin: 1,
      ticks: [0]
      },
     grid : {
      color: '#D2D0CE',
      tickColor: '#D2D0CE',
      outline : 's',
      verticalLines: false,
      horizontalLines: true,
      labelMargin: 6 
     }
    },

    pie: {
      fontSize: 9,
      HtmlText : false,
      shadowSize: 0,
      colors: ['#FF6600', '#FE9900', '#D1D0CE', '#777777', '#9C309D', '#F34300', '#FFCC00'],
      xaxis : { showLabels : false },
      yaxis : { showLabels : false },
      pie : {	
        show : true,
        explode : 2,
        fillOpacity: 1,
        sizeRatio: 0.7,
        labelFormatter: function(total,value) { if (value/total>0.01) return (value/total*100).toFixed(1)+"%"; },
        fontColor: '#000000',
        fontSize: 8
      },
      mouse : {
        track : true, 
        relative:true,
        lineColor: '#FFFFFF',
        trackFormatter: function(v) { return v.series.label; }
      },
      legend : {
        position : 'nw',
        backgroundColor : '#fff',
        labelBoxMargin: 11
      },
      grid: {
        outlineWidth: 0,
        verticalLines: false,
        horizontalLines: false,
        color: '#000000'
      }
    },
    
    bar_pdf: {
      HtmlText: false,
      resolution: 1, 
      fontSize: 40,
      fontColor: '#000000',
      markers: {
        fontSize: 40,
        show: true,
        position: 'ca',
        labelFormatter: function (o) { return o.y+''; },
      color: '#111111',
      verticalMargin: 40
      },
      xaxis: {
        showLabels: true,
        tickDecimals: 0,
        color: '#000000'
      },
      yaxis: {
        showLabels: false,
        autoscale: true, 
        autoscaleMargin: 1,
        ticks: [0]
      },
      grid : {
        color: '#D2D0CE',
        tickColor: '#D2D0CE',
        outlineWidth: 4,
      outline : 's',
        verticalLines: false,
        horizontalLines: true,
        labelMargin: 40 
      }
    },

    pie_pdf: 
    {
      fontSize: 45,
      HtmlText : false,
      shadowSize: 0,
      colors: ['#FF6600', '#FE9900', '#D1D0CE', '#777777', '#9C309D', '#F34300', '#FFCC00'],
      xaxis : { showLabels : false },
      yaxis : { showLabels : false },
      pie : {	
        show : true,
        explode : 0,
        fillOpacity: 1,
        sizeRatio: 0.7,
        labelFormatter: function(total,value) { if (value/total>0.01) return (value/total*100).toFixed(1)+"%"; },
        fontColor: '#000000',
        fontSize: 35
      },
      mouse : {
        track : false, 
        lineColor: 'transparent'
      },
      legend : {
        position : 'ne',
        backgroundColor : 'transparent',
        labelBoxBorderColor : 'transparent',
        labelBoxOpacity: 0,
        backgroundOpacity: 0,
        labelBoxWidth: 60,
        labelBoxHeight: 60,
        labelBoxMargin: 5,
        margin: 0
      },
      grid: {
        outlineWidth: 0,
        verticalLines: false,
        horizontalLines: false,
        color: '#000000'
      }
    }    
  
  };
  return chart_settings;
}




function clc_getChartList() 
{
  var chart_list = {
        
    1: {
      id:     "Clc-Chart-Ienakumi",
      data:   getChartData_Ienakumi(),
      type:   'pie'
    },
    
    2: {
      id:     "Clc-Chart-Izdevumi",
      data:   getChartData_Izdevumi(),
      type:   'pie'
    },
    
    3: {
      id:     "Clc-Chart-EBITDA1",
      data:   getChartData_fields('#Clc-rentab_pelna_%YEAR%_D66'),
      type:   'bar'
    },    
    
    4: {
      id:     "Clc-Chart-EBITDA2",
      data:   getChartData_fields('#Clc-rentab_plusma_%YEAR%_D75'),
      type:   'bar'
    },
    
    5: {
      id:     "Clc-Chart-DSCR2",
      data:   getChartData_fields('#Clc-anal_anal1_%YEAR%_D102'),
      type:   'bar'
    },    
    
    6: {
      id:     "Clc-Chart-DeptEBITDA2",
      data:   getChartData_fields('#Clc-anal_anal1_%YEAR%_D104'),
      type:   'bar'
    },
    
    7: {
      id:     "Clc-Chart-Izlaukims",
      data:   getChartData_fields('#Clc-ienem_lopkopiba_%YEAR%_D28'),
      type:   'bar'
    },    
    
    8: {
      id:     "Clc-Chart-Paspaterins",
      data:   getChartData_fields('#Clc-ienem_lopkopiba_%YEAR%_D29'),
      type:   'bar'
    },  

    9: {
      id:     "Clc-Chart-Plusma",
      data:   getChartData_fields('#Clc-rentab_plusma_%YEAR%_D75'),
      type:   'bar'
    },
    
    10: {
      id:     "Clc-Chart-Piens",
      data:   getChartData_cenas('lopkopiba'),
      type:   'bar'
    },    
    
    11: {
      id:     "Clc-Chart-Augi1",
      data:   getChartData_cenas('augkopiba1'),
      type:   'bar'
    },

    12: {
      id:     "Clc-Chart-Augi2",
      data:   getChartData_cenas('augkopiba2'),
      type:   'bar'
    }   

  };  
  return chart_list;
}




function getChartData_Ienakumi() 
{
  var labels = {
    piens:      'Piens',
    augkopiba1: 'Kvieši',
    augkopiba2: 'Rapsis',
    augkopiba3: 'Citi augi',
    citiAug:    'Citi graudkopības ieņēmumi',
    citi:       'Citi ieņēmumi',
    empty:      'Nav'
  };
  
  // recieve all possible values
  var ienakumu_data = [ 
    { 
      data: clcDatiByDom($('#Clc-ienem_lopkopiba_'+last_full_year+'_D34')),    
      label: labels.piens,
      test: clcNozareFlag('lopkopiba')
    },
    { 
      data: clcDatiByDom($('#Clc-ienem_augkopiba1_'+last_full_year+'_D24')),   
      label: labels.augkopiba1,
      test: clcNozareFlag('augkopiba1')
    },
    { 
      data: clcDatiByDom($('#Clc-ienem_augkopiba2_'+last_full_year+'_D24')),   
      label: labels.augkopiba2,
      test: clcNozareFlag('augkopiba2')
    },
    { 
      data: clcDatiByDom($('#Clc-ienem_augkopiba3_'+last_full_year+'_D24')),   
      label: labels.augkopiba3,
      test: clcNozareFlag('augkopiba3')
    },
    { 
      data: clcDatiByDom($('#Clc-ienem_citi_'+last_full_year+'_D23')),   
      label: labels.citiAug,
      test: ( clcNozareFlag('augkopiba1') || clcNozareFlag('augkopiba2') || clcNozareFlag('augkopiba3') )
    },    
    { 
      data: clcDatiByDom($('#Clc-ienem_citi_'+last_full_year+'_D36')) + clcDatiByDom($('#Clc-ienem_citi_'+last_full_year+'_D37')),
      label: labels.citi,
      test: true
    }
  ];

  // collect non-empty values
  var filtered_data = [];
  for( var t in ienakumu_data ) 
    if( ienakumu_data[t].data > 0 && ienakumu_data[t].test ) 
    {
      var fElement = [[0, ienakumu_data[t].data]];
      filtered_data.push({ data: fElement, label: ienakumu_data[t].label });
    }
    
  // if all values are empty set 'empty row'
  if( !filtered_data.length ) filtered_data = [{ data:[[0,100]], label: labels.empty }];

  return filtered_data;
}




function getChartData_Izdevumi() 
{
  var labels = {
    citi:       "Citi izdevumi",
    dividents:  "Izmaksātās Dividendes",
    empty:      "Nav"
  };
  var li_val = [];
  var li_lab = [];
  var num = 0;
  
  for (var t in Data_Izdevumi) 
  {
    var current_nozare = Data_Izdevumi[t];
    for (var t2 in current_nozare.fields) 
    {
      if( current_nozare.fields[t2].total == "yes" ) 
      {
        li_val[num] = clcDatiByDom($('#Clc-izdev_' + current_nozare.id + '_' + last_full_year + '_' + current_nozare.fields[t2].field));
        li_lab[num] = current_nozare.fields[t2].label;
        num++;
      }
    }  
  }
 
  // Values
  var five_dat = [];
  
  // 5 best
  var Key;
  var vMax;
  for(var t=0; t<5; t++){
    if ( li_val.length ) 
    {
      vMax = 0;
      Key = 0;
      for(var t2=0; t2<li_val.length; t2++) if(li_val[t2]>vMax) { vMax = li_val[t2]; Key = t2; }
      if( vMax ) 
      {
        five_dat.push({
          data:   li_val[Key],
          label:  li_lab[Key]
        });  
        li_val.splice(Key,1);
        li_lab.splice(Key,1);        
      }
    }
  } 
  
  // citi
  var sum = 0;
  for(var t = 0; t < li_val.length; t++) sum = sum + li_val[t] * 1;
  
  five_dat.push({
    data:   sum,
    label:  labels.citi
  });  
  
  // dividenti
  five_dat.push({
    data:   clcDati('D74', last_full_year),
    label:  labels.dividents
  }); 
      
  // collect non-empty values
  var filtered = [];
  var fElement;
  for( var t in five_dat ) if( five_dat[t].data != 0 ) {
    fElement = [[0, five_dat[t].data]];
    filtered.push({ data: fElement, label: five_dat[t].label });
  }
  
  // if all values are empty set 'empty row'
  if( !filtered.length ) filtered = [{ data:[[0,100]], label: labels.empty }];

  return filtered;
}




function getChartData_fields(field) 
{

  var d1 = {
    data: [],
    bars: 
    {
      show : true,
      shadowSize : 0,
      barWidth : 0.95,
      lineWidth: 0,
      fillColor: '#FF6600',
      fillOpacity: 1.0
    }
  };
  
  var d2 = {
    data: [],
    bars : 
    {
      show : true,
      shadowSize : 0,
      barWidth : 0.95,
      lineWidth: 0,
      fillColor: '#D1D0CE',
      fillOpacity: 1.0
    }
  };
  
  for( var t = 0; t < collumn_years.length; t++ ) 
  {
    if( clcYear(t) )
    {
      var tval = [collumn_years[t], clcDatiByDom( $( field.replace('%YEAR%',collumn_years[t]) ))];
      if( t < 3)    d1.data.push(tval); // past years
      else          d2.data.push(tval); // next years
    }
  } 
  
  var result = [d1,d2];
  return result;

}



function getChartData_cenas(nozare) 
{
  
  var line = {
    data: [],
    lines: 
    {
      show: true,
      color: '#777777',
      fill: false,
      shadowSize: 1,
      lineWidth: clcFlotrSettings[clcFlotrView].lineWidth
    },
	  markers: 
    {
      show:false
	  }
  };
  
  var d1 = {
    data: [],
    bars: 
    {
      show : true,
      shadowSize : 0,
      barWidth : 0.95,
      lineWidth: 0,
      fillColor: '#FF6600',
      fillOpacity: 1.0
    }
  };
  
  var d2 = {
    data: [],
    bars : 
    {
      show : true,
      shadowSize : 0,
      barWidth : 0.95,
      lineWidth: 0,
      fillColor: '#D1D0CE',
      fillOpacity: 1.0
    }
  };
  
  var tval;

  // get data from form
  for( var yi in collumn_years ) 
    if(clcYear(yi)) 
    {
      switch(nozare){
        case 'lopkopiba':   tval = clcDati("D30",yi); break;
        case 'augkopiba1':  tval = clcDati("D18",yi,nozare); break;
        case 'augkopiba2':  tval = clcDati("D18",yi,nozare); break;
      } 
      if( yi < 3 )  d1.data.push([parseInt(collumn_years[yi]),tval]); // past years
      else          d2.data.push([parseInt(collumn_years[yi]),tval]); // next years
    }
    
  // load history data
  var source;
  switch(nozare){
    case 'lopkopiba':
      source = Data_Cenas_Piens;
      break;
    case 'augkopiba1':
    case 'augkopiba2':
    case 'augkopiba3':
      source = Data_Cenas_Augi;
      break;      
  }    
  for( var yi in source ) 
    for( var mi in source[yi] )       
      if( parseInt(yi.replace('year','')) >=  collumn_years[0] && parseInt(yi.replace('year','')) < current_year ) 
      {
        var tx = parseInt(yi.replace('year','')) + ( mi / 12 );
        switch(nozare){
          case 'lopkopiba':   tval = source[yi][mi].cena; break;
          case 'augkopiba1':  tval = source[yi][mi].kviesi; break;
          case 'augkopiba2':  tval = source[yi][mi].rapsis; break;
        }         
        line.data.push([tx,tval]);
      }    
  
  var result = [ d1, d2, line ];
  return result;  

}




function clc_checkEmptyPrices(nozare)
{
  // global: collumn_years
  var summ = 0;
  for( var yi in collumn_years ) 
    if(clcYear(yi)) 
      switch(nozare){
        case 'lopkopiba':   summ += clcDati("D30",yi); break;
        case 'augkopiba1':  summ += clcDati("D18",yi,nozare); break;
        case 'augkopiba2':  summ += clcDati("D18",yi,nozare); break;
      } 
  return summ>0 ? true : false ;
}




function draw_charts() {
  //console.log(' testing draw_charts() --------------------------------');  //////////////////////////////////////////////
  var chart_settings = clc_getChartSettings();
  var chart_list = clc_getChartList();
  
  // show all containers
  $('#Clc-Chart-Cenas-hideme').show();
  $('#Clc-Chart-Piens-BLOCK').show();
  $('#Clc-Chart-Augi1-BLOCK').show();
  $('#Clc-Chart-Augi2-BLOCK').show();
  $('.Clc-charts-papildais-piens').show();
  
  // draw charts
  for(var n in chart_list) 
  {
    var graph = Flotr.draw(
      document.getElementById(chart_list[n].id),
      chart_list[n].data, 
      chart_settings[chart_list[n].type]
    );     
    //console.log( 'ID = ' + chart_list[n].id ); ///////////////////////////////////////////////////////
  }  
  
  // hide empty containers
  if( !clcNozareFlag('lopkopiba') ||  !clc_checkEmptyPrices('lopkopiba')  ) $('#Clc-Chart-Piens-BLOCK').hide();
  if( !clcNozareFlag('augkopiba1') || !clc_checkEmptyPrices('augkopiba1') ) $('#Clc-Chart-Augi1-BLOCK').hide();
  if( !clcNozareFlag('augkopiba2') || !clc_checkEmptyPrices('augkopiba2') ) $('#Clc-Chart-Augi2-BLOCK').hide();
  if( !clc_checkEmptyPrices('lopkopiba') && !clc_checkEmptyPrices('augkopiba1') && !clc_checkEmptyPrices('augkopiba2') ) 
    $('#Clc-Chart-Cenas-hideme').hide();
  if( !clcNozareFlag('lopkopiba') ) $('.Clc-charts-papildais-piens').hide();
  
  // enabled on button click
  //draw_chartsPDF();
}



function draw_chartsPDF() 
{
  //console.log(' testing draw_chartsPDF() --------------------------------');  //////////////////////////////////////////////
  clcSwitchFlotrView('pdf'); // set PDF mode
  
  var chart_settings = clc_getChartSettings();
  var chart_list = clc_getChartList();  
  
  // draw charts
  for(var n in chart_list) 
  {    
    var graph = Flotr.draw(
      document.getElementById( chart_list[n].id + '-PDF' ),
      chart_list[n].data, 
      chart_settings[ chart_list[n].type + '_pdf' ]
    );     
    //console.log( 'ID = ' + chart_list[n].id + '-PDF' ); ///////////////////////////////////////////////////////////////////
  }  
  
 clcSwitchFlotrView('screen');  // restore SCREEN mode
}