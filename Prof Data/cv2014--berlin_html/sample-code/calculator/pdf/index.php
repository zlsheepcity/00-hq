<?php

$conf = array(
	
	"pageHalf" => 115,
	"barW" => 80,
	"barH" => 60,
	"pieW" => 180,
	"pieH" => 80,  

);

// === get post data ===

$dataReqValues = $_REQUEST["values"];
$dataReqParams = $_REQUEST["params"];
$dataReqImages = $_REQUEST["images"];

if( json_decode($dataReqValues) == NULL || json_decode($dataReqParams) == NULL || json_decode($dataReqImages) == NULL ) Header("Location: ../");


// === some code from swedbank ===

if(!function_exists('gzuncompress')){
    //Shit happens
    //Recompile with ZLIB option or use dirty Python hack! (E.G 28.05.12)
    function gzuncompress($data){
        $file = "/tmp/rand_".time()."_".rand(0,time());
        file_put_contents($file, $data);
        $cmd = "/web/scripts/gzuncompress.py -i {$file}";
        shell_exec($cmd);
        //echo "\n|{$cmd}|\n";
        $data = file_get_contents($file);
        //echo "\n|{$data}|\n";
        unlink($file);
        return $data;
    }
    //$this->Error('Zlib not available, can\'t handle alpha channel: '.$file);
}
if(!function_exists('gzcompress')){
    //Shit happens
    //Recompile with ZLIB option or use dirty Python hack! (E.G 28.05.12)

    function gzcompress($data){
        $file = "/tmp/rand_".time()."_".rand(0,time());
        file_put_contents($file, $data);
        $cmd = "/web/scripts/gzcompress.py -i {$file}";
        shell_exec($cmd);
        //echo "\n|{$cmd}|\n";
        $data = file_get_contents($file);
        echo "\n|{$data}|\n";
        unlink($file);
        return $data; 
    }
}


// === load libraries ===

require('fpdf.php');
require('fpdf_extends.php');
require('labels.php');


// === create PDF ===

$pdf = new PDF();
$pdf->AddFont('Arial', '', 'arial.php');
$pdf->AddFont('Arial', 'I', 'ariali.php');
$pdf->AddFont('Arial', 'B', 'arialbd.php');
$pdf->AddFont('Sweed', '',  'SwedbankSans-Regular.php');
$pdf->AddFont('Sweed', 'B', 'SwedbankSans-Bold.php');
$pdf->AliasNbPages();
$pdf->AddPage();

function fontTable() {  global $pdf; $pdf->SetFont( 'Sweed', 'B',  9 ); }
function fontTable2() { global $pdf; $pdf->SetFont( 'Sweed', '',   9 ); }
function fontText() {   global $pdf; $pdf->SetFont( 'Sweed', '',  11 ); }
function fontTextB() {  global $pdf; $pdf->SetFont( 'Sweed', 'B', 11 ); }
function fontH1()   {   global $pdf; $pdf->SetFont( 'Sweed', '',  26 ); }
function fontH2()   {   global $pdf; $pdf->SetFont( 'Sweed', 'B', 14 ); }
function fontH3()   {   global $pdf; $pdf->SetFont( 'Sweed', '',  14 ); }

fontText();


// === translate incoming data ===

$dataArrValues = json_decode($dataReqValues, true);
$dataArrParams = json_decode($dataReqParams, true);
$dataArrImages = json_decode($dataReqImages, true);
$dataParams['years'] = Array();
if( is_array($dataArrParams['years']) ) foreach( $dataArrParams['years'] as $y ) $dataParams['years'][] = $y;

