<?php
// ************************************************************ 
// get.php
// select data from DB and create a javascript content
// ************************************************************


/* mySql connection */    
  require("db_connect.php");


/* mySql select all rows */  
  $db_data = clc_get();

  
/* create javascript code */
  $rowFormat = '"%s": {"type":"%s","value":%s, "ssid":"%s"}';
  $firstRecord = true;
  
  echo "var Database_Values = {";
  echo "\n";
  
  while($db_row = mysql_fetch_array($db_data))
  {
    if(!$firstRecord) echo ","; $firstRecord = false;
    echo sprintf($rowFormat, $db_row['id'], $db_row['clcType'], $db_row['clcValue'], $db_row['clcID']);
    echo "\n";
  }  
  
  echo "};";

?>