<script setup>

</script>

<template>
  <div id="menu">
    <span class="link"><NuxtLink to="/weekly/1">Week 1</NuxtLink></span>
    <span class="link"><NuxtLink to="/weekly/2">Week 2</NuxtLink></span>
    <span class="link"><NuxtLink to="/weekly/3">Week 3</NuxtLink></span>
    <span class="link"><NuxtLink to="/weekly/4">Week 4</NuxtLink></span>
    <span class="link"><NuxtLink to="/weekly/5">Week 5</NuxtLink></span>
    <span class="link"><NuxtLink to="/weekly/6">Week 6</NuxtLink></span>
    <span class="link"><NuxtLink to="/weekly/7">Week 7</NuxtLink></span>
  </div>
</template>

<style scoped>
#menu {
    display: block;
    padding: 50px;
}
.link {
    color: black;
    cursor: pointer;
}
.link:hover {
    color: grey;
}
.link + .link {
    padding-left: 20px;
}
</style>