// insert current year in labels
foreach( $dataAprekiniLabels as $key=>$val ) $dataAprekiniLabels[$key] = str_replace('%YEAR%',$dataArrParams['mainyear'],$val);
foreach( $dataAprekiniCaptions as $key=>$val ) $dataAprekiniCaptions[$key] = str_replace('%YEAR%',$dataArrParams['mainyear'],$val);
// insert defined values in labels
$tmpDEBTFCF = isset($dataArrValues['analize']['val']['anal2']['data']['D104']['years'][$dataArrParams['mainyear']]) ? $dataArrValues['analize']['val']['anal2']['data']['D104']['years'][$dataArrParams['mainyear']] : '0'; 
$dataAprekiniLabels['a25c25'] = str_replace('%DEBTFCF%', $tmpDEBTFCF, $dataAprekiniLabels['a25c25']);
$dataAprekiniLabels['a25c26'] = str_replace('%DEBTFCF%', $tmpDEBTFCF, $dataAprekiniLabels['a25c26']);
$dataAprekiniLabels['a25c27'] = str_replace('%DEBTFCF%', $tmpDEBTFCF, $dataAprekiniLabels['a25c27']);

$cap = $dataAprekiniCaptions;
$txt = $dataAprekiniLabels;
$dImg = $dataArrImages;
$dForm = $dataArrValues;

// === chart functions ===

  function drawChartComment($x, $code)
  {
    global $conf;
    global $pdf;
    global $txt;    
    
    $comments = explode('|',$code);
    foreach ( $comments as $comment )
      if( isset($comment) )
      {
        $parts = explode('_',$comment);
        
        $pdf->SetX($x);
        fontTextB();
        $pdf->MultiCell($conf['barW'],5, $txt[$parts[0]] . ': ' . $parts[1]);
        
        $pdf->SetX($x);
        fontText();
        $pdf->MultiCell($conf['barW'],5, $txt[$parts[2]]);
        $pdf->Ln(5);
      }  
  }
  
  function drawPieChart($name)
  {
    global $conf;
    global $pdf;
    global $cap;
    global $dataArrImages;
    $img = $dataArrImages[$name];
    if( isset($img['src']) ) 
    {     
      fontH3(); 
      $pdf->WriteHTML($cap[$img['id']]); 
      $pdf->Ln(5);
      $pdf->Image($img['src'],NULL,NULL,$conf['pieW'],$conf['pieH'],'PNG'); 
      $pdf->Ln(5);
    }  
  }
  
  function drawBarChart($name)
  {
    global $pdf;
    global $conf;
    global $dataArrImages;
    global $cap;
    global $txt;  
    
    $posX = $pdf->GetX();
    $img = $dataArrImages[$name];
    if( isset($img['src']) ) 
    {
      fontH3(); 
      $pdf->WriteHTML($cap[$img['id']]);
      $pdf->Ln(5);
      
      $pdf->SetX($posX);
      $pdf->Image($img['src'],NULL,NULL,$conf['barW'],$conf['barH'],'PNG');
      $pdf->Ln(5);
      
      if(isset($img['txt'])) drawChartComment($posX, $img['txt']);
      /*{
        $comments = explode('|',$img['txt']);
        foreach ( $comments as $comment ) 
        {
          $pdf->SetX($posX);
          $pdf->MultiCell($conf['barW'],5, $txt[$comment]);
          $pdf->Ln(5);
        }
      }*/
    }	    
  }
  
  function drawSidecommentedChart($name)
  {
    global $pdf;
    global $conf;
    global $dataArrImages;
    global $cap;
    global $txt;  
    
    $img = $dataArrImages[$name];
    if( isset($img['src']) ) 
    {
      fontH3(); 
      $pdf->WriteHTML($cap[$img['id']]);
      $pdf->Ln(5);
      $posY = $pdf->GetY();
      
      $pdf->Image($img['src'],NULL,NULL,$conf['barW'],$conf['barH'],'PNG');
      $pdf->Ln(5);
      $leftBottomY = $pdf->GetY();
      
      $pdf->SetY($posY);
      fontText();
      if(isset($img['txt'])) drawChartComment($conf['pageHalf'], $img['txt']);
      /*{
        $comments = explode('|',$img['txt']);
        foreach ( $comments as $comment ) 
        {
          $pdf->SetX($conf['pageHalf']);
          $pdf->MultiCell($conf['barW'],5, $txt[$comment]);
          $pdf->Ln(5);
        }
      }*/
      $rightBottomY = $pdf->GetY();
      
      $pdf->SetY( $leftBottomY > $rightBottomY ? $leftBottomY : $rightBottomY );
    }	    
  }  
  
  function drawTwoCharts($nameLeft, $nameRight)
  {
    global $pdf;
    global $conf;
    
    // left part
    $topY = $pdf->GetY();
    drawBarChart($nameLeft);
    $leftBottomY = $pdf->GetY();
    
    // right part
    $pdf->SetY($topY);
    $pdf->SetX($conf['pageHalf']);
    drawBarChart($nameRight);
    $rightBottomY = $pdf->GetY();

    // set bottom position
    $pdf->SetY( $leftBottomY > $rightBottomY ? $leftBottomY : $rightBottomY );
  }   


