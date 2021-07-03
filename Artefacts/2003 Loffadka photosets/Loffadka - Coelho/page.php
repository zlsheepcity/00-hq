<?

if(!$page) $page = "cover";

$photo_count_gallery = 27;
$photo_count_list = 27;

if($page == "comment") include ("content/_commentsrcipt.php");

?>

<html>
<head> 
	<title>Забыть Коельо</title>
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
	<meta name="author" content="Lipa">
	<meta name="enjoy" content="sex, drugs, internet">
		<!-- make love not pages! -->
	
	<link rel="stylesheet" href="main.css" type="text/css">
</head>
<body>


<table width=100% cellpadding=0 cellspacing=0 border=0>
<tr>
	<td bgcolor=#000000 valign=top colspan=3>
		<IMG src="img/t.gif" width=1 height=2 border="0" alt="" /><BR />
	</td>
</tr>
<tr>
	<td width=2 bgcolor=#000000 valign=top>
		<IMG src="img/t.gif" width=3 height=1 border="0" alt="" /><BR />
	</td>
	<td width=497  valign=top>

		<?	include("content/$page.php");	?>
		


	
	</td>
	<td width=100% align=right  valign=top>
		
		<?	include("content/right.php");	?>

	</td>
</tr>
</table>



</body>
</html>