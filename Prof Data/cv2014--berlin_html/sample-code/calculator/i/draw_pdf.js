function clcChartsToJson()
{

  //console.log('begin charts to json'); //////////////////////////////////////////////////////////////////////
  
  var json = {};
  var hide = false;
  var connectionTable = {
    Piens: 'lopkopiba',
    Augi1: 'augkopiba1',
    Augi2: 'augkopiba2'
  };  
  
  $('#Clc-Charts-for-PDF .flotr-canvas').each( function(i){
    var id  = $(this).parent().attr("id").replace('-PDF','');
    var name = id.replace('Clc-Chart-','');
    var canvasObject;
    if( $.browser.msie && ( parseInt($.browser.version, 10) === 7 || parseInt($.browser.version, 10) === 8 ) ) 
    {
      var canvasPreObject = document.getElementById( $(this).parent().attr("id") ).getElementsByTagName('canvas');
      canvasObject = canvasPreObject[0]; 
    }    
    else canvasObject = this;
    var src = typeof canvasObject.toDataURL === 'function' ? canvasObject.toDataURL("image/png") : 'error';
    if( src == 'error' ) json['error'] = 'yes';
    
    json[name] = {
      txt:  $('#'+id).attr("rel"),
      id:   name,  
      src:  src
    };
    //console.log('ID = ' + $(this).parent().attr("id") ); /////////////////////////////////////////////////////////
    //console.log('src = ' + src );/////////////////////////////////////////////////////////////////////////////////
    
    // check visibility
    if( connectionTable[name] )
      if( !clcNozareFlag(connectionTable[name]) || !clc_checkEmptyPrices(connectionTable[name]) )
        json[name]['hide'] = 'yes';
    
  });
   
  return $.toJSON( json );
}

function clcParamsToJson()
{
  var years = {};
  for( var y in collumn_years ) 
    if(clcYear(y)) years[collumn_years[y]] = collumn_years[y];
  
  var json = {
    years:      years,
    mainyear:   last_full_year,
    nozares:    {
      lopkopiba:  clcNozareFlag('lopkopiba')  ? "yes" : "no", 
      augkopiba1: clcNozareFlag('augkopiba1') ? "yes" : "no", 
      augkopiba2: clcNozareFlag('augkopiba2') ? "yes" : "no", 
      augkopiba3: clcNozareFlag('augkopiba3') ? "yes" : "no"
    }
  };
  
  return $.toJSON( json );
}

