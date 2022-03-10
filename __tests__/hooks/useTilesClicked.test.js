import useTilesClicked from '@/hooks/useTilesClicked';

describe('useTilesClicked hook', () => {
  it('should identify when it receives a positive emit', async () => {
    const { numOfTilesClicked, handleEmit } = useTilesClicked();

    await handleEmit({ value: 1 });
    expect(numOfTilesClicked.value).toStrictEqual(1);
  });

  it('should identify when it receives a negative emit', async () => {
    const { numOfTilesClicked, handleEmit } = useTilesClicked();

    await handleEmit({ value: 1, idx: 1 });
    expect(numOfTilesClicked.value).toStrictEqual(1);

    await handleEmit({ value: -1, idx: 1 });
    expect(numOfTilesClicked.value).toStrictEqual(0);
  });

  it('should identify when it receives three clicks', async () => {
    const { numOfTilesClicked, isThreeClicked, handleEmit } = useTilesClicked();

    await handleEmit({ value: 1, idx: 1 });
    expect(numOfTilesClicked.value).toStrictEqual(1);

    await handleEmit({ value: 1, idx: 2 });
    expect(numOfTilesClicked.value).toStrictEqual(2);

    await handleEmit({ value: 1, idx: 3 });
    expect(numOfTilesClicked.value).toStrictEqual(3);

    expect(isThreeClicked.value).toBe(true);
  });

  it('should update the tilesClicked array', async () => {
    const { tilesClicked, handleEmit } = useTilesClicked();

    await handleEmit({ value: 1, idx: 1 });
    expect(tilesClicked.value.length).toStrictEqual(1);
    expect(tilesClicked.value).toContain(1);

    await handleEmit({ value: 1, idx: 2 });
    expect(tilesClicked.value.length).toStrictEqual(2);
    expect(tilesClicked.value).toContain(2);

    await handleEmit({ value: 1, idx: 4 });
    expect(tilesClicked.value.length).toStrictEqual(3);
    expect(tilesClicked.value).toContain(4);

    await handleEmit({ value: -1, idx: 2 });
    expect(tilesClicked.value.length).toStrictEqual(2);
    expect(tilesClicked.value).not.toContain(2);
  });
});
