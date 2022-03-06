<script setup>
import { ref, reactive, inject } from '@vue/runtime-core';
import { mapAttributes } from '../lib';

const props = defineProps({
  tile: {
    type: Object,
  },
});

const emit = defineEmits(['clickedTile']);
const isThreeClicked = inject('isThreeClicked');

const tileAttr = reactive(mapAttributes(props.tile));
tileAttr['opacity'] = 'opacity-100';

const clicked = ref(false);

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
</script>

<template>
  <div
    class="h-56 w-56 flex flex-col place-content-center lg:hover:opacity-50 hover:cursor-pointer"
    :class="[tileAttr.bgColor, tileAttr.opacity]"
    @click="handleClick"
  >
    <div
      class="place-self-center"
      :class="[tileAttr.shapeColor, tileAttr.shape]"
    />
    <h1 class="fixed place-self-center text-lg">{{ props.tile.idx }}</h1>
  </div>
</template>

<style></style>
