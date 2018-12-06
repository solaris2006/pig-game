/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/*
    add an input field to the html where player can set winning score , so that they can change the predefined score of 100
*/
var scores, roundScore, activePlayer, gamePlaying, lastDice, winningScore, totalDice;

init();



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +  '</em>';

//var x = document.querySelector('#score-0').textContent;



document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //1. generate random number 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2. Display result
        var diceDom1 = document.querySelector('#dice1');
        var diceDom2 = document.querySelector('#dice2');

        diceDom1.style.display = 'block';
        diceDom1.src = 'dice-' + dice1 + '.png';

        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-' + dice2 + '.png';

        //3. Update round score IF result is not a   1
        if (dice1 !== 1 || dice2 !== 1) {

            totalDice = dice1 + dice2;


            //if  previous dice and actual dice are equal to 6, player loses general score and it is next player turn
            if (lastDice === 6 && totalDice === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else {
                lastDice = totalDice;
                //update round score
                roundScore += totalDice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }


        } else {

            //Next player
            nextPlayer();



        }
    }

})

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update UI

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            console.log(winningScore);
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();

        }
    }


})

document.querySelector('.btn-win').addEventListener('click', setWinScore);


function setWinScore() {


    winningScore = prompt("Please enter winning score");
    while (isNaN(winningScore)) {
        winningScore = prompt("Please enter a valid number");

        winningScore = parseInt(winningScore);
        if (winningScore < 10) {
            winningScore = prompt("Please enter a number greater than 10");
        }

        winningScore = undefined;
    }

    winningScore = parseInt(winningScore);
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.querySelector('.btn-win').textContent = 'Set wining score. Now is ' + winningScore;
    console.log(winningScore);


}


function nextPlayer() {
    lastDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    winningScore = 100;


    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-win').textContent = 'Set wining score. Now is ' + winningScore;




}