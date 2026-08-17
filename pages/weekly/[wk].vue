<!-- /weekly/:week -->

<template>
  <div>
    <span class="link"><NuxtLink to="/weekly">< Weekly Matchups</NuxtLink></span>
    <h1>Week {{ wk }} Matches</h1>
    <li v-for="m in matchups">
      <MatchViewer :team1="m.team1" :team2="m.team2" :week="wk"/>
    </li>
    
  </div>
</template>

<script setup>
import teams from "../assets/data/teams.json";
const { wk } = useRoute().params;

const populateMatches = () => {
  const matchupList = [];
  Object.entries(teams).forEach(([key, value]) => {
    var team1 = key;
    var team2 = value["matchups"][wk - 1];
    if (!(matchupList.map((m) => m.team1).includes(team2))) {
      matchupList.push({
        team1: team1,
        team2: team2
      });
    }
    console.log(team1);
    console.log(team2);
  });
  return matchupList;
};

const matchups = populateMatches();

</script>

<style scoped>
h1 {
  font-size: 50px;
  align-items: center;
  justify-content: center;
  justify-content: center;
  display: flex;
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