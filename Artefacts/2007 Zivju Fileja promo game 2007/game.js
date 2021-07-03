function face_drawGazon(){
	for(y=1;y<=fieldSizeY;y++) {
		document.write('<tr>');
		for(x=1;x<=fieldSizeX;x++){
			document.write('<td class="field">');
			document.write('<div id="playerZ_'+x+y+'">');
			document.write('<div id="playerM_'+x+y+'">');
			document.write('<div id="ball_'+x+y+'">');
			//document.write(Math.round(Math.random() * 3)+1);
			document.write('</div>');
			document.write('</div>');
			document.write('</div>');
			document.write('</td>');

			z_fieldslot[x+''+y] =0;
			m_fieldslot[x+''+y] =0;
		}
		document.write('</tr>');
	}

	return true;
}

function face_clearField(){
	for(y=1;y<=fieldSizeY;y++) {
		for(x=1;x<=fieldSizeX;x++){
			DivZ = document.getElementById('playerZ_'+x+y);
			DivM = document.getElementById('playerM_'+x+y);
			DivB = document.getElementById('ball_'+x+y);
			DivZ.className = '';
			DivM.className = '';
			DivB.className = '';
		}
	}
	return true;
}

function face_clearBall(){
	for(y=1;y<=fieldSizeY;y++) {
		for(x=1;x<=fieldSizeX;x++){
			DivB = document.getElementById('ball_'+x+y);
			DivB.className = '';
		}
	}
	return true;
}

function face_clearZteam(){
	for(y=1;y<=fieldSizeY;y++) {
		for(x=1;x<=fieldSizeX;x++){
			DivZ = document.getElementById('playerZ_'+x+y);
			DivZ.className = '';
		}
	}
	return true;
}


function face_drawPlayers(){
	for(t=1;t<=teamSize;t++){
		DivZ = document.getElementById('playerZ_'+z_players_x[t]+z_players_y[t]);
		DivM = document.getElementById('playerM_'+m_players_x[t]+m_players_y[t]);
		DivZ.className = "zplayer";
		DivM.className = "mplayer";
	}
}

function face_drawBall(){
	tmpDiv = document.getElementById('ball_'+ball_x+ball_y);
	tmpDiv.className = "zball";
}

function face_timer(change){
	GameTimer += change;
	DivT = document.getElementById('Game_Timer');
	DivT.innerText = GameTimer + '';
}

function face_score(){
	DivSZ = document.getElementById('Score_Z');
	/* DivSM = document.getElementById('Score_M'); */
	DivSZ.innerText = ScoreZ + '';
	/* DivSM.innerText = ScoreM + ''; */
}

function text_report(text) {
	DivR = document.getElementById('Game_Report_TXT');
	DivRB = document.getElementById('Report_Backup_TXT');
	DivR.innerHTML += '<span class="lastReport">' + text + '</span>';
	DivRB.innerHTML += text;

}

function text_reportUpdate() {
	DivR = document.getElementById('Game_Report_TXT');
	DivRB = document.getElementById('Report_Backup_TXT');
	DivR.innerHTML = DivRB.innerHTML;
}

function get_zplayer(xx,yy){
	result = 0;
	for(t=1;t<=teamSize;t++){
		if((z_players_x[t]==xx)&&(z_players_y[t]==yy)) result = t;
	}
	return result;
}

function get_mplayer(xx,yy){
	result = 0;
	for(t=1;t<=teamSize;t++){
		if((m_players_x[t]==xx)&&(m_players_y[t]==yy)) result = t;
	}
	return result;
}

function get_shootRange(team, xx, yy) {
	if(team=='z') range = yy; else range = fieldSizeY - yy + 1;
	if ((range==1)&&((xx==1)||(xx==fieldSizeX))) range=2;
	return range;
}


