
//GET FETCHES

getCharacters() {
    return fetch(this.characterURL).then(response => response.json())
}

getCharacterWeapons() {
    return fetch(`${this.characterURL}/${id}/weapons`).then(response => response.json())
}


//CREATE CHARACTER FETCH

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


//LEVEL UP FETCH
updateCharacterLevel(value, id) {
    const character = {
        value: health
    }

    return fetch(`${this.characterURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({character}),
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

