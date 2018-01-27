/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice;


start();

document.querySelector('.btn-roll').addEventListener('click', function(){

  document.querySelector('.dice').style.display = 'inline';

  var dice = Math.floor(Math.random() * 6) + 1;
  var img = 'dice-' + dice + '.png';
  // Change dice picture
  document.querySelector('.dice').src = img;

  if (dice !== 1) {
    setCurrentScore(roundScore + dice);
    return;
  }
  setCurrentScore(0);
  changePlayer();
  return;
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  scores[activePlayer] += roundScore;
  setCurrentScore(0);
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  changePlayer();
})

document.querySelector('.btn-new').addEventListener('click', function () {
  start();
})

function setCurrentScore(newScore) {
  roundScore = newScore;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function changePlayer () {
  activePlayer = activePlayer === 1 ? 0 : 1;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function start () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.add('active');

}
