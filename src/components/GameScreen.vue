<script setup>
import GameTile from './GameTile.vue';

const props = defineProps({
  gameTiles: {
    type: Array,
  },
});

const emit = defineEmits(['tilesClicked']);
</script>

<template>
  <div class="bg-slate-800 place-self-center w-fit grid grid-cols-3 p-8 gap-8">
    <GameTile
      v-for="tile in props.gameTiles"
      :key="tile.idx"
      :tile="tile"
      @clickedTile="(e) => emit('tilesClicked', e)"
    />
  </div>
</template>

<style></style>
