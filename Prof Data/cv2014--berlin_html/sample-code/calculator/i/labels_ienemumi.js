var Labels_Ienemumi = '{' +
'"data": [' +

'{' +
  ' "id":         "platiba",' +
  ' "hideyears":  "yes",' +
  ' "caption":    "Apsaimniekojamā zeme, LIZ, ha (īpašumā + nomā):",' +
  ' "inputcaption": "0"' + 
'},' +

'{' +
  ' "id":         "lopkopiba",' +
  ' "type":       "hidenned",' +
  ' "caption":    "Piena lopkopība",' +
  ' "fields":     [' +
    '{  "field":"D26",  "label":"Realizētais piens, kg", "clas":"futurecalc" },' + 
    '{ "field":"D27" ,  "label":"Slaucamo govju skaits", "clas":"input" },' +  
    '{ "field":"D28" ,  "label":"Vidējais izslaukums, kg", "clas":"input" },' + 
    '{ "field":"D29" ,  "label":"Piena pašpatēriņš, %", "clas":"futureinput", "format":"format2" },' +
    '{ "field":"D30" ,  "label":"Vidējā piena cena, Ls/kg", "clas":"futureinput", "format":"format3" },' + 
    '{ "field":"D31" ,  "label":"Piena realizācija, Ls", "clas":"futurecalc" },' +
    '{ "field":"D32" ,  "label":"Realizētie lopi, Ls", "clas":"input" },' + 
    '{ "field":"D34" ,  "label":"Piena Lopkopība — ieņēmumi kopā", "clas":"calc", "total":"yes", "footer":"yes" }' + 
    ' ]' + 
'},' +

'{' +
  ' "id":         "augkopiba1",' +
  ' "type":       "hidenned",' +  
  ' "caption":    "Augkopība: Kvieši",' +
  ' "fields":     [' +
    '{ "field":"D13" ,  "label":"Platība, ha", "clas":"input" },' + 
    '{ "field":"D14" ,  "label":"Ražība, t/ha", "clas":"futureinput", "format":"format2" },' +  
    '{ "field":"D15" ,  "label":"Saražots, t", "clas":"input" },' + 
    '{ "field":"D16" ,  "label":"Pašpatēriņš (t.sk. sēkla), t", "clas":"input" },' +
    '{ "field":"D17" ,  "label":"Realizācija, t", "clas":"calc" },' + 
    '{ "field":"D18" ,  "label":"Realizācijas cena, Ls/t", "clas":"input" },' +
    '{ "field":"D19" ,  "label":"Kvieši-ieņēmumi, Ls", "clas":"calc" },' + 
    '{ "field":"D20" ,  "label":"Pirmsapstrāde, t", "clas":"input" },' +
    '{ "field":"D21" ,  "label":"Cena, Ls/t", "clas":"input" },' +
    '{ "field":"D22" ,  "label":"Pirmapstrāde, ieņēmumi, Ls", "clas":"calc" },' +
    '{ "field":"D24" ,  "label":"Kvieši - ieņēmumi kopā", "clas":"calc", "total":"yes", "footer":"yes" }' +
    ' ]' + 
'},' +

'{' +
  ' "id":         "augkopiba2",' +
  ' "type":       "hidenned",' +  
  ' "caption":    "Augkopība: Rapsis",' +
  ' "fields":     [' +
    '{ "field":"D13" ,  "label":"Platība, ha", "clas":"input" },' + 
    '{ "field":"D14" ,  "label":"Ražība, t/ha", "clas":"futureinput", "format":"format2" },' +  
    '{ "field":"D15" ,  "label":"Saražots, t", "clas":"input" },' + 
    '{ "field":"D16" ,  "label":"Pašpatēriņš (t.sk. sēkla), t", "clas":"input" },' +
    '{ "field":"D17" ,  "label":"Realizācija, t", "clas":"calc" },' + 
    '{ "field":"D18" ,  "label":"Realizācijas cena, Ls/t", "clas":"input" },' +
    '{ "field":"D19" ,  "label":"Rapsis-ieņēmumi, Ls", "clas":"calc" },' + 
    '{ "field":"D20" ,  "label":"Pirmsapstrāde, t", "clas":"input" },' +
    '{ "field":"D21" ,  "label":"Cena, Ls/t", "clas":"input" },' +
    '{ "field":"D22" ,  "label":"Pirmapstrāde, ieņēmumi, Ls", "clas":"calc" },' +
    '{ "field":"D24" ,  "label":"Rapsis - ieņēmumi kopā", "clas":"calc", "total":"yes", "footer":"yes" }' +
    ' ]' + 
'},' +

'{' +
  ' "id":         "augkopiba3",' +
  ' "type":       "hidenned",' +  
  ' "caption":    "Augkopība:",' +
  ' "inputcaption":    "Citi",' +
  ' "fields":     [' +
    '{ "field":"D13" ,  "label":"Platība, ha", "clas":"input" },' + 
    '{ "field":"D14" ,  "label":"Ražība, t/ha", "clas":"futureinput", "format":"format2" },' +  
    '{ "field":"D15" ,  "label":"Saražots, t", "clas":"input" },' + 
    '{ "field":"D16" ,  "label":"Pašpatēriņš (t.sk. sēkla), t", "clas":"input" },' +
    '{ "field":"D17" ,  "label":"Realizācija, t", "clas":"calc" },' + 
    '{ "field":"D18" ,  "label":"Realizācijas cena, Ls/t", "clas":"input" },' +
    '{ "field":"D19" ,  "label":"Citi-ieņēmumi, Ls", "clas":"calc" },' + 
    '{ "field":"D20" ,  "label":"Pirmsapstrāde, t", "clas":"input" },' +
    '{ "field":"D21" ,  "label":"Cena, Ls/t", "clas":"input" },' +
    '{ "field":"D22" ,  "label":"Pirmapstrāde, ieņēmumi, Ls", "clas":"calc" },' +
    '{ "field":"D24" ,  "label":"Citi graudi - ieņēmumi kopā", "clas":"calc", "total":"yes", "footer":"yes" }' +
    ' ]' + 
'},' +

'{' +
  ' "id":         "citi",' +
  ' "caption":    "Citi ieņēmumi",' +
  ' "fields":     [' +
    '{ "field":"D23" ,  "label":"Citi graudkopības ieņēmumi, Ls", "clas":"input", "total":"yes", "if":"augkopiba" },' +    
    '{ "field":"D36" ,  "label":"Citi ieņēmumi (norādīt kādi)", "clas":"input", "total":"yes", "textlabel":"yes" },' + 
    '{ "field":"D37" ,  "label":"Citi ieņēmumi (norādīt kādi)", "clas":"input", "total":"yes", "textlabel":"yes" }' +  
    ' ]' + 
'},' +

'{' +
  ' "id":         "total",' +
  ' "caption":    "",' +
  ' "hideyears":  "yes",' +
  ' "fields":     [' +
    '{ "field":"TOTAL" ,          "label":"Visi ieņēmumi kopā", "clas":"calc", "footer":"yes" }' + 
    ' ]' + 
'}' +

' ]' +
'}';