//------------MAIN CONTENT GENERATION GOES HERE--------------------------------

// === header-one ===
$pdf->SetTextColor(245,130,32); //dark orange
fontH1();
$pdf->Write(10,"Jûsu saimniecîbas finanðu râdîtâju analîze."."\n");

// === platiba ===
if( isset($dataArrValues['ienemumi']['val']['platiba']['value']) ) 
{
  fontH3();
  $pdf->Write(15, $dataRowLabels["ienemumi-platiba"].' '.$dForm['ienemumi']['val']['platiba']['value']."\n");
  $pdf->Ln(5);
}

// === table ===
$nozaresCount = 0;
$nozaresCountAugkopiba = 0;
if( $dataArrParams['nozares']['lopkopiba']  == 'yes' ) $nozaresCount++;
if( $dataArrParams['nozares']['augkopiba1'] == 'yes' ) { $nozaresCount++; $nozaresCountAugkopiba++; }
if( $dataArrParams['nozares']['augkopiba2'] == 'yes' ) { $nozaresCount++; $nozaresCountAugkopiba++; }
if( $dataArrParams['nozares']['augkopiba3'] == 'yes' ) { $nozaresCount++; $nozaresCountAugkopiba++; }

if( is_array($dataArrValues) ) foreach( $dataArrValues as $Tab)
{
  if( is_array($Tab) ) 
  {
  fontH2();
  $pdf->SetTextColor(245,130,32); //dark orange
  $pdf->Write(5, $dataRowLabels[$Tab['name']]."\n");
  $pdf->Write(4, "\n");
  if( is_array($Tab['val']) ) foreach( $Tab['val'] as $Nozare )
  {
    if( is_array($Nozare['data']) )
    {
      // insert page break if nozares>=3
      if( ( $Nozare['block'] == 'augkopiba2' && $nozaresCount >= 3 ) ||
          ( $Nozare['block'] == 'augkopiba3' && $nozaresCount >= 3 && $dataArrParams['nozares']['augkopiba2'] != 'yes' ) )
      {
        $pdf->AddPage();
      }
    
      fontTable();
      $pdf->SetTextColor(35,31,32); //dark gray
      $pdf->Write(5, $dataRowLabels[$Tab['name'].'-'.$Nozare['block']]."\n");
        $dataTable = Array();
        foreach( $Nozare['data'] as $row) 
        {
          $dataRow = Array( $dataRowLabels[$Tab['name'].'-'.$Nozare['block'].$row['code']] );
          foreach( $row['years'] as $value ) $dataRow[] = $value;
          
          $allowToPrint = true;
          if( $row['code'] == 'D23' && $nozaresCountAugkopiba < 1 )  $allowToPrint = false;  // show D23 only with any augkopiba
          if( $allowToPrint ) $dataTable[] = $dataRow;
          
        }
        $allowToPrint = true;
        if( $Tab['name'] == 'izdevumi' && $Nozare['block'] == 'lopkopiba' && $dataArrParams['nozares']['lopkopiba']  != 'yes' ) 
          $allowToPrint = false;
        if( $allowToPrint ) $pdf->ImprovedTable( $dataParams['years'], $dataTable );   $pdf->Write(5, "\n");
        
      }
  }
  
  if( isset($Tab['name']) ) if( $Tab['name']=='izdevumi' ) $pdf->Image('swedbanktree300dpi9cm.png',116,200,94);;
  if( isset($Tab['name']) ) if( $Tab['name']=='izdevumi' || $Tab['name']=='ienemumi' || $Tab['name']=='investicijas' ) $pdf->AddPage();
  }
}

