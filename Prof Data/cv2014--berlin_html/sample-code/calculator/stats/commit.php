<?php

// ************************************************************ 
// commit.php
// recieve two strings from POST and insert values into databse
// uses db_connect.php for connection with database
//
// POST:
// - clcType
// - clcValue
//
// SESSION ID
// - clcID
//
// VALUE EXAMPLES:
// clcType = 'initialization'
// clcValue = '{ "date":"2012-05-10 13:56", "values": { "years": {"1":"2011","2":"2012"}, "nozares":{"1":"lopkopiba","2":"augkopiba1"} } }'
// clcID = ''
//
// SQL COMMAND:
// INSERT INTO `$table_name` (`clcType`, `clcValue`) VALUES ('$dataReqType', '$dataReqValue');
//
// ************************************************************

/* start session */
  $a = session_id();
  if(empty($a)) session_start();

/* recieve and check post-strings */
  $dataReqType = $_REQUEST["clcType"]; 
    if(!in_array($dataReqType,array('onload', 'initialization', 'analize'))) die();

  $dataReqValue = $_REQUEST["clcValue"];
    if( json_decode($dataReqValue) == NULL ) die();
  
  $dataSession = session_id();
  
/* mySql connection */  
  require("db_connect.php");

  
/* mySql Insert */
  clc_insert($dataReqType, addslashes($dataReqValue), $dataSession);
  

/* mySql close connection */
  mysql_close($connection_id);

?>