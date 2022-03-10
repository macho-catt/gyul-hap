import {
  getRandomAttr,
  generateTile,
  mapAttributes,
} from '@/lib/tilesGeneration';

const bgColors = ['red', 'blue', 'yellow'];
const shapes = ['circle', 'square', 'triangle'];
const shapeColors = ['red', 'blue', 'yellow'];

describe('Tile Generation Library', () => {
  it('assigns a random attribute', () => {
    const bgColor = getRandomAttr(bgColors);
    const shape = getRandomAttr(shapes);
    const shapeColor = getRandomAttr(shapeColors);

    expect(bgColors).toContain(bgColor);
    expect(shapes).toContain(shape);
    expect(shapeColors).toContain(shapeColor);
  });

  it('generates a tile', () => {
    const tile = generateTile(0);

    expect(tile).toBeTypeOf('object');
    expect(tile.idx).toStrictEqual(0);
    expect(bgColors).toContain(tile.bgColor);
    expect(shapes).toContain(tile.shape);
    expect(shapeColors).toContain(tile.shapeColor);
  });

  it('maps the css attributes to the tile properly', () => {
    const tile1 = {
      bgColor: 'red',
      shape: 'circle',
      shapeColor: 'blue',
    };

    const tile2 = {
      bgColor: 'blue',
      shape: 'square',
      shapeColor: 'yellow',
    };

    const tile3 = {
      bgColor: 'yellow',
      shape: 'triangle',
      shapeColor: 'red',
    };

    const tileWithCss1 = mapAttributes(tile1);
    const tileWithCss2 = mapAttributes(tile2);
    const tileWithCss3 = mapAttributes(tile3);

    expect(tileWithCss1).toBeTypeOf('object');
    expect(tileWithCss1.bgColor).toContain('bg-red-800');
    expect(tileWithCss1.shape).toContain('rounded-full');
    expect(tileWithCss1.shapeColor).toContain('bg-blue-400');

    expect(tileWithCss2).toBeTypeOf('object');
    expect(tileWithCss2.bgColor).toContain('bg-blue-800');
    expect(tileWithCss2.shape).toContain('w-20');
    expect(tileWithCss2.shapeColor).toContain('bg-yellow-400');

    expect(tileWithCss3).toBeTypeOf('object');
    expect(tileWithCss3.bgColor).toContain('bg-yellow-800');
    expect(tileWithCss3.shape).toContain('border-x-transparent');
    expect(tileWithCss3.shapeColor).toContain('bg-red-400');
  });

  it('should return an object with emptry strings if the attributes are not in the list', () => {
    const tile = {
      bgColor: 'pink',
      shape: 'pink',
      shapeColor: 'pink',
    };

    const tileWithCss = mapAttributes(tile);

    expect(tileWithCss).toBeTypeOf('object');
    expect(tileWithCss.bgColor).toContain('');
    expect(tileWithCss.shape).toContain('');
    expect(tileWithCss.shapeColor).toContain('');
  });
});
