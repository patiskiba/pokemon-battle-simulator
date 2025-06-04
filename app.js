const playerPokemonList = [];
const enemyPokemonList = [];
const MAX_POKEMON_PER_SIDE = 3;

// const url = "https://pokeapi.co/api/v2/pokemon/";
// let pokemonName = "pikachu";
// const endpoint = url + pokemonName;

let enemyPokemonSprite = document.getElementById("enemyPokemonSprite");
console.log(enemyPokemonSprite);



async function addPokemonToEnemyList() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
        const data = await response.json();
        console.log(data);
        let sprite = data.sprites.front_default;
        enemyPokemonSprite.src = sprite;
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
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






    


