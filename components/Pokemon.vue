<script>
export default {
  props: {
    name: {
      type: String,
      default: "porygon2",
    },
    region: {
        type: String,
        default: ""
    }
  },
  setup(props) {
   
    const hover = ref(false);

    const imgLink = computed(() => { 
      const pkmnName = (props.name.substring(0, 5) == "rotom" && props.name.length > 5) ? "rotom-" + props.name.substring(5, props.name.length) : (props.name.substring(0, 6) == "arceus" && props.name.length > 6) ? "arceus-" + props.name.substring(6, props.name.length) : props.name;
      return "https://play.pokemonshowdown.com/sprites/gen5/" + pkmnName + ".png"; 
    });

    const gifLink = computed(() => { 
      const pkmnName = (props.name.substring(0, 5) == "rotom" && props.name.length > 5) ? "rotom-" + props.name.substring(5, props.name.length) : (props.name.substring(0, 6) == "arceus" && props.name.length > 6) ? "arceus-" + props.name.substring(6, props.name.length) : props.name;
      return "https://play.pokemonshowdown.com/sprites/gen5ani/" + pkmnName + ".gif"; 
    });

    const pokemonRef = useTemplateRef("pokemon");

    return { hover, imgLink, gifLink, pokemonRef };
  }
};
</script>

<template>
  <div @mouseover="hover = true" @mouseleave="hover = false">
    <div class="pokemon">
      <img v-if="hover" :src="gifLink" />
      <img v-else :src="imgLink" />
    </div>
  </div>
</template>

<style scoped>
    .pokemon {
        cursor: pointer;
    }
    img {
        width: 136px;
        height: 112px;
    }
</style>