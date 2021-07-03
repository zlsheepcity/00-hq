var FieldSlot = new Array
	FieldSlot['100'] = 1
	FieldSlot['200'] = 1

var Ball = new Array

var GameTimer = 0
var GameSeconds = 0
var GameScore = new Array
	GameScore['1'] = 0
	GameScore['2'] = 0

function get_player(team, xx, yy){
	result = 0
	for( t = 1 ; t <= TeamSize ; t++ ) if((PData_PosX[team + '' + t] == xx) && (PData_PosY[team + '' + t] == yy)) result = t 
	return result
}

function get_shootRange(team, xx, yy) {
	if( team == '1' ) range = yy
	else range = FieldSize['y'] - yy + 1
	if (( range == 1 ) && (( xx == 1 ) || ( xx == FieldSize['x'] ))) range = 2 // Corner
	return range
}

function set_initVariables(){
	
	for( team = 1 ; team <= 2 ; team++) {
		// FIELD VALUES
		for( y = 1 ; y <= FieldSize['y'] ; y++ ) for( x = 1 ; x <= FieldSize['x'] ; x++ ) {
			FieldSlot['' + team + x + y] = 0
		}
		// TEAM VALUES
		for(t = 1 ; t <= TeamSize ; t++) {
			PData_Exp['' + team + t] = 0
		}
	}
}