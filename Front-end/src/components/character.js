class Character {
    constructor(characterJson) {
        this.name = characterJson.name
        this.rpgclass = characterJson.rpgclass
        this.health = characterJson.health
        this.defence = characterJson.defence
    }

    playerName() {
        return this.name
    }

    
    playerRpgclass() {
        return this.rpgclass
    }

    
    playerHealth() {
        return this.health
    }

    
    playerDefence() {
        return this.defence
    }

}