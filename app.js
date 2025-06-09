const playerPokemonList = [];
const enemyPokemonList = [];
const MAX_POKEMON_PER_SIDE = 3;

const url = "https://pokeapi.co/api/v2/pokemon/";

let enemyPokemonSprite = document.getElementById("enemy-pokemon-sprite");
console.log(enemyPokemonSprite);

class Pokemon {
    constructor(name) {
        this.name = name;

    }
}

let pokemonName;

async function addPokemonToEnemyList() {
    for (let i = 1; i <= MAX_POKEMON_PER_SIDE; i++) {
        
        if (i == 1) {
            pokemonName = "pikachu";
        } else if (i == 2) {
            pokemonName = "rayquaza";
        } else if (i == 3) {
            pokemonName = "milotic"
        } 

        let endpoint = url + pokemonName;

        try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        let sprite = data.sprites.front_default;
        enemyPokemonSprite.src = sprite;
        
        

        

        } catch (error) {
        console.error('Error fetching Pokemon:', error);
        }
    }
}

addPokemonToEnemyList()

// fetch(endpoint)
//     .then(response => {
        
//         return response.json();
//     })
//     .then(data => {
//         let sprite = data.sprites.front_default;
//         console.log(data.sprites.front_default);
//         enemyPokemonSprite.src = sprite;
//     });






    


