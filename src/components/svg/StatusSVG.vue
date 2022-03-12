<script setup>
import Correct from '@/assets/check.svg';
import Incorrect from '@/assets/x.svg';

const props = defineProps({
  correct: {
    type: Boolean,
  },
});
</script>

<template>
  <div v-if="props.correct"><Correct class="correct" /></div>
  <div v-if="!props.correct">
    <Incorrect class="incorrect" />
  </div>
</template>

<style lang="postcss" scoped>
.correct {
  @apply fill-green-500;
}

.incorrect {
  @apply fill-red-500;
}

.hide {
  @apply hidden;
}
</style>
