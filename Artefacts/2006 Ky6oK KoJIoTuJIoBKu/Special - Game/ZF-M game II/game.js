function game_clearField(){
	for( y = 1 ; y <= FieldSize['y'] ; y++ ) for( x = 1 ; x <= FieldSize['x'] ; x++ )
	{
			FieldSlot['1' + x + '' + y] =0
			FieldSlot['2' + x + '' + y] =0
	}
	return true
}

function game_restartPlayers(){
	for( tt = 1 ; tt <= 2 ; tt++) for( t = 1 ; t <= TeamSize ; t++ )
	{
		if((t == 1) && (tt == 1)) YBorder = FieldSize['y'] - DefenderStartPosition + 1; else YBorder = 1
		tmpX = 0
		tmpY = 0
		while(FieldSlot[tt + '' + tmpX + tmpY] > 0)
		{
			tmpX = Math.round(Math.random() * (FieldSize['x'] - 1)) + 1
			tmpY = Math.round(Math.random() * (FieldSize['y'] - YBorder)) + YBorder
		}
		PData_PosX[tt + '' + t] = tmpX
		PData_PosY[tt + '' + t] = tmpY
		FieldSlot[tt + '' + tmpX + tmpY] = 1
	}
	Ball['x'] = PData_PosX['11']
	Ball['y'] = PData_PosY['11']
	return true
}

function game_movePlayers(){
	for( team = 1 ; team <= 2 ; team++) for(t = 1 ; t <= TeamSize ; t++)
	{
		if(!((PData_PosX[team + '' + t] == Ball['x']) && (PData_PosY[team + '' + t] == Ball['y']) && (team == 1))) 
		{
			tmpDirY = Math.round(Math.random() * 2) - 1
			if((tmpDirY != 0) && DiagonalMove) tmpDirX = 0;  else tmpDirX = Math.round(Math.random() * 2) - 1
			newX = PData_PosX[team + '' + t] + tmpDirX
			newY = PData_PosY[team + '' + t] + tmpDirY
			if((newX > 0) && (newX <= FieldSize['x']) && (newY > 0) && (newY <= FieldSize['y']) && (FieldSlot[team + '' + newX + newY] == 0)) {
				FieldSlot[team + '' + PData_PosX[team + '' + t] + PData_PosY[team + '' + t]] = 0
				PData_PosX[team + '' + t] = newX
				PData_PosY[team + '' + t] = newY
				FieldSlot[team + '' + PData_PosX[team + '' + t] + PData_PosY[team + '' + t]] = 1
			}
		}
	}	
}

