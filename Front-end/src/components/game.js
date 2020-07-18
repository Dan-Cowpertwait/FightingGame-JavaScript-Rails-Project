class Game {
    constructor(){
        this.gameContainer = document.getElementById('game-container');
        this.baddies = []
        this.totalplayerhealth = []
        this.playerCharacter = []
        this.playerWeapon = []
        this.adapter = new GameAdapter()
        this.getBaddies()
        this.renderNewPlayerForm()
        //load menu dom elements
        //fetch enemies?

    }

//RENDER FORMS
    renderNewPlayerForm() {
        let title = document.createElement('H2')
        title.innerHTML = "Welcome, Brave Champion! . .  Who are you again?"
        let newPlayerDiv = document.createElement('div');
        newPlayerDiv.id = 'new-player-div'
        this.gameContainer.appendChild(title);
        this.gameContainer.appendChild(newPlayerDiv);

        let playerForm = document.createElement('form');
        playerForm.id = "player-form"
        newPlayerDiv.appendChild(playerForm);

        let playerName = document.createElement('input');
        playerName.id = "player-name"
        playerName.setAttribute("type", "text");
        playerName.setAttribute("name", "name");
        playerName.setAttribute("placeholder", "Hero Name");
        playerForm.appendChild(playerName)

        let classSelect = document.createElement('select');
        classSelect.id = "class-select";
        classSelect.appendChild(new Option("Warrior", "Warrior"));
        classSelect.appendChild(new Option("Rogue", "Rogue"));
        classSelect.appendChild(new Option("Mage", "Mage"));
        playerForm.appendChild(classSelect);

        let submitNewPlayer = document.createElement('input')
        submitNewPlayer.id = 'player-submit-button'
        submitNewPlayer.setAttribute("type", "submit");
        playerForm.appendChild(submitNewPlayer)

        //todo - create icons as submit buttons to represent each class, pass event listener functions
        
        playerForm.addEventListener('submit', event => this.sendPlayerData(event))

    } // end of player form!

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
        submitWeapon.setAttribute("type", "submit");
        weaponForm.appendChild(submitWeapon)

        //todo - create icons as submit buttons to represent each class, pass event listener functions
        
        weaponForm.addEventListener('submit', event => this.sendWeaponData(event))

    } // end of weapon form!



    //Bad guys!!!
    getBaddies() {
        this.adapter.getCharacters()
        .then(characters =>  {
            characters.slice(0, 5).forEach(badguy => this.baddies.push(new Character(badguy)))
        }).then( () => {
            console.log(this.baddies)
        })

    }

    //CRUD ACTIONS

    //PLayer CRUD

    sendPlayerData(e){
        e.preventDefault();
        let x = document.getElementById('player-form').elements;
        let name = x['player-name'].value;
        let rpgclass = x['class-select'].value;
        let health = (rpgclass === 'Warrior') ? 150 : ((rpgclass === 'Rogue') ? 75 : 50)
        let defence = (rpgclass === 'Warrior') ? 0 : ((rpgclass === 'Rogue') ? 75 : 100)
        confirm(`${name}, the ${rpgclass}. . . are you sure?`)
        this.newPlayer(name, rpgclass, health, defence)
    }

    newPlayer(name, rpgclass, health, defence) {
        this.adapter.createCharacter(name, rpgclass, health, defence)
        .then(player =>{
            this.playerCharacter.push(new Character(player))
            console.log(this.playerCharacter)
            this.clearPage()
            this.renderNewWeaponForm()
        })
    }


   // Weapon CRUD

    sendWeaponData(e){
        e.preventDefault();
        let x = document.getElementById('weapon-form').elements;
        let name = x['weapon-name'].value;
        let type = x['type-select'].value;
        let power = (type === 'Sword') ? 15 : ((type === 'Quarterstaff') ? 5 : ((type === 'Battle Axe') ? 20 : 10))
        let defence = (type === 'Sword') ? 5 : ((type === 'Quarterstaff') ? 15 : ((type === 'Battle Axe') ? 0 : 10))
        let playerId = this.playerCharacter.map(player => {return player.id})
        confirm(`A ${type}. . . are you sure?`)
        this.newWeapon(name, type, power, defence, playerId)
    }

    newWeapon(name, rpgclass, health, defence, playerId) {
        this.adapter.createWeapon(name, rpgclass, health, defence, playerId)
        .then(weapon =>{
            this.playerWeapon.push(new Weapon(weapon))
            console.log(this.playerWeapon)
            // this.clearPage
        })
    }

    //helper functions

    clearPage(){
        this.gameContainer.innerHTML = "";
    }

    


    
}