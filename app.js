const playerPokemonList = [];
const enemyPokemonList = [];
const MAX_POKEMON_PER_SIDE = 3;

const url = "https://pokeapi.co/api/v2/pokemon/";


//! Menu DOM
const fightButton = document.getElementById("fight-button");
const pokemonButton = document.getElementById("pokemon-button");
const helpButton = document.getElementById("help-button");
const menuDynamicText = document.getElementById("menu-dynamic-text");
const gameResultText = document.getElementById("gameResult");

//! Function that changes game text (plug in text as arg)
function showDynamicText(string) {
    menuDynamicText.textContent = string;
    console.log(string);
}
showDynamicText("Hello World.");

//! Function that displays your moveset, to be called when fight button clicked
//? We define this leftSideTextBox because this is the parent element/div that holds either the dynamic game text (p) or the moveset buttons depending on what we amend to it. (By default, contains p tag of dynamic game text)
const leftSideTextBox = document.getElementById("left-side-text-box");


//! Enemy DOM
const enemyPokemonName = document.getElementById("current-enemy-name");
const enemyPokemonSprite = document.getElementById("enemy-pokemon-sprite");
const enemyPokemonBaseHP = document.getElementById("enemy-base-hp");
const enemyPokemonRemainingHP = document.getElementById("current-enemy-hp-actual");
const enemyHealthBar = document.getElementById("enemy-green-bar");


