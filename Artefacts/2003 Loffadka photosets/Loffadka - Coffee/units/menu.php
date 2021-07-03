<?
$link_cover = "обложка";
$link_photos = "фотографии";
$link_list = "индекс";
$link_about = "информация";
$link_comments = "отзывы";

if($page=="cover") $link1 = '<span class="nolink">' . $link_cover . '</span>';
	else $link1 = '<a href="./">' . $link_cover . '</a>';

if($page=="photos") $link2 = '<span class="nolink">' . $link_photos . '</span>';
	else $link2 = '<a href="photos.php">' . $link_photos . '</a>';

if($page=="list") $link3 = '<span class="nolink">' . $link_list . '</span>';
	else $link3 = '<a href="list.php">' . $link_list . '</a>';

if($page=="about") $link4 = '<span class="nolink">' . $link_about . '</span>';
	else $link4 = '<a href="about.php">' . $link_about . '</a>';

if($page=="comments") $link5 = '<span class="nolink">' . $link_comments . '</span>';
	else $link5 = '<a href="comments.php">' . $link_comments . '</a>';

?>


<?=$link1?> | <?=$link2?> | <?=$link3?> | <?=$link4?> | <?=$link5?> 