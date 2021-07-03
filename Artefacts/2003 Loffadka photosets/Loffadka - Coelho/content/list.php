
<IMG src="img/head1.jpg" border="0" alt="" /><BR />

<? include("content/_mainmenu.php");	?>

<table cellpadding=0 cellspacing=10 align=center>
<tr>

<? 
$rinda = 0;
for($t=1;$t<=$photo_count_list;$t++) {?>
	<td>
		<a href=photo.php?photo=<?=$t?>><IMG src="photos/small/<?=$t?>.jpg" class=small_photo alt="" /></a><BR />
	</td>
	<?
	$rinda++;
	if($rinda==3) {
		$rinda = 0;
		?>
		</tr>
		<tr>
		<?

	}
}
?>
</tr>
</table>