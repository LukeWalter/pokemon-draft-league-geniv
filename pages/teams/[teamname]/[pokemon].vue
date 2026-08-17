<template>
    <span class="link"><NuxtLink :to="'/teams/' + teamname">< {{ team }}</NuxtLink></span>
    <div class="center">
        <PokemonDetails :name="pokemon" margin="100px"/>
        <iframe :src="link"></iframe>
    </div>
</template>
  
<script setup>
import teams from "../assets/data/teams.json";
import PokemonDetails from "../components/PokemonDetails.vue";
const { teamname, pokemon } = useRoute().params;
// console.log(teamname);
// console.log(pokemon);
const link = "https://dex.pokemonshowdown.com/pokemon/" + pokemon
const team = teams[teamname]["full-name"];
</script>
  
<style scoped>
h1 {
    font-weight: bold;
    display: flex;
    justify-content: center;
    font-size: 30px;
    padding: 50px;
}
iframe {
    height: 1000px;
    width: 1300px;
}
.center {
    display: block;
    justify-content: center;
    align-items: center;
}
</style>