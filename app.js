const playerPokemonList = [];
const enemyPokemonList = [];
const MAX_POKEMON_PER_SIDE = 3;

const url = "https://pokeapi.co/api/v2/pokemon/";

let enemyPokemonSprite = document.getElementById("enemy-pokemon-sprite");
console.log(enemyPokemonSprite);

let playerPokemonSprite = document.getElementById("player-pokemon-sprite");



let pokemonName;

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
        
        
        let sprite = data.sprites.front_default;
        enemyPokemonSprite.src = sprite;
        
    
        
        

        
        console.log(`Enemy pokemon list: ${enemyPokemonList}`);
        

        } catch (error) {
        console.error('Error fetching Pokemon:', error);
        }
    }
}

async function addPokemonToPlayerList() {
    
        
        // j represents the place in the array of team starting at 0
        for (let j = 0; j < MAX_POKEMON_PER_SIDE; j++) {

            // i represents the # pokemon starting at 1
    for (let i = 1; i <= MAX_POKEMON_PER_SIDE; i++) {

            if (i == 1) {
            pokemonName = "gardevoir";
            
            } else if (i == 2) {
                pokemonName = "garchomp";
                
            } else if (i == 3) {
                pokemonName = "venusaur"
                
            } 

            let endpoint = url + pokemonName;

            try {
            const response = await fetch(endpoint);
            const data = await response.json();
            
            let sprite = data.sprites.back_default;
            playerPokemonSprite.src = sprite;
            
            
            playerPokemonList.push(new PokemonObject(data));
            

            
            

            } catch (error) {
            console.error('Error fetching Pokemon:', error);
            }
        }
        return playerPokemonList[j];
    }
}

addPokemonToEnemyList();
addPokemonToPlayerList();
console.log("Player list: ", playerPokemonList);
        



// fetch(endpoint)
//     .then(response => {
        
//         return response.json();
//     })
//     .then(data => {
//         let sprite = data.sprites.front_default;
//         console.log(data.sprites.front_default);
//         enemyPokemonSprite.src = sprite;
//     });






    


