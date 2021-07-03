<?
Header("Content-type: text/vnd.wap.wml");

$poseCN=5;
$poses[1]='Anal';
$poses[2]='69';
$poses[3]='Fuck Dog';
$poses[4]='Whack It';
$poses[5]='Missionary';

?>

<wml>
<card id="main" title="P96: Poses">
<do type="prev" label="Back">
	<go href="main.php" />
</do>
<p>Sex poses:</p>
<p>
<? for($t=1;$t<=$poseCN;$t++) print '<a href="#Poza'.$t.'">'.$poses[$t].'</a><br/>'; ?>
<br/>
<a href="main.php">P96: Main</a></p>
</card>
<?
for($t=1;$t<=$poseCN;$t++) {
	print '<card id="Poza'.$t.'" title="'.$poses[$t].'">';
	print '<do type="prev" label="Back"><prev/></do>';
	print '<p><img src="i/poza'.$t.'.wbmp" alt="loading .. "/></p>';
	print '</card>';

}// for
?>


</wml>