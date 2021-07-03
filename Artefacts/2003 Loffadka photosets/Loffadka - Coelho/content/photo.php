<?

if(!$photo) $photo = "1";

$p1 = $photo - 1;
$p2 = $photo + 1;
?>

<IMG src="img/head1.jpg" border="0" alt="" /><BR />

<? include("content/_mainmenu.php");	?>

<p class=photo>
	<?if($photo<$photo_count_gallery){?><A href=photo.php?photo=<?=$p2?>><?}?>
	<IMG src="photos/<?=$photo?>.jpg" class=large_photo alt="" /><BR />
	<?if($photo<$photo_count_gallery){?></a><?}?>
	
	<?if($photo>1){?><A href=photo.php?photo=<?=$p1?>>prev</a><?} else {?>prev<?}?>
	| 
	<?if($photo<$photo_count_gallery){?><A href=photo.php?photo=<?=$p2?>>next</a><?} else {?>next<?}?>

</p>