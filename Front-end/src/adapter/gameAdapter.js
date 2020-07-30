class GameAdapter {
    constructor() {
        this.characterURL = 'http://localhost:3000/characters'
        this.weaponURL = 'http://localhost:3000/weapons'
    }

    getCharacters() {
        return fetch(this.characterURL).then(response => response.json())
    }

    createCharacter(name, rpgclass, health, defence) {
        const character = {
            name: name,
            rpgclass: rpgclass,
            health: health,
            defence: defence,
        }
    
        return fetch(this.characterURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ character }),
        }).then(res => res.json())
    }




    getCharacterWeapons(id) {
        return fetch(`${this.characterURL}/${id}/weapons`).then(response => response.json())
    }


    createWeapon(name, design, power, defence, playerId) {
        const weapon = {
            name: name,
            design: design,
            power: power,
            defence: defence,
            character_id: playerId,
        }

        return fetch(this.weaponURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ weapon }),
        }).then(res => res.json())
    }  

//LEVEL UP FETCH
updateCharacterLevel(defence, id) {
    const character = {
        defence: defence
    }

    return fetch(`${this.characterURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({character}),
    }).then(res => res.json())
}

    
}