function game_resetPlayers(){
	for(y=1;y<=fieldSizeY;y++) {
		for(x=1;x<=fieldSizeX;x++){
			z_fieldslot[x+''+y] =0;
			m_fieldslot[x+''+y] =0;
		}
	}
	for(t=1;t<=teamSize;t++){
		// BEGIN SEARCH Z SLOT
		if(t==1) ramkaY = fieldBorder; else ramkaY = 1;
		tmpX = 0;
		tmpY = 0;
		while(z_fieldslot[tmpX+''+tmpY]>0) {
			tmpX = Math.round(Math.random() * (fieldSizeX - 1))+1;
			tmpY = Math.round(Math.random() * (fieldSizeY - ramkaY)) + ramkaY;
		}
		// SET Z SLOT
		z_players_x[t] = tmpX;
		z_players_y[t] = tmpY;
		z_fieldslot[tmpX+''+tmpY] = 1;
		// BEGIN SEARCH M SLOT
		tmpX = 0;
		tmpY = 0;
		while((m_fieldslot[tmpX+''+tmpY]>0)||((z_players_x[1]==tmpX)&&(z_players_y[1]==tmpY))) {
			tmpX = Math.round(Math.random() * (fieldSizeX-1))+1;
			tmpY = Math.round(Math.random() * (fieldSizeY-1))+1;
		}
		// SET M SLOT
		m_players_x[t] = tmpX;
		m_players_y[t] = tmpY;
		m_fieldslot[tmpX+''+tmpY] = 1;

	}

	return true;
}

function game_resetBall(){
	ball_x = z_players_x['1'];
	ball_y = z_players_y['1'];
	return true;
}

function game_movePlayers(){
	for(t=1;t<=teamSize;t++){
		// BEGIN MOVE Z
		if((z_players_x[t]==ball_x)&&(z_players_y[t]==ball_y)) {
			//
		} else {
			//tmpDirX = Math.round(Math.random() * 2) - 1;
			tmpDirY = Math.round(Math.random() * 2) - 1;
			if(tmpDirY==0) tmpDirX = Math.round(Math.random() * 2) - 1; else tmpDirX = 0;
			newX = z_players_x[t] + tmpDirX;
			newY = z_players_y[t] + tmpDirY;
			if((newX>0)&&(newX<=fieldSizeX)&&(newY>0)&&(newY<=fieldSizeY)&&(z_fieldslot[newX+''+newY]==0)) {
				z_fieldslot[z_players_x[t]+''+z_players_y[t]] = 0;
				z_players_x[t] = newX;
				z_players_y[t] = newY;
				z_fieldslot[z_players_x[t]+''+z_players_y[t]] = 1;
			}
		}
		//tmpDirX = Math.round(Math.random() * 2) - 1;
		tmpDirY = Math.round(Math.random() * 2) - 1;
		if(tmpDirY==0) tmpDirX = Math.round(Math.random() * 2) - 1; else tmpDirX = 0;
		newX = m_players_x[t] + tmpDirX;
		newY = m_players_y[t] + tmpDirY;
		if((newX>0)&&(newX<=fieldSizeX)&&(newY>0)&&(newY<=fieldSizeY)&&(m_fieldslot[newX+''+newY]==0)) {
			m_fieldslot[m_players_x[t]+''+m_players_y[t]] = 0;
			m_players_x[t] = newX;
			m_players_y[t] = newY;
			m_fieldslot[m_players_x[t]+''+m_players_y[t]] = 1;
		}
	}	
}

function game_testMove(direction){
	newX = ball_x + gmMovingX[direction];
	newY = ball_y + gmMovingY[direction];
	if((newX>0)&&(newX<=fieldSizeX)&&(newY>0)&&(newY<=fieldSizeY)) return true;
	return false;
}

function game_doMove(direction){
	pas = 1;
	newX = ball_x + gmMovingX[direction];
	newY = ball_y + gmMovingY[direction];
	if(z_fieldslot[newX+''+newY]==0) {
		tmPlayer = get_zplayer(ball_x,ball_y);
		if(tmPlayer==0) alert('Error 01');
		z_players_x[tmPlayer] = newX;
		z_players_y[tmPlayer] = newY;
		z_fieldslot[ball_x+''+ball_y] = 0;
		z_fieldslot[newX+''+newY] = 1;
		pas = 0;
	}
	ball_x = newX;
	ball_y = newY;
	return pas;
}

function game_testGoal(value) {
	shoot = Math.round(Math.random() * (value - 1)) + 1;
	defend = Math.round(Math.random() * 70) + 1;
	goal = shoot - defend;
	return goal;
}

