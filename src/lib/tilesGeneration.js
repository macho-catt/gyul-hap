// generate tiles
const bgColors = ['red', 'blue', 'yellow'];
const shapes = ['circle', 'square', 'triangle'];
const shapeColors = ['red', 'blue', 'yellow'];

const getRandomAttr = (attributes) => {
  // Retrieve a random number from 0 to length of attributes
  const random = Math.floor(Math.random() * attributes.length);
  return attributes[random];
};

const generateTile = (idx) => {
  const bgColor = getRandomAttr(bgColors);
  const shape = getRandomAttr(shapes);
  const shapeColor = getRandomAttr(shapeColors);
  const tileObj = {
    bgColor,
    shape,
    shapeColor,
    idx,
  };

  return tileObj;
};

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
      shape = 'w-12 h-12 md:w-24 md:h-24 lg:w-20 lg:h-20 rounded-full';
      break;
    case 'triangle':
      shape = `${triangleColor} w-12 h-12 border-x-transparent bg-inherit border-x-[24px] border-b-[48px] md:w-0 md:h-0 md:border-x-[45px] md:border-b-[90px] lg:w-0 lg:h-0 lg:border-x-[40px] lg:border-b-[80px]`;
      break;
    case 'square':
      shape = 'w-12 h-12 md:w-24 md:h-24 lg:w-20 lg:h-20';
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

export { getRandomAttr, generateTile, mapAttributes };
