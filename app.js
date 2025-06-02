const url = "https://pokeapi.co/api/v2/pokemon/";
let pokemonName = "pikachu";
const endpoint = url + pokemonName;



fetch(endpoint)
    .then(response => {
        
        return response.json();
    })
    .then(data => console.log(data.sprites.front_default));






    


