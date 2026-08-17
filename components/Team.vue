<script>
import { ref } from "vue";
import teams from "../assets/data/teams.json"
export default {
  props: {
    name: {
      type: String,
      default: "No Name Nancies",
    },
  },
  setup(props) {
    // console.log(props.name)
    const shortName = props.name;
    console.log(shortName)
    const teamInfo = teams[shortName]
    const teamName = teamInfo["full-name"];
    // console.log(teamName)
    // console.log(teamInfo)
    const pokemonList = [];
    for (const i in teamInfo["team"]) {
      const pokemon = teamInfo["team"][i];
      const variant = teamInfo["variants"][pokemon]
      // console.log(variant)
      pokemonList.push({
        "name": pokemon,
        "variant": variant
      })
    }
    // console.log(pokemonList)
    return { teamName, pokemonList, shortName };
  }
};
</script>

<template>
  <div class="team">
    <h1>{{ teamName }}</h1>
    <div class="mons">
      <li v-for="pokemon in pokemonList">
        <NuxtLink :to="'/teams/' + shortName + '/' + pokemon.name">
          <Pokemon v-if="pokemon.variant == undefined" :name="pokemon.name"></Pokemon>
          <Pokemon v-else :name="pokemon.name" :region="pokemon.variant"></Pokemon>
        </NuxtLink>
      </li>
    </div>
  </div>
</template>

<style scoped>
    .team {
        padding-top: 10px;
        padding-bottom: 40px;
    }
    .mons {
        display: flex;
        justify-content: center;
    }
    h1 {
        display: flex;
        justify-content: center;
        font-size: 40px;
        font-weight: bold;
    }
    li {
      list-style-type: none;
    }
</style>