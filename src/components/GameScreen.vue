<script setup>
import { ref, toRef, watch } from '@vue/runtime-core';
import { GameTile } from './';

const props = defineProps({
  gameTiles: {
    type: Array,
  },
  answerResult: {
    type: String,
  },
});

// Show a result modal when true
const showResult = ref(false);

const emit = defineEmits(['numOfTilesClicked']);

watch(toRef(props, 'answerResult'), (curr) => {
  switch (curr) {
    case 'Correct':
      console.log('correct!');
      break;
    case 'Wrong':
      console.log('wrong!');
      break;
    case 'Already Answered':
      console.log('already answered!');
      break;
    case 'Matches Still Remain':
      console.log('There are still some matches!');
      break;
    case 'Need Three Selected Tiles':
      console.log('Need 3 tiles to be selected');
      break;
    default:
      break;
  }

  showResult.value = true;

  setTimeout(() => {
    showResult.value = false;
  }, 1000);
});
</script>

<template>
  <div class="bg-slate-800 place-self-center w-fit grid grid-cols-3 p-8 gap-8">
    <GameTile
      v-for="tile in props.gameTiles"
      :key="tile.idx"
      :tile="tile"
      @clickedTile="(e) => emit('numOfTilesClicked', e)"
    />
  </div>
</template>

<style></style>
