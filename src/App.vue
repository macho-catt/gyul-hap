<script setup>
import { TitleHeader, GameBoard } from './components';
</script>

<template>
  <div class="root">
    <TitleHeader />
    <GameBoard />
  </div>
</template>

<style lang="postcss" scoped>
.root {
  @apply flex h-screen flex-col justify-between gap-2 bg-neutral-500 p-2 lg:justify-center lg:p-0;
}
</style>
