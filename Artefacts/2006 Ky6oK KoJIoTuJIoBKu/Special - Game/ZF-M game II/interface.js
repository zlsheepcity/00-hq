

function face_drawGazon(){
	html_output = ""
	for( y = 1 ; y <= FieldSize['y'] ; y++ ) 
		{
		html_output += '<tr>'
		for( x = 1 ; x <= FieldSize['x'] ; x++ )
		{
			html_output += '<td class="field">'
			html_output += '<div id="' + DOM_Obj['PlayerDIVPrefix1'] + x + y + '">'
			html_output += '<div id="' + DOM_Obj['PlayerDIVPrefix2'] + x + y + '">'
			html_output += '<div id="' + DOM_Obj['BallDIVPrefix'] + x + y + '">'
			html_output += '</div></div></div>'
			html_output += '</td>'
		}
		html_output += '</tr>'
	}
	return html_output
}

function face_clearField(){
	for( y = 1 ; y <= FieldSize['y'] ; y++ )
	{
		for( x = 1 ; x <= FieldSize['x'] ; x++ )
		{
			DivZ = document.getElementById(DOM_Obj['PlayerDIVPrefix1'] + x + y)
			DivM = document.getElementById(DOM_Obj['PlayerDIVPrefix2'] + x + y)
			DivB = document.getElementById(DOM_Obj['BallDIVPrefix'] + x + y)
			DivZ.className = ''
			DivM.className = ''
			DivB.className = ''
		}
	}
	return true
}

function face_clearBall(){
	for( y = 1 ; y <= FieldSize['y'] ; y++ )
	{
		for( x = 1 ; x <= FieldSize['x'] ; x++ )
		{
			DivB = document.getElementById(DOM_Obj['BallDIVPrefix'] + x + y)
			DivB.className = ''
		}
	}
	return true
}

function face_clearTeam(team){
	for( y = 1 ; y <= FieldSize['y'] ; y++ )
	{
		for( x = 1 ; x <= FieldSize['x'] ; x++ )
		{
			DivT = document.getElementById(DOM_Obj['PlayerDIVPrefix' + team] + PData_PosX[team + '' + t] + PData_PosY[team + '' + t])
			DivT.className = ''
		}
	}
	return true
}

function face_drawTeam(team){
	for( t = 1 ; t <= TeamSize ; t++ )
	{
		DivT = document.getElementById(DOM_Obj['PlayerDIVPrefix' + team] + PData_PosX[team + '' + t] + PData_PosY[team + '' + t])
		DivT.className = 'player' + team + t
	}
	return true
}

function face_drawBall(){
	DivB = document.getElementById(DOM_Obj['BallDIVPrefix'] + Ball['x'] + Ball['y'])
	DivB.className = "ball"
	return true
}

function face_showTimer(){
	DivT = document.getElementById(DOM_Obj['GameTimer'])
	DivT.innerText = GameTimer + ':' + GameSeconds
}

function face_showScore(){
	DivSZ = document.getElementById(DOM_Obj['Score1'])
	DivSM = document.getElementById(DOM_Obj['Score2'])
	DivSZ.innerText = GameScore['1'] + ''
	DivSM.innerText = GameScore['2'] + ''
}