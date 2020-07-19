class Game {
    constructor(){
        this.gameContainer = document.getElementById('game-container');
        this.baddies = []
        this.playerCharacter = []
        this.playerWeapon = []
        this.adapter = new GameAdapter()
        this.getBaddies()
        this.renderNewPlayerForm()
        //load menu dom elements
        //fetch enemies?

    }

//Start Game
    startGame(){
        this.clearPage
        // set player constants and variables
        const player = this.playerCharacter[0]
        const weapon = this.playerWeapon[0] // create button for each item?
        let currentEnemy = 0
        let totalHealth = player.health
        let playerDefence = player.defence + weapon.defence;
        
        //set enemy const and variables
        const enemy = this.baddies[currentEnemy] // increment by 1 with each level
        let enemyHealth = enemy.health


        //Battle Div
        let battleDiv = document.createElement('div');
        battleDiv.id = 'battle-div'
        this.gameContainer.appendChild(battleDiv);

        //title elements
        let battleTitle = document.createElement('H2')
        battleTitle.innerText = `${player.name} vs ${enemy.name}`
        //starting Health Bars
        let displayPlayerHealth = document.createElement('H3')
        let displayEnemyHealth = document.createElement('H3')
        displayPlayerHealth.innerText = `Health - ${totalHealth}. / Defence - ${playerDefence}.`
        displayEnemyHealth.innerText = `Opponent Health - ${enemyHealth}`

        //Buttons
        let playerAttackButton = document.createElement('button')
        playerAttackButton.id = ('player-attack')
        playerAttackButton.innerHTML = "Attack!"

        let playerDefendButton = document.createElement('button')
        playerDefendButton.id = ('player-defend')
        playerDefendButton.innerHTML = "Defend!"

        console.log(`player health = ${totalHealth}`)
        console.log(`player defence = ${playerDefence}`)
        console.log(`enemy = ${enemy}`)
        console.log(`weapon = ${weapon}`)
        console.log(`player health test = ${displayPlayerHealth}`)

        //append all to Div
        // this.battleDiv.appendChild(displayPlayerHealth);
        // this.battleDiv.appendChild(displayEnemyHealth);
        // this.battleDiv.appendChild(playerAttackButton);
        // this.battleDiv.appendChild(playerDefendButton);
        // this.battleDiv.appendChild(battleTitle);

        // //Event listeners
        // playerAttackButton.addEventListener('click', event => this.attack(event, weapon))
        // playerDefendButton.addEventListener('click', event => this.defend(event))
        //set addlistener function for button as attack

        //set addlistener function for button as defence

        //game over funtion ++ current enemy

    }

    attack(event, weapon) {
        event.preventDefault();
        console.log(`weapon power = ${weapon.power}`)
        // let attackPower = determineAttack(weapon.power)
        // return attackPower
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

        let designSelect = document.createElement('select');
        designSelect.id = "design-select";
        designSelect.appendChild(new Option("Sword", "Sword"));
        designSelect.appendChild(new Option("Quarterstaff", "Quarterstaff"));
        designSelect.appendChild(new Option("Battle Axe", "Battle Axe"));
        designSelect.appendChild(new Option("Bow", "Bow"));
        weaponForm.appendChild(designSelect);

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
        let design = x['design-select'].value;
        let power = (design === 'Sword') ? 15 : ((design === 'Quarterstaff') ? 5 : ((design === 'Battle Axe') ? 20 : 10))
        let defence = (design === 'Sword') ? 5 : ((design === 'Quarterstaff') ? 15 : ((design === 'Battle Axe') ? 0 : 10))
        let playerId = this.playerCharacter.map(player => {return player.id})
        confirm(`A ${design}. . . are you sure?`)
        // console.log(`name = ${name},design = ${design},power = ${power},defence = ${defence},playerId = ${playerId}`)
        this.newWeapon(name, design, power, defence, `${playerId}`)
    }

    newWeapon(name, design, power, defence, playerId) {
        this.adapter.createWeapon(name, design, power, defence, playerId)
        .then(weapon =>{
            this.playerWeapon.push(new Weapon(weapon))
            console.log(this.playerWeapon)
            this.startGame()
        })
    }

    //helper functions

    clearPage(){
        this.gameContainer.innerHTML = "";
    }

    determineAttack(power) {
        return Math.floor(Math.random() * power);
    }

    isGameOver(health){
        return health <= 0;
        //returns boolean! (interesting...)
    }

    printHealthBars() {
        displayPlayerHealth.innerHTML = `Health - ${player.health}. / Defence - ${player.defence}.`
        displayEnemyHealth.innerHTML = `Opponent Health - ${enemy.health}`
    }


    
}