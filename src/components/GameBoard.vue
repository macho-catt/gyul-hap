<script setup>
import { ref, watch, provide, reactive } from '@vue/runtime-core';
import { GameScreen, GameButton } from './';
import { generateTile } from '../lib/tilesGeneration';
import {
  calculateMatches,
  stringToNum,
  numToString,
} from '../lib/winCondition';

const gameTiles = ref([]);

for (let i = 0; i < 9; i++) {
  gameTiles.value.push(generateTile(i));
}

const matches = reactive(new Map(calculateMatches(gameTiles.value)));
const answerCount = ref(matches.size);
console.log(matches);
for (let [key, value] of matches) {
  console.log(stringToNum(key));
  console.log(value);
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

const clearTiles = ref(false);
provide('clearTiles', clearTiles);

const onSubmitClick = () => {
  if (numOfTilesClicked.value === 3) {
    console.log(`submitted ${tilesClicked.value}`);
    const stringRep = numToString(...tilesClicked.value);

    if (matches.has(stringRep)) {
      if (matches.get(stringRep) === 1) {
        console.log('correct!');
        matches.set(stringRep, 0);
        answerCount.value -= 1;
      } else {
        console.log('already answered!');
      }
    } else {
      console.log('wrong!');
    }

    // clear values after submitting
    tilesClicked.value = [];
    numOfTilesClicked.value = 0;
    isThreeClicked.value = false;
    clearTiles.value = true;
  } else {
    console.log('Need 3 tiles to be selected');
  }
};

const onNoMatchesClick = () => {
  console.log('clicked no matches');

  if (answerCount.value === 0) {
    console.log('Correct, there are no more matches!');
  } else {
    console.log('There are still some matches!');
    // clear values after submitting
    tilesClicked.value = [];
    numOfTilesClicked.value = 0;
    isThreeClicked.value = false;
    clearTiles.value = true;
  }
};
</script>

<template>
  <div class="bg-blue-300 flex flex-col gap-2">
    Game board
    <GameScreen :gameTiles="gameTiles" @numOfTilesClicked="handleEmit" />
    <div class="flex flex-row place-self-center gap-2">
      <GameButton name="Submit Match" @click="onSubmitClick" />
      <GameButton name="No More Matches" @click="onNoMatchesClick" />
    </div>
  </div>
</template>

<style></style>
