import { ref, watch } from '@vue/runtime-core';

const useTilesClicked = () => {
  const numOfTilesClicked = ref(0);
  const isThreeClicked = ref(false);
  const tilesClicked = ref([]);

  // Watches if the number of tiles clicked is the max (3)
  watch(numOfTilesClicked, (curr) => {
    if (curr === 3) isThreeClicked.value = true;
    else isThreeClicked.value = false;
  });

  return {
    numOfTilesClicked,
    isThreeClicked,
    tilesClicked,
    handleEmit: (fromChild) => {
      // Update the total number of tiles clicked, and the list of current tiles clicked
      numOfTilesClicked.value += fromChild.value;

      if (fromChild.value > 0) {
        tilesClicked.value.push(fromChild.idx);
      } else {
        tilesClicked.value = tilesClicked.value.filter(
          (tile) => tile !== fromChild.idx
        );
      }
    },
  };
};

export default useTilesClicked;
