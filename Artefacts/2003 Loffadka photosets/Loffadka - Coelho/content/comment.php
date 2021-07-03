<IMG src="img/head2.jpg" border="0" alt="" /><BR />

<? include("content/_mainmenu.php");	?>

<?
$sql_zapros = 'SELECT * FROM coelho_comments ORDER BY id DESC;';
$sql_result = mysql_query($sql_zapros) or die(mysql_error());
$t = mysql_num_rows($sql_result);

if($t == 0) {?>
	<p class=comment_text>Нет комментариев.</p>
	<?}
while ($sql_data = mysql_fetch_array($sql_result)) {

?>

<p class=comment_name>
<?=$t?>. <?=$sql_data['name']?>
</p>
<p class=comment_text>
<?=$sql_data['text']?>
</p>
<p class=comment_date> 
<?=$sql_data['datetime']?>
</p>
<?
	$t--;
} // while
?>

<br>

<FORM name="frmX" method="post" enctype="multipart/form-data" action="">
	<input type="hidden" name=addcomment value="1">
	<input type="hidden" name=ip value="<?=$REMOTE_ADDR?>">
<p class=maintext2><b>Добавить комментарий:</b><br>
	<input type="text" name="name" onfocus="this.select();" value="Имя" maxlength=30><br>
	<textarea name="text" onfocus="this.select();">Комментарий</textarea><br>
	<input type="submit" class=submit value="Добавить"><br>
</p>
</FORM>