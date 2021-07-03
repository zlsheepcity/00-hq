<html>
<?	

$page_title = "Нерастворимый Кофе. Все фотографии.";
$page = "list";

include("units/photo_info.php");

include("units/head.php"); 

?>
<body>

<? include("units/top.php"); ?>


<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td>
		    
			<p class="photo_list">
				<? 
					for($t=1;$t<=$photos_count;$t++) {
						if($t<10) $photo_link = "0" . $t; 
							else $photo_link = $t;
						
						print '<A href="photos.php?cup=' . $photo_link . '">';
						print '<img src="' . $photos_thumb_dir . 'cofee' . $photo_link . '.jpg" alt="" class="photo_thumb" border="1" />';
						print '</a>';
						
						if(($t==4)||($t==8)||($t==12)||($t==16)||($t==20)) print "<br />";
						}	
				?>
			</p>

		</td>
	</tr>
</table>



<? include("units/bottom.php"); ?>

</body>

</html>