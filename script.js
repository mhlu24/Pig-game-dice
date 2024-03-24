'use strict';

//select the score elements
const score0El = document.querySelector('#score--0');
//selecting element with id
const score1El = document.getElementById('score--1');
//selecting elements so that you can manipulate them
const diceEl = document.querySelector('.dice');
//selecting current score element
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//selecting player element
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//select all the buttons
const btnNew = document.querySelector('.btn--new');
const btnRll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //setting the active player css
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// declare the variables outside functions
let scores, currentScore, activePlayer, playing;

//The initial conditions of starting the game
const init = function () {
  //Setting the internal score values to be 0
  // the reason of setting players 0 and 1 is that we
  //need to store the scores in an array
  scores = [0, 0];
  //declare a current score variable
  currentScore = 0;
  //delcare a active player variable
  activePlayer = 0;
  playing = true;
  //Setting the UI part of scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //Hide the dice
  diceEl.classList.add('hidden');
  //remove player--winner class
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  //add the active--player class
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

//Call the function when page is reload
init();
//rolling dice functionality
btnRll.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. display dice
    //(first need to remove the hidden class to show the dice)
    diceEl.classList.remove('hidden');
    //write the source reference using template literal
    diceEl.src = `dice-${dice}.png`;

    //3. check if rolled 1
    if (dice !== 1) {
      //3.1 Add dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore; //need to modify this
      // dynamically adding the score to the active player's current score.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // //3.2 Switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // //setting the active player css
      // player0.classList.toggle('player--active');
      // player1.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

//Hold btn functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to total score
    scores[activePlayer] += currentScore;
    //display the score on the element
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check is score is >=100>, Y --> current player wins
    //3. if not switch player/
    if (scores[activePlayer] < 100) {
      //switch player
      switchPlayer();
    } else {
      //current player wins
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //   } else {
    //     console.log(`${activePlayer} wins`);
    //   }
  }
});

//Retting the game
btnNew.addEventListener('click', init);
