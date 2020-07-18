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

//CREATE WEAPON FETCH
    createWeapon(name, type, power, defence, id) {
        const weapon = {
            name: name,
            type: type,
            power: power,
            defence: defence,
        }

        return fetch(this.weaponURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ weapon }),
        }).then(res => res.json())
    }  

    
}