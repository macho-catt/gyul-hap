<script setup>
import { ref, watch, provide } from '@vue/runtime-core';
import GameScreen from './GameScreen.vue';
import { generateTile } from '../lib';

const gameTiles = ref([]);

for (let i = 0; i < 9; i++) {
  gameTiles.value.push(generateTile(i));
}

const numOfTilesClicked = ref(0);
const isThreeClicked = ref(false);
const tilesClicked = ref([]);

const handleEmit = (fromChild) => {
  numOfTilesClicked.value += fromChild.value;

  if (fromChild.value > 0) tilesClicked.value.push(fromChild.idx);
  else
    tilesClicked.value = tilesClicked.value.filter(
      (tile) => tile !== fromChild.idx
    );
};

watch(numOfTilesClicked, (curr) => {
  if (curr === 3) isThreeClicked.value = true;
  else isThreeClicked.value = false;
});

provide('isThreeClicked', isThreeClicked);
</script>

<template>
  <div class="bg-blue-300 flex flex-col">
    Game board
    <GameScreen :gameTiles="gameTiles" @numOfTilesClicked="handleEmit" />
  </div>
</template>

<style></style>
