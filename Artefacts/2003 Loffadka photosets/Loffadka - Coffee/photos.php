<html>
<?	

$page_title = "Нерастворимый Кофе. Фотографии.";
$page = "photos";

////////////////////////////////////////////////
include("units/photo_info.php");


if(!isset($cup)) $cup = "01";
if(!file_exists($photos_dir . "cofee" . $cup . ".jpg")) $cup = "01"; 

$photo_prev = $cup - 1;
if($photo_prev < 10) $photo_prev = "0" . $photo_prev;
if($photo_prev =="00") $photo_prev = "";

$photo_next = $cup + 1;
if($photo_next < 10) $photo_next = "0" . $photo_next;
if($photo_next > $photos_count) $photo_next = "";


////////////////////////////////////////////////


include("units/head.php"); 

?>
<body>

<? include("units/top.php"); ?>

<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td>
			<?
				if($photo_next) $photo_link = "photos.php?cup=" . $photo_next;
					else  $photo_link = "photos.php";
			?>
			<a href="<?=$photo_link?>"><img src="<?print $photos_dir . 'cofee' . $cup . '.jpg';?>" alt="" class="photo" border="1" /></a><br />
			
			<p class="photo_info">
				&nbsp;
			</p>

			<p class="navigation_photo">
				<?if($photo_prev) {?>
					<A href="photos.php?cup=<?=$photo_prev?>">&larr; предыдущая</a>
				<?}?>
				|
				<?if($photo_next) {?>
					<A href="photos.php?cup=<?=$photo_next?>">следующая &rarr;</a>
				<?}?>
			</p>

		</td>
	</tr>
</table>


<? include("units/bottom.php"); ?>

</body>

</html>

