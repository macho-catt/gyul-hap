import { shallowMount } from '@vue/test-utils';
import { GameScore } from '@/components';

describe('GameScore', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(GameScore, {});
    expect(wrapper.html()).toContain('Score:');
  });

  it('renders the score based on the props', () => {
    const wrapper = shallowMount(GameScore, {
      props: {
        score: 1,
      },
    });
    expect(wrapper.html()).toContain('Score: 1');
  });
});
