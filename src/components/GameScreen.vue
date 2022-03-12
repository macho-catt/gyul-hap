<script setup>
import { ref, inject, watch } from '@vue/runtime-core';
import { GameTile, GameButton, StatusSVG } from '@/components';
import { Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';

const props = defineProps({
  gameTiles: {
    type: Array,
  },
});

const answerResult = inject('answerResult');

// Show a result modal when true
const showAnsModal = ref(false);
const modalTitle = ref('');

const svgValue = ref('');

const emit = defineEmits(['numOfTilesClicked']);

watch(answerResult, (curr) => {
  if (curr.length > 0) {
    modalTitle.value = curr;

    if (curr.includes('Correct')) svgValue.value = true;
    else svgValue.value = false;

    showAnsModal.value = true;
    setTimeout(() => (answerResult.value = ''), 100);
  }
});

const closeModal = () => {
  showAnsModal.value = false;
};

const gameEnd = inject('gameEnd');
const endScreen = ref(false);

// Show end screen only when we reach gameEnd state and showAnsModal is closed
watch([gameEnd, showAnsModal], ([currA, currB]) => {
  if (currA && !currB) endScreen.value = true;
});

const handlePlayAgain = () => {
  // change to vue router re-render when that is setup
  window.location.reload();
};
</script>

<template>
  <div :class="endScreen ? 'div-screen-end' : 'div-screen'">
    <GameTile
      v-for="tile in props.gameTiles"
      :key="tile.idx"
      :tile="tile"
      @clickedTile="(e) => emit('numOfTilesClicked', e)"
    />

    <Dialog as="div" :open="showAnsModal" @close="closeModal">
      <DialogOverlay class="dialog-overlay" />
      <div class="dialog-ans-res">
        <div class="div-title">
          <StatusSVG :correct="svgValue" />
          <DialogTitle>{{ modalTitle }}</DialogTitle>
        </div>
        <GameButton name="OK" @click="closeModal" variant="modal" />
      </div>
    </Dialog>
  </div>
  <div v-if="endScreen" class="gameOver">
    <h2 class="gameOver-h2">Game Over</h2>
    <GameButton name="Play Again" @click="handlePlayAgain" variant="submit" />
  </div>
</template>

<style lang="postcss" scoped>
.div-screen {
  @apply grid w-fit grid-cols-3 gap-6 place-self-center rounded-md bg-slate-800 p-6 lg:gap-8 lg:p-8;
}

.div-screen-end {
  @apply z-10 grid w-fit grid-cols-3 gap-6 place-self-center rounded-md bg-black p-6 opacity-50 lg:gap-8 lg:p-8;
}

.gameOver {
  @apply fixed bottom-1/2 right-1/2 z-20 flex translate-x-1/2 translate-y-1/2 flex-col gap-4 rounded-md border bg-black p-5 lg:p-10;
}

.gameOver-h2 {
  @apply text-2xl text-green-600 lg:text-6xl;
}

.div-title {
  @apply flex flex-col place-items-center text-center;
}

.dialog-overlay {
  @apply fixed inset-0 bg-black opacity-50;
}

.dialog-ans-res {
  @apply fixed bottom-1/2 right-1/2 z-10 flex w-52 translate-x-1/2 translate-y-1/2 flex-col place-content-center gap-2 rounded-md border border-transparent bg-white px-4 py-2 text-center lg:w-60;
}
</style>
