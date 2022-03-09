<script setup>
import { ref, reactive, inject, watch } from '@vue/runtime-core';
import { mapAttributes } from '../lib/tilesGeneration';

const props = defineProps({
  tile: {
    type: Object,
  },
});

// Assign attributes to the tile
const tileAttr = reactive(mapAttributes(props.tile));
tileAttr['opacity'] = 'opacity-100';

// Reactive state if a tile is clicked
const clicked = ref(false);
const isThreeClicked = inject('isThreeClicked');
const emit = defineEmits(['clickedTile']);

const handleClick = () => {
  // Ensures the max number of clicked tiles is three
  if (!clicked.value && !isThreeClicked.value) {
    tileAttr.opacity = 'opacity-20 lg:hover:opacity-20';
    emit('clickedTile', {
      value: 1,
      idx: props.tile.idx,
    });
    clicked.value = !clicked.value;
  } else if (clicked.value) {
    tileAttr.opacity = 'opacity-100';
    emit('clickedTile', {
      value: -1,
      idx: props.tile.idx,
    });
    clicked.value = !clicked.value;
  }
};

// If clearTiles becomes true, clear selected tile
const clearTiles = inject('clearTiles');

watch(clearTiles, (curr) => {
  if (curr) {
    clicked.value = false;
    tileAttr.opacity = 'opacity-100';
    setTimeout(() => (clearTiles.value = false), 100);
  }
});
</script>

<template>
  <div
    class="div-tile"
    :class="[tileAttr.bgColor, tileAttr.opacity]"
    @click="handleClick"
  >
    <div class="div-shape" :class="[tileAttr.shapeColor, tileAttr.shape]" />
    <h1 class="h1">{{ props.tile.idx }}</h1>
    <!-- <h1 class="color">{{ props.tile.idx }}</h1> -->
  </div>
</template>

<style lang="postcss" scoped>
.div-tile {
  @apply flex flex-col place-content-center lg:h-56 lg:w-56 lg:hover:cursor-pointer lg:hover:opacity-50;
}

.div-shape {
  @apply place-self-center;
}

.h1 {
  @apply place-self-center lg:text-lg;
}
</style>
