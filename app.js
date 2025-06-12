const playerPokemonList = [];
const enemyPokemonList = [];
const MAX_POKEMON_PER_SIDE = 3;

const url = "https://pokeapi.co/api/v2/pokemon/";

let enemyPokemonSprite = document.getElementById("enemy-pokemon-sprite");
console.log(enemyPokemonSprite);

let playerPokemonSprite = document.getElementById("player-pokemon-sprite");



// let pokemonName;



//! Each pokemon is an object
class PokemonObject {
    constructor(data) {
        this.name = data.name;
        this.sprite = data.sprites.front_default;
        this.cry = data.cries.latest;
        this.ability = data.abilities; //needs to be picked out later
        this.type = data.types;
        this.moves = data.moves; //needs to be picked out later
        this.stats = data.stats;
    }
}


// //! Get data from pokeapi for specific pokemon and create pokemonobject
// async function getPokemonData(pokemonName) {
//     let endpoint = url + pokemonName;
//     try {
//             const response = await fetch(endpoint);
//             const data = await response.json();
//             return data;
//     } catch (error) {
//             console.error('Error fetching Pokemon:', error);
//             }
// }



let currentPokemon = "charmander";
let pokemon = fetch(url + currentPokemon);

pokemon
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        console.log(data);
        const charmander = new PokemonObject(data);
        console.log(charmander);
        return charmander;
    });
    
























// //! Add a pokemon object to each team list
// async function addPokemonToEnemyList() {
    
        
//         // j represents the place in the array of team starting at 0
//         for (let j = 0; j < MAX_POKEMON_PER_SIDE; j++) {

//             // i represents the # pokemon starting at 1
//     for (let i = 1; i <= MAX_POKEMON_PER_SIDE; i++) {

//             if (i == 1) {
//             pokemonName = "pikachu";
            
//             } else if (i == 2) {
//                 pokemonName = "rayquaza";
                
//             } else if (i == 3) {
//                 pokemonName = "milotic"
                
                
//             } 

//             let endpoint = url + pokemonName;

//             try {
//             const response = await fetch(endpoint);
//             const data = await response.json();
            
//             let sprite = data.sprites.front_default;
//             enemyPokemonSprite.src = sprite;
            
            
//             enemyPokemonList.push(new PokemonObject(data));
            
            

            
            

//             } catch (error) {
//             console.error('Error fetching Pokemon:', error);
//             }
//         }
//         return enemyPokemonList[j];
//     }
// }

// async function addPokemonToPlayerList() {
    
        
//         // j represents the place in the array of team starting at 0
//         for (let j = 0; j < MAX_POKEMON_PER_SIDE; j++) {

//             // i represents the # pokemon starting at 1
//     for (let i = 1; i <= MAX_POKEMON_PER_SIDE; i++) {

//             if (i == 1) {
//             pokemonName = "gardevoir";
            
//             } else if (i == 2) {
//                 pokemonName = "garchomp";
                
//             } else if (i == 3) {
//                 pokemonName = "venusaur"
                
//             } 

//             let endpoint = url + pokemonName;

//             try {
//             const response = await fetch(endpoint);
//             const data = await response.json();
            
//             let sprite = data.sprites.back_default;
//             playerPokemonSprite.src = sprite;
            
            
//             playerPokemonList.push(new PokemonObject(data));
            

            
            

//             } catch (error) {
//             console.error('Error fetching Pokemon:', error);
//             }
//         }
//         return playerPokemonList[j];
//     }
// }

//! Pick moves and ability of each pokemon object
// Declare a variable for each pokemon object so it is easy to use



// choose ability
// choose moveset






//! Make first pokemon in list be current pokemon (the pokemon on screen)







//! Get correct current pokemon information on screen (name, hp, etc)

// addPokemonToEnemyList();
// addPokemonToPlayerList();

// console.log("Enemy list: ", enemyPokemonList);
// console.log("Player list: ", playerPokemonList);

// console.log()

// milotic = enemyPokemonList[2];
// console.log(milotic);        


// fetch(endpoint)
//     .then(response => {
        
//         return response.json();
//     })
//     .then(data => {
//         let sprite = data.sprites.front_default;
//         console.log(data.sprites.front_default);
//         enemyPokemonSprite.src = sprite;
//     });






    


