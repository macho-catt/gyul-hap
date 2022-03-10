import useGenerateGameTiles from '@/hooks/useGenerateGameTiles';

describe('useGenerateGameTiles hook', () => {
  it('should generate game tiles', () => {
    const { gameTiles } = useGenerateGameTiles();
    expect(gameTiles.value).toHaveLength(9);
    expect(gameTiles.value).toBeTypeOf('object');
  });

  it('should return the possible matches', () => {
    const { matches } = useGenerateGameTiles();
    expect(matches).toBeTypeOf('object');
    expect(matches.size).toBeTypeOf('number');
    expect(matches.size).toBeGreaterThanOrEqual(0);
    expect(matches.size).toBeLessThan(10);
  });

  it('should return the answer count', () => {
    const { answerCount } = useGenerateGameTiles();
    expect(answerCount.value).toBeTypeOf('number');
    expect(answerCount.value).toBeGreaterThanOrEqual(0);
    expect(answerCount.value).toBeLessThan(10);
  });
});
