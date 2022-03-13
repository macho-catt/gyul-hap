import { shallowMount } from '@vue/test-utils';
import { GameTile } from '@/components';

describe('GameTile', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(GameTile, {
      props: {
        tile: {
          bgColor: 'red',
          shape: 'circle',
          shapeColor: 'blue',
          idx: 1,
        },
      },
      global: {
        provide: {
          isThreeClicked: false,
          clearTiles: false,
        },
      },
    });
    expect(wrapper.classes()).toContain('div-tile');
    expect(wrapper.html()).toContain('h1');
  });
});
