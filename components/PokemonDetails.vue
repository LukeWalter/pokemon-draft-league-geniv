<script>
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowUp,
  MdHorizontalRule,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineCheck,
  MdOutlineDoDisturb
} from 'vue-icons-plus/md'
import typechartFunc from '../utils/typechart.js';
import writeups from '../assets/data/writeups.json';
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  props: {
    name: {
      type: String,
      default: "staraptor",
    },
    region: {
        type: String,
        default: ""
    }
  },
  components: {
    MdOutlineKeyboardDoubleArrowUp,
    MdOutlineKeyboardArrowUp,
    MdHorizontalRule,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardDoubleArrowDown,
    MdOutlineCheck,
    MdOutlineDoDisturb
  },
  async setup(props, { emit }) {

    const route = useRoute();
    const router = useRouter();

    const [dexResponse, learnsetResponse] = await Promise.all([
      fetch('https://play.pokemonshowdown.com/data/pokedex.json'),
      fetch('https://play.pokemonshowdown.com/data/learnsets.json')
    ]);

    if (!dexResponse.ok || !learnsetResponse.ok) {
      throw new Error('Failed to retrieve the data files from the server');
    } 

    const dex = await dexResponse.json();
    const learnsets = await learnsetResponse.json();
    console.log("Arceus check: " + dex["arceus"].name);
    const dexEntry = dex[props.name];
    console.log(dexEntry);

    const learnset = ref(null);
    if (learnsets[props.name] != undefined && dexEntry.baseSpecies != undefined) {
      learnset.value = learnsets[dexEntry.baseSpecies.toLowerCase().replace("-", "")];
    } else if (dexEntry.baseSpecies != undefined) {
      learnset.value = learnsets[dexEntry.baseSpecies.toLowerCase().replace("-", "")];
    } else {
      learnset.value = learnsets[props.name];
    }

    const writeup = (dexEntry.baseSpecies != undefined) ? writeups[dexEntry.baseSpecies.toLowerCase().replace("-", "")] : writeups[props.name];

    const types = [
      "Normal",
      "Grass",
      "Fire",
      "Water",
      "Electric",
      "Bug",
      "Flying",
      "Rock",
      "Poison",
      "Ground",
      "Ice",
      "Fighting",
      "Psychic",
      "Ghost",
      "Dragon",
      "Dark",
      "Steel",
      "Fairy"
    ];

    const dangerMoves = [
      "tailwind",
      "trickroom",
      "taunt",
      "fakeout",
      "followme",
      "ragepowder",
      "reflect",
      "lightscreen",
      "encore",
      "wideguard",
      "willowisp",
      "thunderwave",
      "spore",
      "perishsong"
    ];

    const dangerAbilities = [
      "Prankster",
      "Intimidate",
      "Drizzle",
      "Drought",
      "Snow Warning",
      "Sand Stream",
      "Unaware",
      "Inner Focus",
      "Sturdy",
      "Regenerator",
      "Hugepower",
      "Purepower",
      "Protean",
      "Libero"
    ];

    const hasDangerMoves = dangerMoves.map((move) => {
      //console.log(learnset.value.learnset[move]);
      return learnset.value.learnset[move] != undefined;
    })

    // console.log(dex);
    const abilities = [ dexEntry.abilities[0], dexEntry.abilities[1], dexEntry.abilities["H"] ];
    const hasDangerAbilities = abilities
      .filter((ability) => {
        return dangerAbilities.includes(ability);
      });

    console.log("hasDangerMoves: " + hasDangerMoves);
    console.log("hasDangerAbilities: " + hasDangerAbilities);
    
    const lowername = props.name;
    const prettyname = dexEntry.name;
    const stats = [
      dexEntry.baseStats.hp, 
      dexEntry.baseStats.atk,
      dexEntry.baseStats.def,
      dexEntry.baseStats.spa,
      dexEntry.baseStats.spd,
      dexEntry.baseStats.spe
    ];
    console.log(stats);

    const forms = ref([]);
    if (dexEntry.baseSpecies != undefined && dexEntry.baseSpecies == "Rotom") {
      forms.value = [];
    } else if (dexEntry.baseSpecies != undefined) {
      forms.value = dex[dexEntry.baseSpecies.toLowerCase().replace("-", "")].formeOrder.map((form) => {
        return { value: form.toLowerCase().replaceAll("-", "") };
      });
    } else if (dexEntry.formeOrder != undefined) {
      forms.value = dexEntry.formeOrder.map((form) => {
        return { value: form.toLowerCase().replaceAll("-", "") };
      });
    }
    console.log(forms);
    console.log("First form: " + dex[forms.value[0]]);

    const onFormChange = (e) => {
      const pkmnName = (e.target.value.substring(0, 6) == "arceus") ? "arceus" + e.target.value.substring(6, e.target.value.length) : e.target.value;
      const segments = route.path.split('/').filter(Boolean)
      segments.pop() // Removes the last segment ('stats')
      const parentPath = '/' + segments.join('/')
      router.push(parentPath + "/" + pkmnName);
    };

    const gifLink = computed(() => { 
      const pkmnName = (props.name.substring(0, 5) == "rotom" && props.name.length > 5) ? "rotom-" + props.name.substring(5, props.name.length)
                    : (props.name.substring(0, 6) == "arceus" && props.name.length > 6) ? "arceus-" + props.name.substring(6, props.name.length)
                    : (props.name.substring(0, 6) == "dialga" && props.name.length > 6) ? "dialga-" + props.name.substring(6, props.name.length)
                    : (props.name.substring(0, 6) == "palkia" && props.name.length > 6) ? "palkia-" + props.name.substring(6, props.name.length)
                    : props.name;
      return "https://play.pokemonshowdown.com/sprites/gen5ani/" + pkmnName + ".gif"; 
    });

    const imgLink = computed(() => { 
      const pkmnName = (props.name.substring(0, 5) == "rotom" && props.name.length > 5) ? "rotom-" + props.name.substring(5, props.name.length) : (props.name.substring(0, 6) == "arceus" && props.name.length > 6) ? "arceus-" + props.name.substring(6, props.name.length) : props.name;
      return "https://play.pokemonshowdown.com/sprites/gen5/" + pkmnName + ".png"; 
    });

    const handleImageError = (event) => {
      event.target.src = imgLink;
    }

    const getTypeImg = (type) => {
      return "https://play.pokemonshowdown.com/sprites/types/" + type + ".png";
    };

    const typeLink = computed(() => {
      const numTypes = dexEntry.types.length;
      if (numTypes == 2) {
        return [ getTypeImg(dexEntry.types[0]), getTypeImg(dexEntry.types[1]) ];

      } else if (numTypes == 1) {
        return [ getTypeImg(dexEntry.types[0]), null ];

      } else {
        return [ null, null ];

      }
    });

    const typechart = typechartFunc();
    // console.log(typechart);

    // 0: Immune
    // 1: 1/4 effective
    // 2: 1/2 effective
    // 3: 1 effective
    // 4: 2 effective
    // 5: 4 effective
    const getTypeMatchup = (type) => {
      // console.log(type);
      const relationships = dexEntry.types.map((myType) => {
        return typechart[myType]["damageTaken"][type];
      });
      let final = 1;
      relationships.forEach((r) => {
        switch (r) {
          case 0: // Normal
            return;
          case 1: // Weakness
            final *= 2;
            return;
          case 2: // Resistance
            final /= 2;
            return;
          case 3: // Immunity
            final *= 0;
            return;
        }
      });
      return final;
    }

    const pokemonRef = useTemplateRef("pokemon");

    return { lowername, prettyname, dex, gifLink, imgLink, pokemonRef, stats, hasDangerMoves, types, typeLink, forms, writeup, onFormChange, getTypeImg, getTypeMatchup, handleImageError };
  }
};
</script>

