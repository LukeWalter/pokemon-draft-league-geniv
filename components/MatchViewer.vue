<script>
import { computed, ref } from "vue";
import { RxCaretLeft, RxCaretRight, RxEnterFullScreen, RxExitFullScreen } from 'vue-icons-plus/rx';
import teams from "../assets/data/teams.json";
export default {
  props: {
    team1: {
      type: String,
      default: "cloudy"
    },
    team2: {
      type: String,
      default: "friends"
    },
    week: {
        type: String,
        default: "2"
    }
  },
  components: {
    RxEnterFullScreen,
    RxExitFullScreen,
    RxCaretLeft,
    RxCaretRight
  },
  setup(props) {
    console.log(props.week);
    const matchLink1 = "/matches/wk" + props.week + "/g1-" + props.team1 + "-" + props.team2 + ".html";
    const matchLink2 = "/matches/wk" + props.week + "/g2-" + props.team1 + "-" + props.team2 + ".html";
    const matchLink3 = "/matches/wk" + props.week + "/g3-" + props.team1 + "-" + props.team2 + ".html";
    const matchLinks = [ matchLink1, matchLink2, matchLink3 ];
    const curr = ref(0);
    console.log(matchLink1 + "|" + matchLink2 + "|" + matchLink3 + "|");
    const team1 = teams[props.team1]["full-name"];
    const team2 = teams[props.team2]["full-name"];

    const changeCurr = (i) => { 
        if (curr.value + i < 0) curr.value = 0;
        else if (curr.value + i > 2) curr.value = 2;
        else curr.value += i;
    };

    const match = computed(() => {
        return matchLinks[curr.value];
    });
    const matchRef = ref(match);

    const fullscreen = false;
    const fullscreenRef = ref(fullscreen);
    
    return { matchRef, fullscreenRef, changeCurr, team1, team2 };
  }
};
</script>

<template>
  <div v-if="fullscreenRef == true">
    <div style="position: fixed; bottom: 50%; right: 50%; transform: translate(50%, 50%); width: 100vw; height: 100vh; background-color: black; opacity: 95%; z-index: 1;" />
    <div style="position: fixed; bottom: 50%; right: 50%; transform: translate(50%, 50%); z-index: 2;">
      <h1 style="color: white;">{{ team1 }} VS {{ team2 }}</h1>
      <div class="match-viewer-inner">
        <iframe :src="matchRef" style="width: 80vw; height: 48vh; z-index: 2;" />
      </div>
      <div style="height: 50px;" />
      <div class="match-viewer-inner">
        <button class="scroll-button" @click="changeCurr(-1)">
          <RxCaretLeft class="fullscreen-button" style="color: white;" />
        </button>
        <button @click="() => { fullscreenRef = !fullscreenRef; }">
          <RxExitFullScreen class="fullscreen-button" style="color: white;" />
        </button>
        <button class="scroll-button" @click="changeCurr(1)">
          <RxCaretRight class="fullscreen-button" style="color: white;" />
        </button>
      </div>
    </div>
  </div>
  <div v-else class="match-viewer">
    <div class="match-viewer-inner">
      <h1>{{ team1 }} VS {{ team2 }}</h1>
      <button @click="() => { fullscreenRef = !fullscreenRef; }">
        <RxEnterFullScreen class="fullscreen-button" />
      </button>
    </div>
    <div class="match-viewer-inner">
      <button class="scroll-button" @click="changeCurr(-1)">Previous</button>
      <iframe :src="matchRef" scrolling="no" />
      <button class="scroll-button" @click="changeCurr(1)">Next</button>
    </div>
  </div>
</template>

<style scoped>
    .match-viewer {
        background-color: light-grey;
        padding-bottom: 50px;
    }
    .match-viewer-inner {
        display: flex;
        justify-content: center;
    }
    .fullscreen-button {
        cursor: pointer;
        color: black;
        width: 40px;
        height: 40px;
    }
    .scroll-button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding-left: 40px;
        padding-right: 40px;
        width: 200px;
        background-color: black;
        color: white;
    }
    h1 {
        font-weight: bold;
        display: flex;
        justify-content: center;
        font-size: 30px;
        padding: 50px;
    }
    iframe {
        height: 475px;
        width: 1300px;
    }
</style>