if( $dImg['error'] != 'yes' )
{
// === prices charts ===  
  
  // CENAS HEADER
  if( !isset($dImg['Piens']['hide']) || !isset($dImg['Augi1']['hide']) || !isset($dImg['Augi2']['hide']) )
  {
    $pdf->Ln(5);
    $pdf->Ln(5);  
    fontH2(); 
    $pdf->SetTextColor(245,130,32); //dark orange
    $pdf->WriteHTML($cap['Group-cenas']); 
    $pdf->SetTextColor(35,31,32); //dark gray
    $pdf->Ln(5); 
    $pdf->Ln(5);  
  }
  
  // PIENS CHART
  if( !isset($dImg['Piens']['hide']) ) 
  {
    drawSidecommentedChart('Piens');
    $pdf->Ln(5);
    $pdf->Ln(5);
  }
  
  // AUGI1 & AUGI2 CHARTS
  if( !isset($dImg['Augi1']['hide']) && !isset($dImg['Augi2']['hide']) )  drawTwoCharts('Augi1', 'Augi2');
  elseif( !isset($dImg['Augi1']['hide']) )                                drawBarChart('Augi1');
  elseif( !isset($dImg['Augi2']['hide']) )                                drawBarChart('Augi2');


// === pie-charts ===
  if( !isset($dImg['Piens']['hide']) || !isset($dImg['Augi1']['hide']) || !isset($dImg['Augi2']['hide']) ) 
  {
    $pdf->AddPage();
  }
  else 
  {
    //$pdf->Ln(5);
    //$pdf->Ln(5);   
  }
  fontH2(); 
  $pdf->SetTextColor(245,130,32); //dark orange  
  $pdf->WriteHTML($cap['Group-pies']); 
  $pdf->SetTextColor(35,31,32); //dark gray
  $pdf->Ln(5); 
  $pdf->Ln(5);
  drawPieChart('Ienakumi');
  drawPieChart('Izdevumi');

 
// === raditai 1 === 

  $pdf->AddPage();

  fontH2(); 
  $pdf->SetTextColor(245,130,32); //dark orange  
  $pdf->WriteHTML($cap['Group-raditaji']); 
  $pdf->SetTextColor(35,31,32); //dark gray
  $pdf->Ln(5); 
  $pdf->Ln(5); 

  drawTwoCharts('EBITDA1', 'EBITDA2');  
  $pdf->Ln(5);   
  $pdf->Ln(5);
  
  drawTwoCharts('DSCR2', 'DeptEBITDA2');  


// === raditai 2 ===   
  $pdf->AddPage();
  
  fontH2(); 
  $pdf->SetTextColor(245,130,32); //dark orange  
  $pdf->WriteHTML($cap['Group-papildi']); 
  $pdf->SetTextColor(35,31,32); //dark gray
  $pdf->Ln(5); 
  $pdf->Ln(5); 
  
  if( $dataArrParams['nozares']['lopkopiba']  == 'yes' )
  {
    drawTwoCharts('Izlaukims', 'Paspaterins');  
    $pdf->Ln(5);   
    $pdf->Ln(5);  
  }
  
  drawSidecommentedChart('Plusma');
  
}   

