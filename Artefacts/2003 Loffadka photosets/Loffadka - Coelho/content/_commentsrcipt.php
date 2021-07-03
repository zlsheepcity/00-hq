<?
$monthname2['01'] = "Января";
$monthname2['02'] = "Февраля";
$monthname2['03'] = "Марта";
$monthname2['04'] = "Апреля";
$monthname2['05'] = "Мая";
$monthname2['06'] = "Июня";
$monthname2['07'] = "Июля";
$monthname2['08'] = "Августа";
$monthname2['09'] = "Сентября";
$monthname2['10'] = "Октября";
$monthname2['11'] = "Ноября";
$monthname2['12'] = "Декабря";

include("content/_dbconnect.php");

if($addcomment) {

	$text = strip_tags($text);
	$text = chop($text); // delete end symbols
	$text = ltrim($text); // delete start symbols
	$text = str_replace("\n", "<br>\n", $text);		//replace \n to <br>
	$text = str_replace("\'", "`", $text);			//replace ' quotes
	$text = str_replace("\"", "&quot;", $text);		//replace " quotes

	$name = strip_tags($name);
	$name = chop($name); // delete end symbols
	$name = ltrim($name); // delete start symbols
	$name = str_replace("\n", "<br>\n", $name);		//replace \n to <br>
	$name = str_replace("\'", "`", $name);			//replace ' quotes
	$name = str_replace("\"", "&quot;", $name);		//replace " quotes

	$date1 = explode(".", date("H.i.d.m.Y"));
	$date2 = $date1[2] . " " . $monthname2[$date1[3]] . ", " . $date1[4] . ", " . $date1[0] . ":" . $date1[1];

	$sql_zapros = 'INSERT INTO coelho_comments (name, text, datetime, ip) values ("' . $name . '", "' . $text .'", "' . $date2 . '", "' . $ip . '");';
	$sql_result = mysql_query($sql_zapros) or die(mysql_error());

	$mail_header="From: LiPage\nReply-To: ";
	$mail_header.="LiPage <lipa@elkor.lv>";
	$mail_header.="\nContent-Type: text/html; charset=windows-1251";
	$mail_body = "<b>New comment for <A href=http://www.foto.elkor.lv/lipa/coelho/comment.php>Forget Coelho</a></b><br>";
	$mail_body .= "Name: " . $name . "<br>";
	$mail_body .= "Text: " . $text . "<br>";

	mail("lipa@elkor.lv", "LiPage: new comment", $mail_body, $mail_header);

	header("Location: comment.php");
}
?>