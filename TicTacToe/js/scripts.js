/***************************
 *  Tic Tac Toe styles
 *
 *  Author  : Maurizio Aru
 *  Created : 2017-07-13
 **************************/

var gameStatus;
var grid = [
	[ ' ', ' ', ' '],
	[ ' ', ' ', ' '],
	[ ' ', ' ', ' ']
];
var gameBoard;

$(document).ready(function(){
	
	init();
	showSelectSymbol();
});

/* Init application */
function init() {
	console.log('Init application...');
	gameStatus = new Status(new Player('x', false), new Player('0', true));
	gameBoard = new Board([ [' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' '] ] );
	console.log('App initialized!');
}

function showSelectSymbol(){
	var symbol = "x";
	console.log("Show Select Symbol Screen");
	
	$("#symbolSelect").show();
	$("#gameboard").hide();
	$(".symbol").on('click', function(){
		
		symbol = ($(this).hasClass("fa-times") ? 'x' : '0');
		console.log("Selected " + symbol + " symbol");
		
		gameStatus.getPlayer1().setSign(symbol);
		gameStatus.getPlayer2().setSign( ( symbol === 'x' ? '0' : 'x') );
		gameStatus.setCurrentTurn(symbol);
		
		$('#player1_symbol').removeClass("fa fa-times fa-circle-o");
		$('#player1_symbol').addClass( (gameStatus.getPlayer1().getSign() === 'x' ? "fa fa-times" : "fa fa-circle-o") );
		$('#player2_symbol').removeClass("fa fa-times fa-circle-o");
		$('#player2_symbol').addClass( (gameStatus.getPlayer2().getSign() === 'x' ? "fa fa-times" : "fa fa-circle-o") );
		
		// start game
		playGame();
	});
}

/* show game board screen and start the game */
function playGame(){
	console.log("Game started");
	$("#symbolSelect").hide();
	$("#gameboard").show();
	$(".square").on('click', OnSquareClick);
	gameBoard.draw()
}

function moveAI(){
	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
			if (gameBoard.getValue(i,j) === ' ') {
				return {
					i: i,
					j: j
				}
			}
		}
	}
}

function showMessage(message){
	console.log("Show Message '" + message + "'");
	$("#gameboard").show();
	$("#gamepad").hide();
	$("#messagebox").show();
	$("#message").html(message);
	$("#messageOK").on('click', function(){
		$("#messagebox").hide();
		$("#gamepad").show();
	});
}

/* Square click event listener */
function OnSquareClick(){
	const PLAYER_TOKEN = gameStatus.getPlayer1().getSign();
	const COMPUTER_TOKEN = gameStatus.getPlayer2().getSign();
	
   console.log("DEBUG: Square Clicked");
	
	var currentSquare = $(this);
	var currentTurn = gameStatus.getCurrentTurn();
	var i = currentSquare.data('i');
	var j = currentSquare.data('j');
	
	console.log('count: ' + gameStatus.turnCount);
	if ( gameBoard.setValue(currentTurn, i, j) ){
		gameBoard.draw();

		const status = gameBoard.isGameOver();
		if ( (status === PLAYER_TOKEN) || (status === COMPUTER_TOKEN) ){
			console.log('Win player ' + status);
			showMessage("Congrats, Player <i class=\"" + (status === 'x' ? 'fa fa-times' : 'fa fa-circle-o') + "\"></i> has won!");
			gameStatus.playerWin();
			gameBoard.reset();
		}
		else if (status == null){
			console.log('Tie game!');
			showMessage("Tie Game!");
			gameBoard.reset();
		}
		else {
			console.log('Game is not over. Play another turn');
			gameStatus.changeTurn();
			computerTurn();
		}
	}
}

/* minmax procedure */
function minmax(newGrid, depth, player){
}

/* Player Turn
	@return: true if player played his game, false otherwise
 */
function PlayerTurn(sign, i, j){
	
	console.log('count: ' + gameStatus.turnCount);
	
	if ( gameBoard.getValue(i, j) !== ' ') {
		// nothing to do
		console.log('Square full. Nothing to do');
		return false; // nothing to do
	}
	else {
		gameBoard.setValue(sign, i, j);
		gameBoard.draw();
		return true;
	}
}

/* Computer Turn */
function computerTurn(){
	console.log('Computer turn');
	const PLAYER_TOKEN = gameStatus.getPlayer1().getSign();
	const COMPUTER_TOKEN = gameStatus.getPlayer2().getSign();
	const cell = moveAI();
	
	gameBoard.setValue(COMPUTER_TOKEN, cell.i, cell.j);
	gameBoard.draw();
	
	const status = gameBoard.isGameOver();
	if ( (status === PLAYER_TOKEN) || (status === COMPUTER_TOKEN) ){
		console.log('Win player ' + status);
		showMessage("Congrats, Player <i class=\"" + (status === 'x' ? 'fa fa-times' : 'fa fa-circle-o') + "\"></i> has won!");
		gameStatus.playerWin();
		gameBoard.reset();
	}
	else if (status == null){
		console.log('Tie game!');
		showMessage("Tie Game!");
		gameBoard.reset();
	}
	else {
		console.log('Game is not over. Play another turn');
		gameStatus.changeTurn();
	}
}


/* Game Board class */
function Board(grid){
	
	this.grid = grid;
	
	this.getValue = function(i, j){
		return this.grid[i][j];
	}
	
	this.setValue = function(value, i, j){
		if (this.grid[i][j] !== ' ') return false;
		
		this.grid[i][j] = value;
		return true;
	}
	
	/* reset grid for another play */
	this.reset = function(){
		console.log("DEBUG: Board.reset");
		
		// reset grid
		for (var i=0; i<3; i++){
			for (var j=0; j<3; j++){
				grid[i][j] = ' ';
			}
		}
		
		$('.square').removeClass('fa fa-times');
		$('.square').removeClass('fa fa-circle-o');
		$('#player1_score').text(gameStatus.getPlayer1().getScore());
		$('#player2_score').text(gameStatus.getPlayer2().getScore());
	}
	
	/* redraw board view */
	this.draw = function(){
		console.log("DEBUG: Board.draw");

		$('#player1_score').text(gameStatus.getPlayer1().getScore());
		$('#player2_score').text(gameStatus.getPlayer2().getScore());
		$('#player_turn').removeClass('fa fa-times fa-circle-o');
		$('#player_turn').addClass( (gameStatus.getCurrentTurn() === 'x' ? 'fa fa-times' : 'fa fa-circle-o') );

		for (var i=0; i<3; i++){
		  for (var j=0; j<3; j++){
				if (grid[i][j] !== ' '){
					console.log('grid['+ i +']['+ j + ']: ' + grid[i][j]);
					$('.square[data-i=' + i + '][data-j=' + j + ']').addClass( (grid[i][j] === 'x' ? 'fa fa-times' : 'fa fa-circle-o') );
				}
		  }
		}
	}
	
	/* 
	 * check if game is over 
	 * @return: sign of winner, null for tie or false for another turn
	 */
	this.isGameOver = function(){
		
		// check rows
		for (var i=0; i<3; i++){
			if ( (this.grid[i][0] !== ' ') && (this.grid[i][0] === this.grid[i][1]) && (this.grid[i][0] === this.grid[i][2])){
				return this.grid[i][0];
			}
		}
		
		// check columns
		for (var i=0; i<3; i++){
			if ( (this.grid[0][i] !== ' ') && (this.grid[0][i] === this.grid[1][i]) && (this.grid[0][i] === this.grid[2][i])){
				return this.grid[0][i];
			}
		}
		
		// check diagonal upper left - bottom-righ
		if ( (this.grid[0][0] !== ' ') && (this.grid[0][0] === this.grid[1][1]) && (this.grid[0][0] === this.grid[2][2]) ){
			return this.grid[0][0];
		}
		
		// check diagonal bottom left - upper righ
		if ( (this.grid[2][0] !== ' ') && (this.grid[2][0] === this.grid[1][1]) && (this.grid[2][0] === this.grid[0][2]) ){
			return this.grid[2][0];
		}

		// check if there game is not over
		for (var i=0; i<3; i++){
			for (var j=0; j<3; j++){
				if (this.grid[i][j] === ' '){
					return false;
				}
			}
		}
		
		// return null if is a tie
		return null;
	}
}

/* Player class */
function Player(sign, isComputer){
	
	this.isComputer = isComputer;
	this.score = 0;
	this.sign = sign;
	
	this.getSign = function(){
		return this.sign;
	}

	this.setSign = function(newSign){
      // filter only valid signs
      if ( (sign === 'x') || (this.sign === '0') ) {
        console.log('Player sign changed from \'' + this.sign + '\' to ' + newSign);
        this.sign = newSign;
      }
	}
	
	this.win = function(){
		this.score = parseInt(this.score) + 1;
	}
	
	this.getScore = function(){
		return this.score;
	}
	
	this.toString = function(){
      var result = {};

      result.sign = this.sign;
      result.score = this.score;
      result.isComputer = this.isComputer;

      console.log("Person: " + JSON.stringify(result));
      return JSON.stringify(result);
	}
}

/* Game status class */
function Status(Ply1, Ply2){
	
	this.player1 = Ply1;
	this.player2 = Ply2;
	this.gameInPlay = false;
	this.turn = this.player1.getSign;
	this.turnCount = 0;
	
	/* check if game is playing */
	this.isPlaying = function() {
		return this.gameInPlay;
	}
	
	this.getPlayer1 = function(){
		return this.player1;
	}
	
	this.getPlayer2 = function(){
		return this.player2;
	}
	
	this.getCurrentTurn = function(){
		return this.turn;
	}
	
	this.setCurrentTurn = function(value) {
		this.turn = value;
	}
	
	this.playerWin = function(){
		if (this.player1.getSign() === this.turn){
			this.player1.win()
			this.turnCount = 0;
		}
		else if (this.player2.getSign() === this.turn) {
			this.player2.win();
			this.turnCount = 0;
		}
		else {
			console.log("ERROR: who is winner?");
		}
	}
	
	this.changeTurn = function(){
		this.turn = (this.turn == 'x' ? '0' : 'x');
		this.turnCount += 1;
		return this.turn;
	}
	
	this.getCount = function(){
		return this.turnCount;
	}
	
	this.restartGame = function(){
		this.turnCount = 0;
		this.turn = this.player1.getSign();
	}
	
	this.toString = function(){
      var result = {};

      result.player1 = this.player1.toString();
      result.player2 = this.player2.toString();

      console.log("Game Status: " + JSON.stringify(result));
      return JSON.stringify(result);
	}
}