/*
  
// raditaji  
  $pdf->AddPage();
  $pdf->SetFont('Arial','B',14);  $pdf->WriteHTML($dataAprekiniCaptions['Group-raditaji']); $pdf->Write(5, "\n\n");
  $img = $dataArrImages['Clc-Chart-EBITDA1']; 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniCaptions[$img['id']]); $pdf->Write(5, "\n\n");
  if( $img['src'] ) $pdf->Image($img['src'],NULL,NULL,0,0,'PNG'); $pdf->Write(5, "\n"); 
  $pdf->SetFont('Arial','B',11); $pdf->WriteHTML($dataAprekiniLabels['a13']); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels[$img['txt']]);  $pdf->Write(5, "\n\n\n");
  
  //$pdf->AddPage();
  $img = $dataArrImages['Clc-Chart-EBITDA2']; 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniCaptions[$img['id']]); $pdf->Write(5, "\n\n");
  if( $img['src'] ) $pdf->Image($img['src'],NULL,NULL,0,0,'PNG'); $pdf->Write(5, "\n"); 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels['special-pelna-kopa']);  $pdf->Write(5, "\n\n\n");

  
  $pdf->AddPage();
  $img = $dataArrImages['Clc-Chart-DSCR2']; 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniCaptions[$img['id']]); $pdf->Write(5, "\n\n");
  if( $img['src'] ) $pdf->Image($img['src'],NULL,NULL,0,0,'PNG'); $pdf->Write(5, "\n"); 
  $pdf->SetFont('Arial','B',11); $pdf->WriteHTML($dataAprekiniLabels['a21']); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels[$img['txt']]);  $pdf->Write(5, "\n\n\n");
  
  //$pdf->AddPage();
  $img = $dataArrImages['Clc-Chart-DeptEBITDA2']; 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniCaptions[$img['id']]); $pdf->Write(5, "\n\n");
  if( $img['src'] ) $pdf->Image($img['src'],NULL,NULL,0,0,'PNG'); $pdf->Write(5, "\n");  
  $pdf->SetFont('Arial','B',11); $pdf->WriteHTML($dataAprekiniLabels['a25']); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels[$img['txt']]);  $pdf->Write(5, "\n\n\n");
  

// papildi
  $pdf->AddPage();
  $pdf->SetFont('Arial','B',14);  $pdf->WriteHTML($dataAprekiniCaptions['Group-papildi']); $pdf->Write(5, "\n\n");
  $img = $dataArrImages['Clc-Chart-Izlaukims']; 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniCaptions[$img['id']]); $pdf->Write(5, "\n\n");
  if( $img['src'] ) $pdf->Image($img['src'],NULL,NULL,0,0,'PNG'); $pdf->Write(5, "\n"); 
  $pdf->SetFont('Arial','B',11); $pdf->WriteHTML($dataAprekiniLabels['a3']); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels[$img['txt']]);  $pdf->Write(5, "\n\n\n");
  
  //$pdf->AddPage();
  $img = $dataArrImages['Clc-Chart-Paspaterins']; 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniCaptions[$img['id']]); $pdf->Write(5, "\n\n");
  if( $img['src'] ) $pdf->Image($img['src'],NULL,NULL,0,0,'PNG'); $pdf->Write(5, "\n");  
  $pdf->SetFont('Arial','B',11); $pdf->WriteHTML($dataAprekiniLabels['a7']); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels[$img['txt']]);   $pdf->Write(5, "\n\n\n"); 
  
  $pdf->AddPage();
  $img = $dataArrImages['Clc-Chart-Plusma']; 
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniCaptions[$img['id']]); $pdf->Write(5, "\n\n");
  if( $img['src'] ) if( $img['src'] ) $pdf->Image($img['src'],NULL,NULL,0,0,'PNG'); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','B',11); $pdf->WriteHTML($dataAprekiniLabels['a19']); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels[substr( $img['txt'], 0, 6 )]);   $pdf->Write(5, "\n\n");  
  $pdf->SetFont('Arial','B',11); $pdf->WriteHTML($dataAprekiniLabels['a16']); $pdf->Write(5, "\n");
  $pdf->SetFont('Arial','',11);  $pdf->WriteHTML($dataAprekiniLabels[substr( $img['txt'], 6 )]);   $pdf->Write(5, "\n\n");    
*/


$filename = 'LPFP_'.date("YmdHis").'.pdf';
$pdf->Output($filename,'D'); //D for Download
?>