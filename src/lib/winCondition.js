// An attribute is a match if they are all the same or all different
const checkMatch = (attr1, attr2, attr3) => {
  if (attr1 === attr2 && attr2 === attr3) {
    return true;
  } else if (attr1 !== attr2 && attr2 !== attr3 && attr1 !== attr3) {
    return true;
  } else {
    return false;
  }
};

// Convert three nums to a string representation of their combination based on an array
const numToString = (i, j, k) => {
  const nums = new Array(9).fill(0);
  nums[i] = 1;
  nums[j] = 1;
  nums[k] = 1;
  return nums.join('#');
};

// Convert a string represetation of a combination to three nums
const stringToNum = (str) => {
  const stringArr = str.split('#');
  const indexes = [];
  stringArr.forEach((s, i) => {
    if (s === '1') indexes.push(i);
  });

  return indexes;
};

// Calculate the answers from a list of tiles
const calculateMatches = (tilesList) => {
  // Storage to keep track if a combination has been visited
  const storage = new Map();

  for (let i = 0; i < tilesList.length; i++) {
    for (let j = i + 1; j < tilesList.length; j++) {
      for (let k = j + 1; k < tilesList.length; k++) {
        const stringRep = numToString(i, j, k);

        if (!storage.has(stringRep)) {
          const isBgMatch = checkMatch(
            tilesList[i].bgColor,
            tilesList[j].bgColor,
            tilesList[k].bgColor
          );
          const isShapeMatch = checkMatch(
            tilesList[i].shape,
            tilesList[j].shape,
            tilesList[k].shape
          );
          const isShapeColorMatch = checkMatch(
            tilesList[i].shapeColor,
            tilesList[j].shapeColor,
            tilesList[k].shapeColor
          );
          storage.set(stringRep, isBgMatch & isShapeMatch & isShapeColorMatch);
        }
      }
    }
  }

  // console.log(storage)
  // console.log(storage.size)

  // Return the matches as a 2D array of key-value pairs
  const matches = [];
  for (let [key, value] of storage) {
    if (value === 1) matches.push([key, value]);
  }

  return matches;
};

export { checkMatch, calculateMatches, numToString, stringToNum };
