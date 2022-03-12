<script setup>
import { ref, provide } from '@vue/runtime-core';
import { GameScreen, GameButton, GameScore } from '@/components';
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

// State for player score
const score = ref(0);

// State for game end
const gameEnd = ref(false);
provide('gameEnd', gameEnd);

const onSubmitClick = () => {
  if (!gameEnd.value && numOfTilesClicked.value === 3) {
    console.log(`submitted ${tilesClicked.value}`);
    const stringRep = numToString(...tilesClicked.value);

    if (matches.has(stringRep)) {
      if (matches.get(stringRep) === 1) {
        answerResult.value = 'Correct!';
        matches.set(stringRep, 0);
        answerCount.value -= 1;
        score.value += 1;
      } else {
        answerResult.value = 'You already answered this match!';
      }
    } else {
      answerResult.value = 'Wrong!';
      if (score.value > 0) score.value -= 1;
    }

    // clear values after submitting
    tilesClicked.value = [];
    numOfTilesClicked.value = 0;
    isThreeClicked.value = false;
    clearTiles.value = true;
  } else if (!gameEnd.value && numOfTilesClicked.value !== 3) {
    answerResult.value = 'You need to select three tiles to submit a match.';
  }
};

const onNoMatchesClick = () => {
  if (!gameEnd.value && answerCount.value === 0) {
    answerResult.value = 'Correct! There are no more matches.';
    score.value += 3;
    gameEnd.value = true;
  } else if (!gameEnd.value && answerCount.value > 0) {
    answerResult.value = 'Wrong! Matches still remain.';
    if (score.value > 1) score.value -= 2;
    else if (score.value > 0) score.value -= 1;
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
    <div class="placeholder" />
    <div class="main-board">
      <GameScreen :gameTiles="gameTiles" @numOfTilesClicked="handleEmit" />
      <div class="button-container">
        <GameButton
          name="Submit Match"
          @click="onSubmitClick"
          variant="submit"
        />
        <GameButton
          name="No More Matches"
          @click="onNoMatchesClick"
          variant="submit"
        />
      </div>
    </div>
    <div class="score-board">
      <GameScore :score="score" />
    </div>
  </div>
</template>

<style lang="postcss">
.board-container {
  @apply flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-0;
}

.placeholder {
  @apply hidden lg:order-1 lg:inline;
}

.main-board {
  @apply order-2 col-span-2 flex flex-col gap-2 lg:order-2;
}

.button-container {
  @apply flex flex-row gap-2 place-self-center;
}

.score-board {
  @apply order-1 flex justify-center lg:order-3 lg:justify-start;
}
</style>
