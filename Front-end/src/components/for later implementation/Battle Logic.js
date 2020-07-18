<!-- <h3>Opponents Health <span id="opponent-health"></span></h3>
<h3>Player Health <span id="player-health"></span></h3>

<button id="attack-button" onclick="attack()">Hit em!</button>
<h3 id="damage-message"></h3>
<h3 id="turn-message"></h3>
<h3 id="game-message"></h3> -->



let player = {
    health: 100,
    power: 20
}

let opponent = {
    health: 100,
    power: 20
}

const attack = () => {
    //variables
    let attackButton = document.getElementById('attack-button');
    let turnMessage = document.getElementById('turn-message');
    //player turn
    let playerAttack = determineAttack(player.power)
    opponent.health -= playerAttack;
    document.getElementById('damage-message').innerText = `you did ${playerAttack} damage`;
    printToScreen();
    
    attackButton.disabled = true;
    if (isGameOver(opponent.health)){
        gameOver("You Won!")
        //return without argument causes funtions to stop running!
    }

    //opponents turn
    turnMessage.innerText = "Opponent's Turn!"
    setTimeout(() => {
        let opponentAttack = determineAttack(opponent.power)
        player.health -= opponentAttack;
        document.getElementById('damage-message').innerText = `you took ${opponentAttack} damage!`;
        printToScreen();

        if (isGameOver(player.health)){
            gameOver("You Lose!")

        }
        attackButton.disabled = false;
        turnMessage.innerText = "Your Turn!"
    }, 1000)
}

const printToScreen = () => {
    document.getElementById('opponent-health').innerText = opponent.health;
    document.getElementById('player-health').innerText = player.health;
}

const determineAttack = (power) => {
    return Math.floor(Math.random() * power);

}

const isGameOver = (health) => {
    return health <= 0;
    //returns boolean! (interesting...)
}

const gameOver = (message) => {
    let gameMessage = document.getElementById('game-message');
    gameMessage.innerText = message
    attackButton.hidden = true;
    return;
}

// const gameMessages = () => {

// }
