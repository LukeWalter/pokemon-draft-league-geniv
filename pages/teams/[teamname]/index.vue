<template>
    <div>
      <span class="link"><NuxtLink to="/teams">< Teams</NuxtLink></span>
      <Team :name="teamname" />
      <li v-for="(item, index) in matchups">
        <MatchViewer :team1="teamname" :team2="item" :week="index + 1" />
      </li>
    </div>
</template>
  
<script setup>
import teams from "../assets/data/teams.json";
const { teamname } = useRoute().params;
const matchups = teams[teamname]["matchups"];
</script>
  
<style scoped>
#__nuxt {
    background: "bg-slate-900";
}
p {
    font-size: 24px;
}
img {
    width: 136px;
    height: 112px;
}
.container {
    display: flex;
    justify-content: center;
}
iframe {
    height: 475px;
    width: 100vw;
}
.link {
    font-size: 20px;
    color: black;
    cursor: pointer;
}
.link:hover {
    color: grey;
}
</style>