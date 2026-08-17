<script setup>
import teams from "../assets/data/teams.json";
const teamList = Object.keys(teams);
</script>
<template>
  <div class="center">
    <li v-for="team in teamList">
      <div class="center">
        <Team class="teampage-team" :name="team" />
        <div class="link"><NuxtLink :to="'/teams/' + team">Go to Team Page</NuxtLink></div>
      </div>
      <hr style="color:black;height:3px;margin-top:70px;margin-bottom:25px;">
    </li>
  </div>
</template>

<style scoped>
.center {
  justify-content: center;
  align-items: center;
}
.link {
    color: black;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
}
.link:hover {
    color: grey;
}
hr {
  background-color: black;
}
</style>