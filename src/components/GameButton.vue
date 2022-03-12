<script setup>
import { ref, inject, watch } from '@vue/runtime-core';

const props = defineProps({
  name: {
    type: String,
  },
  click: {
    type: Function,
  },
  variant: {
    type: String,
  },
  canDisable: {
    type: Boolean,
  },
});

const buttonClass = ref(props.variant);
const gameEnd = inject('gameEnd');

const disableButton = ref('');

watch(gameEnd, (curr) => {
  if (curr && props.canDisable) disableButton.value = 'cursor-not-allowed';
});
</script>

<template>
  <button
    :class="[buttonClass, disableButton]"
    type="button"
    @click="props.click"
  >
    {{ props.name }}
  </button>
</template>

<style lang="postcss" scoped>
.submit {
  @apply h-16 w-16 place-self-center rounded-md border border-transparent bg-slate-100 text-sm text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 lg:h-20 lg:w-20 lg:text-base;
}

.modal {
  @apply inline-flex justify-center place-self-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:h-10 lg:w-10;
}
</style>
