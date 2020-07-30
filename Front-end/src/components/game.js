class Game {
    constructor(){
        //setup for HTML / Arrays
        this.gameContainer = document.getElementById('game-container');
        this.baddies = []
        this.playerCharacter = []
        this.playerWeapons = []
        this.playerWeapon = []

        //function calls
        this.adapter = new GameAdapter()
        this.getBaddies()
        this.renderNewPlayerForm()
        this.currentEnemy = -1

        this.baseURL = "http://localhost:3000/characters"


        // this.defineButton()
    }

    // defineButton(){
    //     this.sortButton = document.getElementById('button-sort')
    //     this.sortButton.addEventListener('click', event => this.buttonSort())
    // }


    // buttonSort(){
    //     console.log("Click")
    //     // return fetch(this.baseURL)
    //     // .then(response => response.json)
    //     // .then(data => {
    //     //     console.log(data)
    //     // })

    // }



//Start Game
    startGame(){
        this.clearPage()
        // set player constants and variables
        const player = this.playerCharacter[0]
        const weapon = this.playerWeapon[0]
        let totalHealth = player.health
        
        let playerDefence = player.defence + weapon.defence;
       
        this.currentPlayerHealth = totalHealth
        
        //set enemy const and variables
        const enemy = this.baddies[`${this.currentEnemy}`]
        let enemyHealth = enemy.health
        this.currentEnemyHealth = enemyHealth
        

        //Battle Div
        this.gameContainer.classList.toggle('battle-box')
        let playerDiv = document.createElement('div');
        playerDiv.classList.add('player-info')
        let enemyDiv = document.createElement('div');
        playerDiv.classList.add('enemy-info')
        
        this.gameContainer.appendChild(playerDiv);
        this.gameContainer.appendChild(enemyDiv);


        //title elements
        let playerTitle = document.createElement('H2')
        playerTitle.innerText = `${player.name}`
        let enemyTitle = document.createElement('H2')
        enemyTitle.innerText = `${enemy.name}`

        //starting Health Bars
        this.displayPlayerHealth = document.createElement('H3')
        this.displayEnemyHealth = document.createElement('H3')
        this.displayPlayerDefence = document.createElement('H3')
        this.displayPlayerHealth.innerText = `Health = ${totalHealth}.`
        this.displayPlayerDefence.innerText = `Defence = ${playerDefence}.`
        this.displayEnemyHealth.innerText = `Opponent Health = ${enemyHealth}`

        //Images
        this.playerPortraitDiv = document.createElement('div')
        this.playerPortraitDiv.classList.add(`Character${player.rpgclass}Idle`)
        this.playerPortrait = document.createElement('img')
        this.playerPortrait.classList.add(`Character${player.rpgclass}Idlespritesheet`)
        this.playerPortrait.setAttribute("src", `./assets/${player.rpgclass}-Idle.png`)
        this.playerPortraitDiv.appendChild(this.playerPortrait)


        //Images
        this.enemyPortraitDiv = document.createElement('div')
        this.enemyPortraitDiv.classList.add(`Character${enemy.rpgclass}Idle`)
        this.enemyPortrait = document.createElement('img')
        this.enemyPortrait.classList.add(`Character${enemy.rpgclass}Idlespritesheet`)
        this.enemyPortrait.setAttribute("src", `./assets/${enemy.rpgclass}-Idle.png`)
        this.enemyPortraitDiv.appendChild(this.enemyPortrait)
        let characterbreak = document.createElement('hr')


        //Buttons
        this.playerAttackButton = document.createElement('button')
        this.playerAttackButton.id = ('player-attack')
        this.playerAttackButton.innerHTML = "Attack!"
        this.playerAttackButton.classList.add('battle-button')

        this.playerDefendButton = document.createElement('button')
        this.playerDefendButton.id = ('player-defend')
        this.playerDefendButton.innerHTML = "Defend!"
        this.playerDefendButton.classList.add('battle-button')

        //append all to Div
        playerDiv.appendChild(playerTitle);
        playerDiv.appendChild(this.displayPlayerHealth);
        playerDiv.appendChild(this.displayPlayerDefence);
        playerDiv.appendChild(this.playerAttackButton);
        playerDiv.appendChild(this.playerDefendButton);
        playerDiv.appendChild(this.playerPortraitDiv);


        enemyDiv.appendChild(enemyTitle);
        enemyDiv.appendChild(this.displayEnemyHealth);
        enemyDiv.appendChild(characterbreak)
        enemyDiv.appendChild(this.enemyPortraitDiv);
        

        //Event listeners
        this.playerAttackButton.addEventListener('click', event => this.attack(event, weapon, enemy, player))
        this.playerDefendButton.addEventListener('click', event => this.defend(event, playerDefence, enemy, player))


    }

    attack(event, weapon, enemy, player) {
        event.preventDefault();

        let playerAttack = this.determineAttack(weapon.power)

        //attack logic
        this.currentEnemyHealth -= playerAttack
        alert(`your ${weapon.name} ${weapon.type} did ${playerAttack} damage!`);
        this.printHealthBarsOnAttack(this.currentPlayerHealth, this.currentEnemyHealth)


        this.playerAttackButton.disabled = true;
        this.playerDefendButton.disabled = true;

        if (this.enemyDefeated(this.currentEnemyHealth)){
            this.clearPage()
            if (this.currentEnemy === 5) {
                this.victorious()
            } else {
                alert(`VICTORIOUS!!!`)
                this.levelUP()
                return;
            }
        }

        setTimeout(() => {

            let opponentAttack = this.determineAttack(enemy.defence)
            this.currentPlayerHealth -= opponentAttack
            alert(`you took ${opponentAttack} damage!`);
            this.printHealthBarsOnAttack(this.currentPlayerHealth, this.currentEnemyHealth)

            if (this.isGameOver(this.currentPlayerHealth)){
                this.clearPage()
                alert(`Your champion... has fallen`)
            }

            if (this.isDefenceBroken(this.currentPlayerHealth)){
                alert(`Your defense is broken!!!`)
                this.playerDefendButton.disabled = true;
            }else {
                this.playerDefendButton.disabled = false;
            }
        this.playerAttackButton.disabled = false;
        },1000)

    }

    defend(event, defence, enemy, player) {
        event.preventDefault();

        let playerDefence = defence

        //defence logic
        alert(`Defence up!!!`);
        this.playerAttackButton.disabled = true;
        this.playerDefendButton.disabled = true;

        setTimeout(() => {
            let opponentAttack = this.determineAttack(enemy.defence)
            playerDefence -= opponentAttack
            alert(`Your defence took ${opponentAttack} damage!`);
            this.printHealthBarsonDefend(playerDefence)

            if (this.isDefenceBroken(playerDefence)){
                alert(`Your defense is broken!!!`)
                this.playerDefendButton.disabled = true;
            }else {
                this.playerDefendButton.disabled = false;
            }
            this.playerAttackButton.disabled = false;
        },1000)
    }


    isGameOver = (health) => {
        return health <= 0;
    }

    isDefenceBroken = (defence) => {
        return defence <= 0;
    }

    enemyDefeated = (health) => {
        return health <= 0;
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
        let result = confirm(`${name}, the ${rpgclass}. . . are you sure?`);
        if (result) {
            this.newPlayer(name, rpgclass, health, defence)
        }
    }

    newPlayer(name, rpgclass, health, defence) {
        this.adapter.createCharacter(name, rpgclass, health, defence)
        .then(player =>{
            this.playerCharacter.push(new Character(player))
            // console.log(this.playerCharacter)
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
        let result = confirm(`A ${design}. . . are you sure?`)
        if (result) {
            this.newWeapon(name, design, power, defence, `${playerId}`)
        }
       
    }
    

    newWeapon(name, design, power, defence, playerId) {
        this.currentEnemy++
        this.adapter.createWeapon(name, design, power, defence, playerId)
        .then(weapon =>{
            this.playerWeapons.push(new Weapon(weapon))
            if (this.currentEnemy <= 0) {
                this.playerWeapon.push(weapon)
                // console.log("OH NO!")
                this.startGame()
            } else { 
                // console.log("DOUBLE OH NO!")
                this.renderWeaponChoice()
            }
        })
    }


//LEVEL UP

    levelUP(){
        let player = this.playerCharacter[0]
        let id = player.id
        let defence = player.defence + 10
        // this.adapter.updateCharacterLevel(defence, id)
        // .then(player => {
        //     this.playerCharacter = []
        //     this.playerCharacter.push(new Character(player))
        //     alert(`Level up!!! Defence increased by 10`)
        // })
        this.createNewWeaponChoice()
   }



//helper functions

    victorious(){
        this.clearPage()
        let title = document.createElement('H2')
        title.innerHTML = "You have vanquished the monsters, hail to the champion!!!"
        this.gameContainer.appendChild(title)
    }

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

    printHealthBarsOnAttack(playerHealth, enemyHealth) {
        this.displayPlayerHealth.innerHTML = `Health - ${playerHealth}.`
        this.displayEnemyHealth.innerHTML = `Opponent Health - ${enemyHealth}`
    }

    printHealthBarsonDefend(playerDefence) {
        this.displayPlayerDefence.innerHTML = `Defence - ${playerDefence}.`
    }

    chooseWeapon(e){
        e.preventDefault();
        let x = document.getElementById('weapon-choice-form').elements;
        let weaponname = x['weapon-select'].value;
        let newWeapon = this.playerWeapons.filter(weapon => weapon.name == weaponname)
        let selected = newWeapon[0]
        this.playerWeapon.length = 0
        this.playerWeapon.push(selected)
        console.log(this.playerWeapon)
        this.startGame()
    }

    createNewWeaponChoice(){
        let player = this.playerCharacter[0]
        let id = player.id
        let enemy = this.baddies[`${this.currentEnemy}`]
        let weaponTypes = [`Spear`, `Orb`, `Ichor`, `Power`, `Sword`, `Axe`, `Knives`]
        let weaponName = enemy.name
        let design = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
        let power = enemy.defence * 2
        let weaponDefence = enemy.health * 2
    this.newWeapon(weaponName, design, power, weaponDefence, id)
   }


//Bad guys!!!
    getBaddies() {
        this.adapter.getCharacters()
        .then(characters =>  {
            characters.slice(0, 5).forEach(badguy => this.baddies.push(new Character(badguy)))
        }).then( () => {
            // console.log(this.baddies)
        })

    }


    
//RENDER FORMS
renderNewPlayerForm() {
    let title = document.createElement('H2')
    title.innerHTML = "Welcome Hero! . . . Who are you again?"
    title.classList.add('title-text')
    let newPlayerDiv = document.createElement('div');
    newPlayerDiv.id = 'new-player-div'
    newPlayerDiv.appendChild(title);
    
    let playerForm = document.createElement('form');
    playerForm.id = "player-form"
    playerForm.classList.add('formflex')
    
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
    newPlayerDiv.appendChild(playerForm);
    
    this.gameContainer.appendChild(newPlayerDiv);
    //todo - create icons as submit buttons to represent each class, pass event listener functions
    
    playerForm.addEventListener('submit', event => this.sendPlayerData(event))

} // end of player form!

//RENDER WEAPON FORM
renderNewWeaponForm() {
    let title = document.createElement('H2')
    title.innerHTML = "It's Dangerous to go alone, surely you have a weapon?"
    title.classList.add('title-text')
    let newWeaponDiv = document.createElement('div');
    newWeaponDiv.id = 'new-weapon-div'
    newWeaponDiv.appendChild(title);
    
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
    
    this.gameContainer.appendChild(newWeaponDiv);
    //todo - create icons as submit buttons to represent each class, pass event listener functions
    
    weaponForm.addEventListener('submit', event => this.sendWeaponData(event))
    
} // end of weapon form!

renderWeaponChoice(){
    const player = this.playerCharacter[0]
    // this.playerWeapons.length = 0
    this.adapter.getCharacterWeapons(player.id) 
    .then(weapon => {
        weapon.forEach(w => this.playerWeapons.push(new Weapon(w)))
    })

    let weaponChoiceForm = document.createElement('form');
    weaponChoiceForm.id = "weapon-choice-form"
    weaponChoiceForm.classList.add('formflex')

    let weaponChoice = document.createElement('select');
    weaponChoice.id = "weapon-select";
    this.playerWeapons.forEach(w =>  weaponChoice.appendChild(new Option(`${w.name} ${w.design}`, `${w.name}`)));
    weaponChoiceForm.appendChild(weaponChoice);

    let submitNewWeapon = document.createElement('input')
    submitNewWeapon.id = 'weapon-submit-button'
    submitNewWeapon.setAttribute("type", "submit");
    weaponChoiceForm.appendChild(submitNewWeapon)

    weaponChoiceForm.addEventListener('submit', event => this.chooseWeapon(event))

    this.gameContainer.appendChild(weaponChoiceForm)


}

    
}

