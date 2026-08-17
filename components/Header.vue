<script setup>
</script>

<template>
  <div id="bar">
    <div>
      <span class="link"><NuxtLink to="/">Home</NuxtLink></span>
      <span class="link"><NuxtLink to="/teams">Teams</NuxtLink></span>
      <span class="link"><NuxtLink to="/weekly">Weekly Matchups</NuxtLink></span>
    </div>
  </div>
  <div style="height: 70px;" />
</template>

<style scoped>
#bar {
    padding: 20px;
    position: fixed;
    display: flex;
    width: 100%;
    height: 70px;
    color: white;
    background-color: black;
    box-sizing:border-box;
    align-items: center;
    justify-content: space-between;
}
#title1 {
    user-select: none;
    font-weight: bold;
    font-style: normal;
    font-size: 36px;
}
#title2 {
    user-select: none;
    font-style: normal;
    font-size: 36px;
    color: #C9C9C9;
    padding-right: 20px;
}
.link + .link {
    padding-left: 20px;
}
a {
    user-select: none;
    color: #C9C9C9;
    height: 100%;
    text-decoration: none;
}
a:hover {
    user-select: none;
    color: white;
    height: 100%;
    background-image: linear-gradient(black, white);
}
</style>