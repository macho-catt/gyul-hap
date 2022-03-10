<script setup>
import { ref, inject, watch } from '@vue/runtime-core';
import { GameTile, GameButton } from '@/components';
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

        <GameButton name="OK" @click="closeModal" variant="modal" />
      </div>
    </Dialog>
  </div>
</template>

<style lang="postcss" scoped>
.div-screen {
  @apply grid w-fit grid-cols-3 gap-6 place-self-center rounded-md bg-slate-800 p-6 lg:gap-8 lg:p-8;
}

.dialog-overlay {
  @apply fixed inset-0 bg-black opacity-50;
}

.dialog {
  @apply fixed bottom-1/2 right-1/2 z-10 flex w-52 translate-x-1/2 translate-y-1/2 flex-col place-content-center gap-2 rounded-md border border-transparent bg-white p-4 text-center lg:w-60;
}
</style>
