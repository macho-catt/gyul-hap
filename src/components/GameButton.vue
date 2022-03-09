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
</style>
