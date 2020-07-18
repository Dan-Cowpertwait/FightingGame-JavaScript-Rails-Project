class Game {
    constructor(){
        this.gameContainer = document.getElementById('game-container');
        this.totalplayerhealth = []
        this.playerCharacter = []
        this.playerWeapon = []
        this.adapter = new GameAdapter()
        this.renderNewPlayerForm()
        //load menu dom elements
        //fetch enemies?

    }

//RENDER PLAYER FORM
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
        classSelect.appendChild(new Option("Warrior", "warrior"));
        classSelect.appendChild(new Option("Rogue", "rogue"));
        classSelect.appendChild(new Option("Mage", "warrior"));
        playerForm.appendChild(classSelect);

        let submitNewPlayer = document.createElement('input')
        submitNewPlayer.id = 'player-submit-button'
        submitNewPlayer.setAttribute("type", "submit");
        playerForm.appendChild(submitNewPlayer)

        //todo - create icons as submit buttons to represent each class, pass event listener functions
        
        playerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let x = document.getElementById('player-form').elements;
            let name = x['player-name'].value;
            let rpgclass = x['class-select'].value;
            console.log(name, rpgclass)
        })

    }






    
}