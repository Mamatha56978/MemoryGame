"use strict";
/*
 * Create a list that holds all of your cards
 */
var timeArea = document.getElementById("time");
var clickedCards = [];
var starSec = [...document.getElementsByClassName("fa-star")];
var matchedCard = document.getElementsByClassName("match");
var score1 = document.getElementById("score");
var deck1 = document.getElementById("deck");
var cardList = [].slice.call(document.getElementsByClassName("card"));
var movesSec = document.getElementById("moves");
var score = 0,
  moves = 0,
  starNum = 3;
let timePeriod = 0;
var timeStamp, seconds, minutes, hours;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
window.onload = newGame();
//function for starting of new game when window loads
function newGame() {
  var manipulatedcards = shuffle(cardList);
  for (var f = 0; f < manipulatedcards.length; f++) {
    deck1.append(manipulatedcards[f]);
  }
}
var m = 0;
while (m < cardList.length) {
  cardList[m].addEventListener("click", displayCard);
  m++;
}
//function for showing the cards
function displayCard() {
  if (timePeriod == 0) {
    timer();
    timePeriod = timePeriod + 1;
  }
  this.classList.add("card", "open", "show", "disable");
  clickedCards.push(this);
  if (clickedCards.length == 2) {
    moves = moves + 1;
    movesSec.innerHTML = moves;
    ratings();
    if (clickedCards[0].children[0].classList.item(1) == clickedCards[1].children[0].classList.item(1)) {
      score = score + 1;
      score1.innerHTML = score;
      clickedCards[0].classList.add("match", "disable");
      clickedCards[1].classList.add("match", "disable");
      if (matchedCard.length == 16) {
        clearInterval(timeStamp);
        // sweet alert for congratulating the player
        Swal.fire({
          title: 'Welldone!!!',
          html: 'U earned <strong style ="color:#fbf301; text-shadow:3px 3px 3px #000">' + starNum + ' <i class="fa fa-star"></i></strong> <br> Time used is <br>' + hours + 'hours ' + minutes + 'min ' + seconds + 'sec with ' + moves + ' moves',
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> PlayAgain',
        }).then(() => {
          document.location.reload();
        });
      }
      clickedCards = [];
    } else {
      clickedCards[0].classList.add("mismatch");
      clickedCards[1].classList.add("mismatch");
      clickedCards.map((item) => {
        setTimeout(() => {
          item.classList.remove("mismatch", "open", "show", "disable");
        }, 200);
      })
      clickedCards = [];
    }
  }
}
// function for ratings of stars
function ratings() {
  if (moves >= 8 && moves <= 14) {
    starNum = 2;
    starSec[2].style.display = "none";
  }
  if (moves >= 14) {
    starNum = 1;
    starSec[1].style.display = "none";
  }
}
//function for time changing
function timer() {
  seconds = 0,
    minutes = 0,
    hours = 0;
  timeStamp = setInterval(() => {
    seconds = seconds + 1;
    if (seconds == 60) {
      minutes = minutes + 1;
      seconds = 0;
    }
    if (minutes == 60) {
      minutes = 0;
      hours = hours + 1;
    }
    timeArea.innerHTML = hours + ":" + minutes + ":" + seconds;
  }, 1000)
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
