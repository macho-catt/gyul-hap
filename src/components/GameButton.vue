<script setup>
import { ref } from '@vue/runtime-core';

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
});

const buttonClass = ref(props.variant);
</script>

<template>
  <button :class="buttonClass" type="button" @click="props.click">
    {{ props.name }}
  </button>
</template>

<style lang="postcss" scoped>
.submit {
  @apply h-16 w-16 place-self-center bg-slate-800 text-white;
}

.modal {
  @apply inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2;
}
</style>
