<script setup>
import { ref, provide } from '@vue/runtime-core';
import { GameScreen, GameButton } from '@/components';
import { useTilesClicked, useGenerateGameTiles } from '@/hooks';
import { numToString } from '@/lib/winCondition';

const { gameTiles, matches, answerCount } = useGenerateGameTiles();
const { numOfTilesClicked, isThreeClicked, tilesClicked, handleEmit } =
  useTilesClicked();

provide('isThreeClicked', isThreeClicked);

// State to signal to clear all selected tiles for child comp
const clearTiles = ref(false);
provide('clearTiles', clearTiles);

// State to pass a correct or wrong answer submission to screen
const answerResult = ref('');
provide('answerResult', answerResult);

const onSubmitClick = () => {
  if (numOfTilesClicked.value === 3) {
    console.log(`submitted ${tilesClicked.value}`);
    const stringRep = numToString(...tilesClicked.value);

    if (matches.has(stringRep)) {
      if (matches.get(stringRep) === 1) {
        answerResult.value = 'Correct!';
        matches.set(stringRep, 0);
        answerCount.value -= 1;
      } else {
        answerResult.value = 'You already answered this match!';
      }
    } else {
      answerResult.value = 'Wrong!';
    }

    // clear values after submitting
    tilesClicked.value = [];
    numOfTilesClicked.value = 0;
    isThreeClicked.value = false;
    clearTiles.value = true;
  } else {
    answerResult.value = 'You need to select three tiles to submit a match.';
  }
};

const onNoMatchesClick = () => {
  if (answerCount.value === 0) {
    answerResult.value = 'Correct! There are no more matches.';
  } else {
    answerResult.value = 'Wrong! Matches still remain.';
    // clear values after submitting
    tilesClicked.value = [];
    numOfTilesClicked.value = 0;
    isThreeClicked.value = false;
    clearTiles.value = true;
  }
};
</script>

<template>
  <div class="board-container">
    <GameScreen :gameTiles="gameTiles" @numOfTilesClicked="handleEmit" />
    <div class="button-container">
      <GameButton name="Submit Match" @click="onSubmitClick" variant="submit" />
      <GameButton
        name="No More Matches"
        @click="onNoMatchesClick"
        variant="submit"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.board-container {
  @apply flex flex-col gap-2;
}

.button-container {
  @apply flex flex-row gap-2 place-self-center;
}
</style>
