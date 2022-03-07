<script setup>
const props = defineProps({
  name: {
    type: String,
  },
  click: {
    type: Function,
  },
});
</script>

<template>
  <button
    class="h-16 w-16 bg-slate-800 text-white place-self-center"
    type="button"
    @click="props.click"
  >
    {{ props.name }}
  </button>
</template>

<style></style>