function clcFormToJson()
{
  // define years
  var years = [];
  for(var y in collumn_years) if(clcYear(y)) years.push(collumn_years[y]);  
  
  var dataSource;
  var jNozareData, jFieldData;
  var jNozareValue, jEachYear;
  var nozare, row, allYearsValues, val, labels;
  
  var j = '{';
  
  // define format
  var jfBlock = '' + 
    '"%BLOCKID%":' +
    '{' + 
      '"block":"%NOZARE%", ' +
      '"data":%DATA%' +
      '%LABELS%' +
    '}';
  var jfRow = '"%ROWID%":{ "code":"%CODE%", "years":{%YEARS%} %LABELS% }';
  var jfYear = '"%YEAR%":"%VAL%"';
  var jfNozareLabels = ', "caption":"%CAPTION%"';
  
  
  // Insert ienemumi
  j += '"ienemumi":{"name":"ienemumi", "val":{';
  dataSource = Data_Ienemumi;
  for(var n in dataSource)
  {
    nozare = dataSource[n].id;
    labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(dataSource[n].caption));
    jNozareData = jfBlock.replace('%BLOCKID%', nozare).replace('%NOZARE%', nozare).replace('%LABELS%',labels);
    if( $.inArray(nozare, ["lopkopiba", "augkopiba1", "augkopiba2", "augkopiba3"]) != -1 && !clcNozareFlag(nozare) )
    {
      jNozareData = jNozareData.replace('%DATA%', '"none"');
    }    
    else if( nozare == 'platiba' )
    {
      val = '"platiba", "value":"%VAL%"'.replace('%VAL%', $('#Clc-ienem_platiba_inputcaption').val());
      jNozareData = jNozareData.replace('%DATA%', val);
    }
    else
    {
      jFieldData = '{'
      for( var t in dataSource[n].fields )
      {
        row = dataSource[n].fields[t];
        allYearsValues = '';
        for( var y in years )
        {
          switch(nozare)
          {
            case "total":
              val = clcSkaistiDati(row.field,years[y],'ienem');
              break;
            default:
              val = clcSkaistiDati(row.field,years[y],nozare);
          }
          if( val == '' ) val = '0';
          allYearsValues += ( y>0 ? ', ' : '' ) + jfYear.replace('%YEAR%',years[y]).replace('%VAL%',val);
        }
        labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(row.label));
        jFieldData += ( t>0 ? ', ' : '' );
        jFieldData += jfRow.replace('%ROWID%',row.field).replace('%CODE%',row.field).replace('%YEARS%',allYearsValues).replace('%LABELS%',labels);
      }      
      jFieldData += '}';
      jNozareData = jNozareData.replace('%DATA%', jFieldData);
    }
    j += ( n>0 ? ', ' : '' ) + jNozareData;
  }  
  j += '}}';

  
  // Insert izdevumi
  j += ', ';
  j += '"izdevumi":{"name":"izdevumi", "val":{';
  dataSource = Data_Izdevumi;
  for(var n in dataSource)
  {
    nozare = dataSource[n].id;
    labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(dataSource[n].caption));
    jNozareData = jfBlock.replace('%BLOCKID%', nozare).replace('%NOZARE%', nozare).replace('%LABELS%',labels);    
    if( nozare == 'augkopiba' && !clcNozareFlag('augkopiba1') && !clcNozareFlag('augkopiba2') && !clcNozareFlag('augkopiba3') )
    {
      jNozareData = jNozareData.replace('%DATA%', '"none"');
    }    
    else if( nozare == 'lopkopiba' && !clcNozareFlag(nozare) )
    {
      jNozareData = jNozareData.replace('%DATA%', '"none"');
    }
    else
    {
      jFieldData = '{'
      for( var t in dataSource[n].fields )
      {
        row = dataSource[n].fields[t];
        allYearsValues = '';
        for( var y in years )
        {
          switch(nozare)
          {
            case "total":
              val = clcSkaistiDati(row.field,years[y],'izdev');
              break;
            default:
              val = clcSkaistiDati(row.field,years[y],nozare);
          }
          if( val == '' ) val = '0';
          allYearsValues += ( y>0 ? ', ' : '' ) + jfYear.replace('%YEAR%',years[y]).replace('%VAL%',val);
        }
        labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(row.label));
        jFieldData += ( t>0 ? ', ' : '' );
        jFieldData += jfRow.replace('%ROWID%',row.field).replace('%CODE%',row.field).replace('%YEARS%',allYearsValues).replace('%LABELS%',labels);
      }      
      jFieldData += '}';
      jNozareData = jNozareData.replace('%DATA%', jFieldData);
    }
    j += ( n>0 ? ', ' : '' ) + jNozareData;
  }  
  j += '}}';  
  
  
  
  // Insert rentabilitate
  j += ', ';
  j += '"rentabilitate":{"name":"rentabilitate", "val":{';
  dataSource = Data_Rentabilitate;
  for(var n in dataSource)
  {
    nozare = dataSource[n].id;
    labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(dataSource[n].caption));
    jNozareData = jfBlock.replace('%BLOCKID%', nozare).replace('%NOZARE%', nozare).replace('%LABELS%',labels);

      jFieldData = '{'
      for( var t in dataSource[n].fields )
      {
        row = dataSource[n].fields[t];
        allYearsValues = '';
        for( var y in years )
        {

              val = clcSkaistiDati(row.field,years[y],nozare);
          if( val == '' ) val = '0';
          allYearsValues += ( y>0 ? ', ' : '' ) + jfYear.replace('%YEAR%',years[y]).replace('%VAL%',val);
        }
        labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(row.label));
        jFieldData += ( t>0 ? ', ' : '' );
        jFieldData += jfRow.replace('%ROWID%',row.field).replace('%CODE%',row.field).replace('%YEARS%',allYearsValues).replace('%LABELS%',labels);
      }      
      jFieldData += '}';
      jNozareData = jNozareData.replace('%DATA%', jFieldData);

    j += ( n>0 ? ', ' : '' ) + jNozareData;
  }  
  j += '}}';   



  // Insert investicijas
  j += ', ';
  j += '"investicijas":{"name":"investicijas", "val":{';
  dataSource = Data_Investicijas;
  for(var n in dataSource)
  {
    nozare = dataSource[n].id;
    labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(dataSource[n].caption));
    jNozareData = jfBlock.replace('%BLOCKID%', nozare).replace('%NOZARE%', nozare).replace('%LABELS%',labels);

      jFieldData = '{'
      for( var t in dataSource[n].fields )
      {
        row = dataSource[n].fields[t];
        allYearsValues = '';
        for( var y in years )
        {

              val = clcSkaistiDati(row.field,years[y],nozare);
          if( val == '' ) val = '0';
          allYearsValues += ( y>0 ? ', ' : '' ) + jfYear.replace('%YEAR%',years[y]).replace('%VAL%',val);
        }
        labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(row.label));
        jFieldData += ( t>0 ? ', ' : '' );
        jFieldData += jfRow.replace('%ROWID%',row.field).replace('%CODE%',row.field).replace('%YEARS%',allYearsValues).replace('%LABELS%',labels);
      }      
      jFieldData += '}';
      jNozareData = jNozareData.replace('%DATA%', jFieldData);

    j += ( n>0 ? ', ' : '' ) + jNozareData;
  }  
  j += '}}';  



  // Insert analize
  j += ', ';
  j += '"analize":{"name":"analize", "val":{';
  dataSource = Data_Analize;
  for(var n in dataSource)
  {
    nozare = dataSource[n].id;
    nazareDom = 'anal1';
    labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(dataSource[n].caption));
    jNozareData = jfBlock.replace('%BLOCKID%', nozare).replace('%NOZARE%', nozare).replace('%LABELS%',labels);

      jFieldData = '{'
      for( var t in dataSource[n].fields )
      {
        row = dataSource[n].fields[t];
        allYearsValues = '';
        for( var y in years )
        {

              val = clcSkaistiDati(row.field,years[y],nazareDom);
          if( val == '' ) val = '0';
          allYearsValues += ( y>0 ? ', ' : '' ) + jfYear.replace('%YEAR%',years[y]).replace('%VAL%',val);
        }
        labels = jfNozareLabels.replace('%CAPTION%', Base64.encode(row.label));
        jFieldData += ( t>0 ? ', ' : '' );
        jFieldData += jfRow.replace('%ROWID%',row.field).replace('%CODE%',row.field).replace('%YEARS%',allYearsValues).replace('%LABELS%',labels);
      }      
      jFieldData += '}';
      jNozareData = jNozareData.replace('%DATA%', jFieldData);

    j += ( n>0 ? ', ' : '' ) + jNozareData;
  }  
  j += '}}';  
  
  
  
  
  // FINALIZE
  j += '}';
  j = j.replace(/\%LABELS\%/g, '');
  
  return j;
}