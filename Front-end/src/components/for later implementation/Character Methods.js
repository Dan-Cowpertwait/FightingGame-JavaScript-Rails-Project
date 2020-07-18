
//NEW PLAYER FUNCTION
newPlayer(e) {
    e.preventDefault()
    const value = //form values by class

    this.adapter.createCharacter(name, rpgclass, health, defence).then(characterdata => {
        this.playerCharacter.push(new Character(characterdata))
        //call remove elements function
        //open weapon creation
    })
}

//NEW WEAPON FUNCTION
newWeapon(e) {
    e.preventDefault()
    const value = //form values by class

    this.adapter.createWeapon(name, type, power, defence, id).then(weapondata => {
        this.playerWeapon.push(new Weapon(weapondata))
        //call remove elements function
        //start game
    })
}

//LEVEL UP... YEET
levelUp(id, health) {
    this.adapter.updateCharacterLevel(id, health).then(newdata => {
        //clear character array
        //add new data
        // next level
    })
}

