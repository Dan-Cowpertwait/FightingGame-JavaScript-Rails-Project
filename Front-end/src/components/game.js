let player = {
    health: 100
    power: 20
}

let opponent = {
    health: 100
    power: 20
}

const printToScreen = () => {
    document.getElementById('opponent-health').innerText = opponent.health;
    document.getElementById('player-health').innerText = player.health;

}