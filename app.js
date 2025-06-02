const url = "https://pokeapi.co/api/v2/pokemon/";
let pokemonName = "pikachu";
const endpoint = url + pokemonName;

let enemyPokemonSprite = document.getElementById("enemyPokemonSprite");
console.log(enemyPokemonSprite);

fetch(endpoint)
    .then(response => {
        
        return response.json();
    })
    .then(data => {
        let sprite = data.sprites.front_default;
        console.log(data.sprites.front_default);
        
        enemyPokemonSprite.src = sprite;
    });






    


