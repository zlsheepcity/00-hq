<?php

class PDF extends FPDF
{
var $B;
var $I;
var $U;
var $HREF;

function PDF($orientation='P', $unit='mm', $size='A4')
{
    // Call parent constructor
    $this->FPDF($orientation,$unit,$size);
    // Initialization
    $this->B = 0;
    $this->I = 0;
    $this->U = 0;
    $this->HREF = '';
}

function WriteHTML($html)
{
    // HTML parser
    $html = str_replace("\n",' ',$html);
    $a = preg_split('/<(.*)>/U',$html,-1,PREG_SPLIT_DELIM_CAPTURE);
    foreach($a as $i=>$e)
    {
        if($i%2==0)
        {
            // Text
            if($this->HREF)
                $this->PutLink($this->HREF,$e);
            else
                $this->Write(5,$e);
        }
        else
        {
            // Tag
            if($e[0]=='/')
                $this->CloseTag(strtoupper(substr($e,1)));
            else
            {
                // Extract attributes
                $a2 = explode(' ',$e);
                $tag = strtoupper(array_shift($a2));
                $attr = array();
                foreach($a2 as $v)
                {
                    if(preg_match('/([^=]*)=["\']?([^"\']*)/',$v,$a3))
                        $attr[strtoupper($a3[1])] = $a3[2];
                }
                $this->OpenTag($tag,$attr);
            }
        }
    }
}

function OpenTag($tag, $attr)
{
    // Opening tag
    if($tag=='B' || $tag=='I' || $tag=='U')
        $this->SetStyle($tag,true);
    if($tag=='A')
        $this->HREF = $attr['HREF'];
    if($tag=='BR')
        $this->Ln(5);
}

function CloseTag($tag)
{
    // Closing tag
    if($tag=='B' || $tag=='I' || $tag=='U')
        $this->SetStyle($tag,false);
    if($tag=='A')
        $this->HREF = '';
}

function SetStyle($tag, $enable)
{
    // Modify style and select corresponding font
    $this->$tag += ($enable ? 1 : -1);
    $style = '';
    foreach(array('B', 'I', 'U') as $s)
    {
        if($this->$s>0)
            $style .= $s;
    }
    $this->SetFont('',$style);
}

function PutLink($URL, $txt)
{
    // Put a hyperlink
    $this->SetTextColor(0,0,255);
    $this->SetStyle('U',true);
    $this->Write(5,$txt,$URL);
    $this->SetStyle('U',false);
    $this->SetTextColor(0);
}

// Page header
function Header()
{
  $this->Image('swedbanklogo300dpi5cm.png',155,5,50);
  $this->Ln(15);
}

// Page footer
function Footer()
{
    // Position at 1.5 cm from bottom
    // $this->SetY(-15);
}

// Better table
function ImprovedTable($header, $data)
{
    // Column widths, default line height & multiline unit height (must be ca. 70% of line height)
    $w = array(79, 18, 18, 18, 18, 18, 18);
	$h = 6;
	$mh = 4;
    // Header
    fontTable(); //$this->SetFont('Swed','B',9);
	$this->SetDrawColor(245,130,32);//dark orange 
	$this->SetFillColor(254,226,200);//medium orange 
	$this->SetTextColor(35,31,32); //dark gray
	$this->Cell($w[0],$h,'','TB',0,'R',true);
    for($i=0;$i<=6;$i++)
    {  
	//var_dump($i);
        if (isset($header[$i])) $content=$header[$i]; else $content="";
		$this->Cell($w[$i+1],$h,$content,'TB',0,'R',true);
    }
    $this->Ln(); //end header row
    // Data
	$this->SetFillColor(254,241,226);//light orange 
    foreach($data as $row) 
    {
	//print row header
	    fontTable(); //$this->SetFont('Swed','B',9);
		$lineCount = ( (int)($this->GetStringWidth($row[0]) / $w[0]) + 1 );
		$x = $this->GetX();
		$y = $this->GetY();
		if ($lineCount>1) {
			$this->Multicell($w[0],$mh,$row[0],"TB","",true);
		} else {
			$this->Cell($w[0],$h,$row[0],"TB",0,"",true);
		}
		$this->SetXY($x+$w[0], $y);
	
	//print row numbers
		fontTable2(); //$this->SetFont('Swed','',9);
		for($i=1;$i<=7;$i++)
		{
			if (isset($row[$i])) $content=$row[$i]; else $content="";		
			if ($lineCount>1) {
				$this->Cell($w[$i],$mh*$lineCount,$content,"TB",0,"R",true);
			} else {
				$this->Cell($w[$i],$h,$content,'TB',0,'R',true);
			}
		}
	//end row	
		$this->Ln(); 
    }
}


}
?>