<template>
  <div style="margin-left: 20px; margin-right: 20px;">
    <div style="height: 50px;" ><p style="height: 50px; color: #cbd2e1;">.</p></div>
    <div class="horizontal">
      <div style="width: 900px;">
        <img class="gif" :src="gifLink" />
      <h1>{{ prettyname }}</h1>
      </div>
      <div>
        <select v-if="forms.length > 0" @change="onFormChange($event)" v-model="lowername">
          <option 
            v-for="form in forms" 
            :key="form.value"
            :value="form.value"
          >
            {{ dex[form.value].name }}
          </option>
        </select>
      </div>
    </div>
    <div style="height: 20px;" ><p style="height: 20px; color: #cbd2e1;">.</p></div>
    <div class="horizontal">
      <img class="type" v-if="typeLink[0] != null" :src="typeLink[0]" style="margin-right: 5px;">
      <img class="type" v-if="typeLink[1] != null" :src="typeLink[1]">
    </div>
    <div style="height: 20px;" ><p style="height: 20px; color: #cbd2e1;">.</p></div>
    <table>
      <thead class="horizontal">
        <tr v-for="type in types">
          <th class="typeMatch" style="height: 30px"><img :src="getTypeImg(type)"/></th>
        </tr>
      </thead>
      <tbody class="horizontal">
        <tr v-for="type in types" style="height: 50px">
          <th class="typeMatch" style="height: 50px" v-if="getTypeMatchup(type) == 4"><MdOutlineKeyboardDoubleArrowUp class="big-down" /></th>
          <th class="typeMatch" style="height: 50px" v-else-if="getTypeMatchup(type) == 2"><MdOutlineKeyboardArrowUp class="small-down" /></th>
          <th class="typeMatch" style="height: 50px" v-else-if="getTypeMatchup(type) == 1/4"><MdOutlineKeyboardDoubleArrowDown class="big-up" /></th>
          <th class="typeMatch" style="height: 50px" v-else-if="getTypeMatchup(type) == 1/2"><MdOutlineKeyboardArrowDown class="small-up" /></th>
          <th class="typeMatch" style="height: 50px" v-else-if="getTypeMatchup(type) == 0"><MdOutlineDoDisturb class="big-up" /></th>
          <th class="typeMatch" style="height: 50px" v-else><MdHorizontalRule class="neutral" /></th>
        </tr>
      </tbody>
    </table>
    <div style="height: 70px;" ><p style="height: 70px; color: #cbd2e1;">.</p></div>
    <table>
      <thead>
        <tr class="horizontal" style="height: 30px">
          <th>HP</th>
          <th>Attack</th>
          <th>Defense</th>
          <th>Sp. Attack</th>
          <th>Sp. Defense</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody class="horizontal">
        <tr v-for="stat in stats" style="height: 60px">
          <th v-if="stat >= 120"><MdOutlineKeyboardDoubleArrowUp class="big-up" /></th>
          <th v-else-if="stat >= 95"><MdOutlineKeyboardArrowUp class="small-up" /></th>
          <th v-else-if="stat <= 40"><MdOutlineKeyboardDoubleArrowDown class="big-down" /></th>
          <th v-else-if="stat <= 69"><MdOutlineKeyboardArrowDown class="small-down" /></th>
          <th v-else><MdHorizontalRule class="neutral" /></th>
        </tr>
      </tbody>
    </table>
    <div style="height: 30px;" ><p style="height: 30px; color: #cbd2e1;">.</p></div>
    <table>
      <thead>
        <tr class="horizontal" style="height: 30px">
          <th>Tailwind</th>
          <th>Trick Room</th>
          <th>Taunt</th>
          <th>Fake Out</th>
          <th>Follow Me</th>
          <th>Rage Powder</th>
          <th>Reflect</th>
          <th>Light Screen</th>
          <th>Encore</th>
          <th>Wide Guard</th>
          <th>Will O Wisp</th>
          <th>Thunder Wave</th>
          <th>Spore</th>
          <th>Perish Song</th>
        </tr>
      </thead>
      <tbody class="horizontal">
        <tr v-for="move in hasDangerMoves" style="height: 60px">
          <th v-if="move == true"><MdOutlineCheck class="big-up" /></th>
          <th v-else><MdHorizontalRule class="neutral" /></th>
        </tr>
      </tbody>
    </table>
    <div style="height: 20px;" ><p style="height: 70px; color: #cbd2e1;">.</p></div>
    <div style="width: 1000px;">
      <p>{{ writeup }}</p>
    </div>
    <div style="height: 70px;" ><p style="height: 70px; color: #cbd2e1;">.</p></div>
  </div>
</template>

<style scoped>
    .typeMatch {
      width: 60px;
    }
    .gif {
        width: 136px;
        height: 112px;
    }
    .horizontal {
      color: black;
      display: flex;
      align-items: center;
    }
    .center {
      color: black;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    tr {
      margin: 0;
    }
    th {
      width: 120px;
      outline-style: solid;
      background-color: white;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    h1 {
      font-size: 40px;
      font-weight: bold;
      margin-left: 40px;
      margin-right: 40px;
    }
    .neutral {
      color: black;
    }
    .small-up {
      color: blue;
    }
    .big-up {
      color: green;
    }
    .small-down {
      color: orange;
    }
    .big-down {
      color: red;
    }
    .type {
      width: 90px;
      height: 30px;
    }
</style>