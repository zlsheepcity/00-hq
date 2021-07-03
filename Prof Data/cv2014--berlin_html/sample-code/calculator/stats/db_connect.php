<?php
// ************************************************************ 
// db_connect.php
// set connection to database and define the mySql table name
// ************************************************************



/* mySql connection */  
	$connection_id = mysql_connect("localhost", "root", "") or die(mysql_error()); // HOST, LOGIN, PASS
	$select_db = mysql_select_db("clcCalculatorData", $connection_id) or die(mysql_error()); // DATABASE NAME
  $charset = mysql_query("SET NAMES 'utf8'");
  $table_name = "clcCalculatorData";

  
/* mySql table format */
/*

CREATE TABLE IF NOT EXISTS `clcCalculatorData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clcType` varchar(20) NOT NULL,
  `clcValue` text NOT NULL,
  `clcID` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

*/


/* insert function */
  function clc_insert($clcType, $clcValue, $clcID) 
  {
    global $table_name;
    mysql_query("INSERT INTO `$table_name` (`clcType`, `clcValue`, `clcID`) VALUES ('$clcType', '$clcValue', '$clcID');") or die(mysql_error());
  }
  
/* receive function */  
  function clc_get()
  {
    global $table_name;
    return mysql_query("SELECT * FROM `$table_name`;");
  }
?>