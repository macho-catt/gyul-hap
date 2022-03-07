<script setup>
import { ref, provide } from '@vue/runtime-core';
import { GameScreen, GameButton } from './';
import { useTilesClicked, useGenerateGameTiles } from '../hooks';
import { numToString } from '../lib/winCondition';

const { gameTiles, matches, answerCount } = useGenerateGameTiles();
const { numOfTilesClicked, isThreeClicked, tilesClicked, handleEmit } =
  useTilesClicked();

provide('isThreeClicked', isThreeClicked);

// Reactive state to signal to clear all selected tiles for child comp
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
