var GREY = 'rgb(204, 204, 204)'
var NUM_ROWS = 6;
var NUM_COLS = 7;

var A = 'Blue';
var B = 'Red';

var colors = {
    Blue: 'rgb(68, 128, 226)',
    Red: 'rgb(226, 68, 83)',
  }

function changePlayer (player) {
    if (player === A) {
      return B;
    }
    return A;
  }


var player = A;
var table = $("table tr");

var gameOn = true;

function announceTurn (){
  $("h3").text("It's " + player + "'s turn. Pick a column to drop in!")
}

function game () {
    if (!gameOn){
      return;
    }

    var col = $(this).parent().children().index($(this));
    var changed = changeColor(col, colors[player]);
    if (changed === false) {
      return;
    }

    if (checkWin()) {
      $("h3").text(player + ' wins!');
      gameOn = false;
      return;
    }
    if (boardIsFull()) {
      $("h3").text("The board is full. Game over!");
      gameOn = false;
      return;
    }

    changeActivePlayer();
    announceTurn();
  }


function reset () {
    $("td button").css('background-color', GREY);
    player = A;
    gameOn = true;
    announceTurn();
  }

$("#reset").click(reset)
$("td").click(game);
reset();



function changeActivePlayer () {
  if (player === A){
    player = B;
  } else {
    player = A;
  }
}


function changeButtonColor (columnIndex, rowIndex, color) {
  return table.eq(rowIndex).find('td').eq(columnIndex).find("button").css("background-color", color)
}

function getButtonColor(columnIndex, rowIndex) {
  return table.eq(rowIndex).find('td').eq(columnIndex).find("button").css("background-color")
}

function changeColor (columnIndex, color) {

  for (var row = NUM_ROWS-1; row >= 0; row--) {
    if (getButtonColor(columnIndex, row) === GREY) {
      changeButtonColor(columnIndex, row, color);
      return true;
    }
  }
  return false;
}


function checkWin () {
  return checkWinRows() || checkWinColumns() || checkWinRightDiagonals() || checkWinLeftDiagonals();
}

function checkWinRows(){
  var btn;
  for (var i = 0; i < NUM_COLS-3; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
      btn = getButtonColor( i, j);
      if ( btn !== GREY && btn === getButtonColor(i+1, j) && btn === getButtonColor(i+2, j) && btn === getButtonColor(i+3, j) && btn !== undefined )
        return true;
    }
  }
  return false;
}

function checkWinColumns(){
  var btn;
  for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS-3; j++) {
      btn = getButtonColor(i, j);
      if (btn !== GREY && btn === getButtonColor(i, j+1) && btn === getButtonColor(i, j+2) && btn === getButtonColor(i, j+3) && btn !== undefined)
        return true;
    }
  }
  return false;
}

function checkWinRightDiagonals(){
  var btn;
  for (var i = 0; i < NUM_COLS-3; i++) {
    for (var j = 0; j < NUM_ROWS-3; j++) {
      btn = getButtonColor(i, j);
      if (btn !== GREY && btn === getButtonColor(i+1, j+1) && btn === getButtonColor(i+2, j+2) && btn === getButtonColor(i+3, j+3) && btn !== undefined)
        return true;
    }
  }
  return false;
}

function checkWinLeftDiagonals(){
  var btn;
  for (var i = 4; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS-3; j++) {
      btn = getButtonColor(i, j);
      if (btn !== GREY && btn === getButtonColor(i-1, j+1) && btn === getButtonColor(i-2, j+2) && btn === getButtonColor(i-3, j+3) && btn !== undefined)
        return true;
    }
  }
  return false;
}


function boardIsFull() {
  for (var i = 0; i < NUM_COLS; i++) {
    if (getButtonColor(i, 0) === GREY){
      return false;
    }
  }
  return true;
}
