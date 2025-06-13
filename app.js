const playerPokemonList = [];
const enemyPokemonList = [];
const MAX_POKEMON_PER_SIDE = 3;

const url = "https://pokeapi.co/api/v2/pokemon/";


//! Menu DOM
const fightButton = document.getElementById("fight-button");
const pokemonButton = document.getElementById("pokemon-button");
const helpButton = document.getElementById("help-button");
const menuDynamicText = document.getElementById("menu-dynamic-text");

//! Function that changes game text (plug in text as arg)
function showDynamicText(string) {
    menuDynamicText.textContent = string;
}
showDynamicText("Hello World.");

//! Function that displays your moveset, to be called when fight button clicked
//? We define this leftSideTextBox because this is the parent element/div that holds either the dynamic game text (p) or the moveset buttons depending on what we amend to it. (By default, contains p tag of dynamic game text)
const leftSideTextBox = document.getElementById("left-side-text-box");


//! Enemy DOM
const enemyPokemonName = document.getElementById("current-enemy-name");
const enemyPokemonSprite = document.getElementById("enemy-pokemon-sprite");
const enemyPokemonBaseHP = document.getElementById("enemy-base-hp");




//! Player DOM
const playerPokemonName = document.getElementById("current-player-name");
const playerPokemonSprite = document.getElementById("player-pokemon-sprite");
const playerPokemonBaseHP = document.getElementById("player-base-hp");

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



let charmander = "charmander";
let piplup = "piplup";
let milotic = "milotic";

let currentEnemyPokemon = charmander;
let currentPlayerPokemon = piplup;

function fetchEnemyPokemon(pokemonName) {
    fetch(url + pokemonName)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokemon not found!");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        const name = data.name;
        const sprite = data.sprites.front_default;
        const cry = data.cries.latest;
          // Get HP from stats
        const hpStat = data.stats.find(stat => stat.stat.name === "hp");
        const hp = hpStat ? hpStat.base_stat * 2 : "N/A";

          // Display this data in the DOM
        enemyPokemonName.textContent = name.replace(/^./, name[0].toUpperCase());
        enemyPokemonSprite.src = sprite;
        enemyPokemonBaseHP.textContent = hp;

        //cry plays when sprite clicked
        enemyPokemonSprite.addEventListener("click", () => {
            let cryAudio = new Audio(cry);
            cryAudio.volume = 0.15;
            cryAudio.play();
        });

        })
        .catch(error => {
        console.error("Error fetching Pokemon:", error);
        });
    }

function fetchPlayerPokemon(pokemonName) {
    fetch(url + pokemonName)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokemon not found!");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        const name = data.name;
        const sprite = data.sprites.back_default;
        const cry = data.cries.latest;
        // Get HP from stats
        const hpStat = data.stats.find(stat => stat.stat.name === "hp");
        const hp = hpStat ? hpStat.base_stat * 2 : "N/A";
        const moves = data.moves;
        // Select predefined moveset to show up for each (player) pokemon
        let availableMoves = [];
        if (pokemonName === "piplup") {
            availableMoves = [moves[0]["move"]["name"], moves[9]["move"]["name"], moves[12]["move"]["name"]];
            console.log(availableMoves);
        }

        // Display this data in the DOM
        playerPokemonName.textContent = name.replace(/^./, name[0].toUpperCase());
        playerPokemonSprite.src = sprite;
        playerPokemonBaseHP.textContent = hp;


        // Show your moveset when fight button clicked
        fightButton.addEventListener("click", () => {
            showPlayerMoveset();
            console.log("Fight button clicked.");
        });
        function showPlayerMoveset() {
            leftSideTextBox.removeChild(menuDynamicText);
            
            availableMoves.forEach(move => {
                let moveButton = document.createElement("button");
                moveButton.textContent = move;
                leftSideTextBox.appendChild(moveButton);
            });
            
        }

        //cry plays when sprite clicked
        playerPokemonSprite.addEventListener("click", () => {
            let cryAudio = new Audio(cry);
            cryAudio.volume = 0.15;
            cryAudio.play();
        });

        })
        .catch(error => {
        console.error("Error fetching Pokemon:", error);
        });
    }

fetchEnemyPokemon(currentEnemyPokemon);
fetchPlayerPokemon(currentPlayerPokemon);


