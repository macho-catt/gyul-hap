<script setup>
import { reactive, ref, watch } from '@vue/runtime-core';
import GameScreen from './GameScreen.vue';

// generate tiles
const bgColors = ['red', 'blue', 'yellow'];
const shapes = ['circle', 'square', 'triangle'];
const shapeColors = ['red', 'blue', 'yellow'];

const getRandomAttr = (attributes) => {
  // Retrieve a random number from 0 to length of attributes
  const random = Math.floor(Math.random() * attributes.length);
  return attributes[random];
};

const generateTile = (idx) => {
  const bgColor = getRandomAttr(bgColors);
  const shape = getRandomAttr(shapes);
  const shapeColor = getRandomAttr(shapeColors);
  const tileObj = {
    bgColor,
    shape,
    shapeColor,
    idx,
  };

  return tileObj;
};

let gameTiles = reactive([]);

// onMounted(() => {
for (let i = 0; i < 9; i++) {
  gameTiles.push(generateTile(i));
}
// })

const tilesClicked = ref(0);

watch(tilesClicked, (curr, old) => {
  console.log(curr)
  console.log(old)
});
</script>

<template>
  <div class="bg-blue-300 flex flex-col">
    Game board
    <GameScreen
      :gameTiles="gameTiles"
      @tilesClicked="(e) => (tilesClicked += e)"
    />
  </div>
</template>

<style></style>
