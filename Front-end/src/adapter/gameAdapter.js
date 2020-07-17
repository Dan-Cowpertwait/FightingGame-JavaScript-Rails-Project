class GameAdapter {
    constructor() {
        this.characterURL = 'http://localhost:3000/characters'
        this.weaponURL = 'http://localhost:3000/weapons'
    }


    getCharacters() {
        return fetch(this.characterURL).then(response => response.json())
    }

    getCharacters() {
        return fetch(`${this.characterURL}/${id}/weapons`).then(response => response.json())
    }

    createCharacter(name, class, health, defence) {
        const character = {
            name: name,
            class: class,
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































}