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

    //opponents turn
    turnMessage.innerText = "Opponent's Turn!"
    setTimeout(() => {
        let opponentAttack = determineAttack(opponent.power)
        player.health -= opponentAttack;
        printToScreen();
        attackButton.disabled = false;
    }, 1000)
}

const printToScreen = () => {
    document.getElementById('opponent-health').innerText = opponent.health;
    document.getElementById('player-health').innerText = player.health;
}

const determineAttack = (power) => {
    return Math.floor(Math.random() * power);

}

// const gameMessages = () => {

// }
