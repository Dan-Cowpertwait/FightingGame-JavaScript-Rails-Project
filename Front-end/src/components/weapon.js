class Weapon {
    constructor(weaponJson) {
        this.name = weaponJson.name
        this.class = weaponJson.type
        this.health = weaponJson.power
        this.defence = weaponJson.defence
        this.id = weaponJson.id
        this.characterId = weaponJson.character_id
    }

    weaponName() {
        return this.name
    }

    
    weaponType() {
        return this.type
    }

    
    weaponPower() {
        return this.power
    }

    
    weaponDefence() {
        return this.defence
    }

}