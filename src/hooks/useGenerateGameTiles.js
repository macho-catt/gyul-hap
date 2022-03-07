import { ref, reactive } from '@vue/runtime-core';
import { generateTile } from '../lib/tilesGeneration';
import { calculateMatches, stringToNum } from '../lib/winCondition';

const useGenerateGameTiles = () => {
  // Generate game tiles
  const gameTiles = ref([]);
  for (let i = 0; i < 9; i++) {
    gameTiles.value.push(generateTile(i));
  }

  // Get all possible matches from game tiles
  const matches = reactive(new Map(calculateMatches(gameTiles.value)));
  const answerCount = ref(matches.size);
  console.log(matches);
  for (let [key, value] of matches) {
    console.log(stringToNum(key));
    console.log(value);
  }

  return { gameTiles, matches, answerCount };
};

export default useGenerateGameTiles;
