const playerPokemonList = [];
const enemyPokemonList = [];
const MAX_POKEMON_PER_SIDE = 3;

const url = "https://pokeapi.co/api/v2/pokemon/";

let enemyPokemonSprite = document.getElementById("enemy-pokemon-sprite");
console.log(enemyPokemonSprite);

let playerPokemonSprite = document.getElementById("player-pokemon-sprite");



let pokemonName;

async function addPokemonToEnemyList() {
    for (let i = 1; i <= MAX_POKEMON_PER_SIDE; i++) {
        
        if (i == 1) {
            pokemonName = "pikachu";
            enemyPokemonList.push(pokemonName);
        } else if (i == 2) {
            pokemonName = "rayquaza";
            enemyPokemonList.push(pokemonName);
        } else if (i == 3) {
            pokemonName = "milotic"
            enemyPokemonList.push(pokemonName);
        } 

        let endpoint = url + pokemonName;

        try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        
        let sprite = data.sprites.front_default;
        enemyPokemonSprite.src = sprite;
        
    
        
        

        
        console.log(`Enemy pokemon list: ${enemyPokemonList}`);
        

        } catch (error) {
        console.error('Error fetching Pokemon:', error);
        }
    }
}

async function addPokemonToPlayerList() {
    for (let i = 1; i <= MAX_POKEMON_PER_SIDE; i++) {
        
        if (i == 1) {
            pokemonName = "gardevoir";
            playerPokemonList.push(pokemonName);
        } else if (i == 2) {
            pokemonName = "garchomp";
            playerPokemonList.push(pokemonName);
        } else if (i == 3) {
            pokemonName = "venusaur"
            playerPokemonList.push(pokemonName);
        } 

        let endpoint = url + pokemonName;

        try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        let sprite = data.sprites.back_default;
        playerPokemonSprite.src = sprite;
        
        
        console.log(`Player pokemon list: ${playerPokemonList}`);
        

        } catch (error) {
        console.error('Error fetching Pokemon:', error);
        }
    }
}

addPokemonToEnemyList();
addPokemonToPlayerList();

        



// fetch(endpoint)
//     .then(response => {
        
//         return response.json();
//     })
//     .then(data => {
//         let sprite = data.sprites.front_default;
//         console.log(data.sprites.front_default);
//         enemyPokemonSprite.src = sprite;
//     });






    


