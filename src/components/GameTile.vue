<script setup>
import { ref, reactive, inject } from '@vue/runtime-core';

const props = defineProps({
  tile: {
    type: Object,
  },
});

const emit = defineEmits(['clickedTile']);
const isThreeClicked = inject('isThreeClicked');

const mapAttributes = (parentAttr) => {
  let bgColor = '';
  let shape = '';
  let shapeColor = '';
  // special case for assigning color to triangle
  let triangleColor = '';

  switch (parentAttr.bgColor) {
    case 'red':
      bgColor = 'bg-red-800';
      break;
    case 'blue':
      bgColor = 'bg-blue-800';
      break;
    case 'yellow':
      bgColor = 'bg-yellow-800';
      break;
    default:
      break;
  }

  switch (parentAttr.shapeColor) {
    case 'red':
      shapeColor = 'bg-red-400';
      triangleColor = 'border-b-red-400';
      break;
    case 'blue':
      shapeColor = 'bg-blue-400';
      triangleColor = 'border-b-blue-400';
      break;
    case 'yellow':
      shapeColor = 'bg-yellow-400';
      triangleColor = 'border-b-yellow-400';
      break;
    default:
      break;
  }

  switch (parentAttr.shape) {
    case 'circle':
      shape = 'w-20 h-20 rounded-full';
      break;
    case 'triangle':
      shape = `w-0 h-0 border-x-[40px] border-x-transparent border-b-[80px] ${triangleColor} bg-inherit`;
      break;
    case 'square':
      shape = 'w-20 h-20';
      break;
    default:
      break;
  }

  return {
    bgColor,
    shape,
    shapeColor,
  };
};

const tileAttr = reactive(mapAttributes(props.tile));
tileAttr['opacity'] = 'opacity-100';

const clicked = ref(false);

const handleClick = () => {
  // Ensures the max number of clicked tiles is three
  if (!clicked.value && !isThreeClicked.value) {
    tileAttr.opacity = 'opacity-20 lg:hover:opacity-20';
    emit('clickedTile', 1);
    clicked.value = !clicked.value;
  } else if (clicked.value) {
    tileAttr.opacity = 'opacity-100';
    emit('clickedTile', -1);
    clicked.value = !clicked.value;
  }
};
</script>

<template>
  <div
    class="h-56 w-56 flex place-content-center lg:hover:opacity-50 hover:cursor-pointer"
    :class="[tileAttr.bgColor, tileAttr.opacity]"
    @click="handleClick"
  >
    <div
      class="place-self-center"
      :class="[tileAttr.shapeColor, tileAttr.shape]"
    />
  </div>
</template>

<style></style>
