<script setup>
import { ref, inject, watch } from '@vue/runtime-core';
import { GameTile } from './';
import { Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';

const props = defineProps({
  gameTiles: {
    type: Array,
  },
});

const answerResult = inject('answerResult');

// Show a result modal when true
const showResult = ref(false);
const modalTitle = ref('');

const emit = defineEmits(['numOfTilesClicked']);

watch(answerResult, (curr) => {
  // switch (curr) {
  //   case 'Correct':
  //     console.log('correct!');
  //     modalTitle.ref = curr;
  //     break;
  //   case 'Wrong':
  //     console.log('wrong!');
  //     break;
  //   case 'Already Answered':
  //     console.log('already answered!');
  //     break;
  //   case 'Matches Still Remain':
  //     console.log('There are still some matches!');
  //     break;
  //   case 'Need Three Selected Tiles':
  //     console.log('Need 3 tiles to be selected');
  //     break;
  //   default:
  //     break;
  // }
  if (curr.length > 0) {
    modalTitle.value = curr;
    showResult.value = true;
    setTimeout(() => (answerResult.value = ''), 100);
  }
});

const closeModal = () => {
  showResult.value = false;
};
</script>

<template>
  <div class="div-screen">
    <GameTile
      v-for="tile in props.gameTiles"
      :key="tile.idx"
      :tile="tile"
      @clickedTile="(e) => emit('numOfTilesClicked', e)"
    />

    <Dialog as="div" :open="showResult" @close="closeModal">
      <DialogOverlay class="dialog-overlay" />
      <div class="dialog">
        <DialogTitle>{{ modalTitle }}</DialogTitle>
        <button
          @click="closeModal"
          type="button"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Close
        </button>
      </div>
    </Dialog>
  </div>
</template>

<style lang="postcss" scoped>
.div-screen {
  @apply bg-slate-800 place-self-center w-fit grid grid-cols-3 p-8 gap-8;
}

.dialog-overlay {
  @apply fixed inset-0 bg-black opacity-30;
}

.dialog {
  @apply fixed bottom-1/2 translate-x-1/2 translate-y-1/2 right-1/2 z-10 overflow-y-auto text-center flex flex-col bg-white lg:h-24 lg:w-52;
}
</style>
