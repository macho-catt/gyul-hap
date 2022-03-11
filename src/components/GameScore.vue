<script setup>
const props = defineProps({
  score: {
    type: Number,
  },
});
</script>

<template>
  <div class="score-container">
    <h2 class="h2">Score: {{ props.score }}</h2>
  </div>
</template>

<style lang="postcss">
.score-container {
  @apply flex rounded-md border-2 border-stone-400 bg-stone-900 px-4 py-1 text-center text-stone-100 lg:mt-10 lg:h-10 lg:p-10;
}

.h2 {
  @apply place-self-center text-xl lg:text-4xl;
}
</style>