//! Player DOM
const playerPokemonName = document.getElementById("current-player-name");
const playerPokemonSprite = document.getElementById("player-pokemon-sprite");
const playerPokemonBaseHP = document.getElementById("player-base-hp");
const playerPokemonRemainingHP = document.getElementById("current-player-hp-actual");
const playerHealthBar = document.getElementById("player-green-bar");





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
        const hp = hpStat ? hpStat.base_stat + 10 : "N/A"; //Base HP
        const startingHP = hp; //Starting HP equals base HP 
        const remainingHP = startingHP; // DISPLAYED starting/remaining HP
        
        const moves = data.moves;
        // Select predefined moveset for each (enemy) pokemon
        let availableMoves = [];
        if (pokemonName === "charmander") {
            availableMoves = [moves[3]["move"]["name"], moves[16]["move"]["name"]];
            console.log(availableMoves);
        }

          // Display this data in the DOM
        enemyPokemonName.textContent = name.replace(/^./, name[0].toUpperCase());
        enemyPokemonSprite.src = sprite;
        

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
        const hp = hpStat ? hpStat.base_stat + 10 : "N/A"; //Base HP
        const startingHP = hp; //Starting HP equals base HP 
        const remainingHP = startingHP; // DISPLAYED starting/remaining HP

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
        playerPokemonRemainingHP.textContent = remainingHP;
        enemyPokemonBaseHP.textContent = 49;
        enemyPokemonRemainingHP.textContent = 49;
        
        
        

        // Default dynamic text
        showDynamicText(`What will ${pokemonName.replace(/^./, name[0].toUpperCase())} do?`);

        // Show your moveset when fight button clicked
        let damageDoneTotal = 0; 
        let damageTakenTotal = 0;
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


                // Define the fight function:
                function useMoveToBeginRound() {   
                    moveButton.addEventListener("click", () => {
                    let baseDamage = 12;
                    let damageDoneThisRound = 0;
                    let damageTakenThisRound = 0;
                    let enemyMove;
                    let scratch = "scratch";
                    let ember = "ember";
                    let hitOrMiss;
                    let hitOrMissRNG = Math.floor(Math.random() * 9);
                    let hit = "(Hit)";
                    let miss = "(Miss)";
                    let enemyHealthPercentage;
                    let playerHealthPercentage;

                    
                    // the better the move, the worse the acc
                    if (move === "pound") { // pound 80% acc
                        
                        hitOrMissRNG;
                        if (hitOrMissRNG <= 7) {
                            hitOrMiss = hit;
                            damageDoneThisRound = baseDamage;
                        } else {
                            hitOrMiss = miss;
                            damageDoneThisRound = 0;
                        }
                    } else if (move === "water-gun") { // water-gun 50% acc 
                        hitOrMissRNG;
                        if (hitOrMissRNG <= 4) {
                            hitOrMiss = hit;
                            damageDoneThisRound = baseDamage * 2;
                        } else {
                            hitOrMiss = miss;
                            damageDoneThisRound = 0;
                        }
                    } else if (move === "ice-beam") { // ice-beam 100% acc
                        hitOrMiss = hit; // guaranteed hit
                        damageDoneThisRound = baseDamage / 2;
                    }
                    damageDoneTotal += damageDoneThisRound;
                    console.log("Damage done this round", damageDoneThisRound);
                    console.log("Damage done total", damageDoneTotal);
                    

                    //? Enemy moves after player
                    let enemyMoveRNG = Math.floor(Math.random() * 2);
                    let enemyHitOrMissRNG = Math.floor(Math.random() * 9);
                    let enemyHitOrMiss;
                    console.log(enemyMoveRNG, "enemy move rng");
                    if (enemyMoveRNG == 0) {
                        enemyMove = scratch; // enemy scratch 80% acc
                        enemyHitOrMissRNG;
                        if (enemyHitOrMissRNG <= 7) {
                            damageTakenThisRound = 20;
                            enemyHitOrMiss = hit;
                        } else {
                            damageTakenThisRound = 0;
                            enemyHitOrMiss = miss;
                        }
                    } else {
                        enemyMove = ember; // enemy ember 100% acc
                        enemyHitOrMissRNG;
                        enemyHitOrMiss = hit;
                        damageTakenThisRound = 10;
                    }
                    damageTakenTotal += damageTakenThisRound;
                    console.log("Total damage taken", damageTakenTotal);

                    enemyPokemonRemainingHP.textContent = 49 - damageDoneTotal;
                    playerPokemonRemainingHP.textContent = 63 - damageTakenTotal;
                    
                    // Update health bars (starting at width:100%)
                    enemyHealthPercentage = 100 - ((damageDoneTotal/49)*100);
                    enemyHealthBar.style.width = `${enemyHealthPercentage}%`;
                    playerHealthPercentage = 100 - ((damageTakenTotal/63)*100);
                    playerHealthBar.style.width = `${playerHealthPercentage}%`;


                    // Win/loss conditions
                    if (damageDoneTotal >= 49) {
                        if (damageTakenTotal >= 63) {
                            gameResultText.textContent = "Your Piplup has fainted... You lose!";
                        } else {
                            gameResultText.textContent = "Enemy Charmander has fainted... You win!";
                        }
                    } else if (damageTakenTotal >= 63) {
                        gameResultText.textContent = "Your Piplup has fainted... You lose!";
                    }
                    

                    showDynamicText(`You used ${move}`);
                    leftSideTextBox.innerHTML = '';
                    leftSideTextBox.appendChild(menuDynamicText);
                    showDynamicText(`${pokemonName.replace(/^./, name[0].toUpperCase())} used ${move} and did ${damageDoneThisRound} damage ${hitOrMiss}.
                    Enemy used ${enemyMove} and did ${damageTakenThisRound} damage ${enemyHitOrMiss}.`);
                })
                }
                useMoveToBeginRound();
                // What happens when you click a move
                // Call fight round function (you use a move and then enemy uses random move)
                
            });
            // Exit button
            let exitMovesetButton = document.createElement("button");
            exitMovesetButton.textContent = "(Exit)";
            leftSideTextBox.appendChild(exitMovesetButton);
            // What happens when you click the exit button:
            exitMovesetButton.addEventListener("click", () => {
                
                leftSideTextBox.innerHTML = '';
                leftSideTextBox.appendChild(menuDynamicText);
                showDynamicText(`What will ${pokemonName.replace(/^./, name[0].toUpperCase())} do?`);
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



