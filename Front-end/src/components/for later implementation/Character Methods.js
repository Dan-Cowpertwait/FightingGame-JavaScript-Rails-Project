
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

    //RENDER WEAPON FORM
    renderNewWeaponForm() {
        let title = document.createElement('H2')
        title.innerHTML = "Every Champion needs a weapon! Choose yours!"
        let newWeaponDiv = document.createElement('div');
        newWeaponDiv.id = 'new-weapon-div'
        this.gameContainer.appendChild(title);
        this.gameContainer.appendChild(newWeaponDiv);

        let weaponForm = document.createElement('form');
        weaponForm.id = "weapon-form"
        newWeaponDiv.appendChild(weaponForm);

        let weaponsName = document.createElement('input');
        weaponsName.id = "weapon-name"
        weaponsName.setAttribute("type", "text");
        weaponsName.setAttribute("name", "name");
        weaponsName.setAttribute("placeholder", "Nick-name");
        weaponForm.appendChild(weaponsName)

        let typeSelect = document.createElement('select');
        typeSelect.id = "type-select";
        typeSelect.appendChild(new Option("Sword", "Sword"));
        typeSelect.appendChild(new Option("Quarterstaff", "Quarterstaff"));
        typeSelect.appendChild(new Option("Battle Axe", "Battle Axe"));
        typeSelect.appendChild(new Option("Bow", "Bow"));
        weaponForm.appendChild(typeSelect);

        let submitWeapon = document.createElement('input')
        submitWeapon.id = 'weapon-submit-button'
        submitWeapon.setAttribute("type", "to battle!");
        weaponForm.appendChild(submitWeapon)

        //todo - create icons as submit buttons to represent each class, pass event listener functions
        
        weaponForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let x = document.getElementById('weapon-form').elements;
            let name = x['weapon-name'].value;
            let type = x['type-select'].value;
            let power = (type === 'Sword') ? 15 : ((type === 'Quarterstaff') ? 5 : ((type === 'Battle Axe') ? 20 : 10))
            let defence = (type === 'Sword') ? 5 : ((type === 'Quarterstaff') ? 15 : ((type === 'Battle Axe') ? 0 : 10))
            confirm(`A ${type}. . . are you sure?`)
            console.log(name, type, power, defence)
        })

    } // end of player form!