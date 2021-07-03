<?

include ("units/_dbconnect.php");

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

if($addcomment) {
	if(($text!="")&&($name!="")) {

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

		$sql_zapros = 'INSERT INTO cofee_comments (name, text, datetime, ip) values ("' . $name . '", "' . $text .'", "' . $date2 . '", "' . $ip . '");';
		$sql_result = mysql_query($sql_zapros) or die(mysql_error());

		$mail_header="From: LiPage\nReply-To: ";
		$mail_header.="LiPage <lipa@elkor.lv>";
		$mail_header.="\nContent-Type: text/html; charset=windows-1251";
		$mail_body = "<b>New comment for <A href=http://www.foto.elkor.lv/lipa/cofee/comments.php>Cofee</a></b><br>";
		$mail_body .= "Name: " . $name . "<br>";
		$mail_body .= "Text: " . $text . "<br>";

		mail("lipa@elkor.lv", "Cofee: new comment", $mail_body, $mail_header);

		header("Location: comments.php");
	
	}
}


?>

<html>
<?
$page_title = "Нерастворимый Кофе. Отзывы.";
$page = "comments";

include("units/head.php"); 

?>
<body>

<? include("units/top.php"); ?>


<table width="625px" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;">
	<tr>

		<td width="35px">
		</td>

		<td width="190px" align="left" valign="top">
			<img src="comment.jpg" alt="" class="photo_thumb" /><br />
		</td>

		<td width="400px" align="left" valign="top">

			<h3 class="text">Написать отзыв</h3>
			<FORM name="frmX" class="comment" method="post" enctype="multipart/form-data" action="">
				<input type="hidden" name="addcomment" value="1">
				<input type="hidden" name="ip" value="<?=$REMOTE_ADDR?>">
				
				<table width="350px" cellspacing="0" cellpadding="0" border="0">
					<tr>
						<td width="100px" valign="center" class="formtext">
							(имя)
						</td>
						<td width="250px" valign="top">
							<input type="text" name="name" value="" maxlength="30" style="width:250px;">
						</td>
					</tr>
					<tr>
						<td width="100px" valign="top" class="formtext">
							(отзыв)
						</td>
						<td width="250px" valign="top">
							<textarea name="text"  style="width:250px;height:80px;"></textarea>
						</td>
					</tr>
					<tr>
						<td width="100px" valign="top" class="formtext">
							&nbsp;
						</td>
						<td width="250px" valign="top">
							<input type="submit" class="submit" value="Написать" style="width:150px;">
						</td>
					</tr>
				</table>

				
			</p>
			</FORM>

			<h2 class="text"><img src="g.gif" width="380px" height="1px" alt="" /></h2>
			

<?
$sql_zapros = 'SELECT * FROM cofee_comments ORDER BY id DESC;';
$sql_result = mysql_query($sql_zapros) or die(mysql_error());
$t = mysql_num_rows($sql_result);

while ($sql_data = mysql_fetch_array($sql_result)) {

?>

<p class="comment_name">
<b>[<?=$t?>]</b> <?=$sql_data['name']?>
</p>
<p class="comment_text">
<?=$sql_data['text']?>
</p>
<p class="comment_date">
<?=$sql_data['datetime']?>
</p>
<?
	$t--;
} // while
?>


		</td>


	</tr>
</table>

<? include("units/bottom.php"); ?>

</body>

</html>