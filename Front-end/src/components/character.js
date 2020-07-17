class Character {
    constructor(characterJson) {
        this.name = characterJson.name
        this.class = characterJson.class
        this.health = characterJson.health
        this.defence = characterJson.defence
    }

    playerName() {
        return this.name
    }

    
    playerClass() {
        return this.class
    }

    
    playerHealth() {
        return this.health
    }

    
    playerDefence() {
        return this.defence
    }

}