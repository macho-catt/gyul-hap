import {
  checkMatch,
  numToString,
  stringToNum,
  calculateMatches,
} from '@/lib/winCondition';

describe('Win Condition Library', () => {
  it('should return a correct match if the attributes are all the same', () => {
    const result = checkMatch('square', 'square', 'square');
    expect(result).toBe(true);
  });

  it('should return a correct match if the attributes are all different', () => {
    const result = checkMatch('square', 'triangle', 'circle');
    expect(result).toBe(true);
  });

  it('should return a wrong match if the attributes are not all the same or not all different', () => {
    const result = checkMatch('square', 'square', 'triangle');
    expect(result).toBe(false);
  });

  it('should convert an array of numbers to its string representation', () => {
    const result1 = numToString(0, 1, 2);
    expect(result1).toStrictEqual('1#1#1#0#0#0#0#0#0');

    const result2 = numToString(3, 6, 8);
    expect(result2).toStrictEqual('0#0#0#1#0#0#1#0#1');
  });

  it('should convert a string representation to an array of numbers', () => {
    const result1 = stringToNum('1#1#1#0#0#0#0#0#0');
    expect(result1).toStrictEqual([0, 1, 2]);

    const result2 = stringToNum('0#0#0#1#0#0#1#0#1');
    expect(result2).toStrictEqual([3, 6, 8]);
  });

  it('should calculate the correct matches from a list of tiles', () => {
    const tiles = [
      {
        bgColor: 'red',
        shape: 'circle',
        shapeColor: 'blue',
      },
      {
        bgColor: 'blue',
        shape: 'circle',
        shapeColor: 'red',
      },
      {
        bgColor: 'red',
        shape: 'circle',
        shapeColor: 'blue',
      },
      {
        bgColor: 'yellow',
        shape: 'circle',
        shapeColor: 'yellow',
      },
      {
        bgColor: 'blue',
        shape: 'square',
        shapeColor: 'yellow',
      },
      {
        bgColor: 'yellow',
        shape: 'square',
        shapeColor: 'yellow',
      },
      {
        bgColor: 'blue',
        shape: 'triangle',
        shapeColor: 'blue',
      },
      {
        bgColor: 'yellow',
        shape: 'circle',
        shapeColor: 'red',
      },
      {
        bgColor: 'yellow',
        shape: 'square',
        shapeColor: 'red',
      },
    ];

    const matches = calculateMatches(tiles);
    expect(matches).toHaveLength(3);

    const matchesArr = matches.map((match) => stringToNum(match[0]));
    expect(matchesArr).toStrictEqual([
      [0, 1, 3],
      [1, 2, 3],
      [1, 4, 6],
    ]);
  });
});
