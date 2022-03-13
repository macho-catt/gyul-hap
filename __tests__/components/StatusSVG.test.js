import { shallowMount } from '@vue/test-utils';
import { StatusSVG } from '@/components';
import Correct from '@/assets/check.svg';
import Incorrect from '@/assets/x.svg';

describe('StatusSVG', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(StatusSVG, {});
    expect(wrapper.html()).toContain('div');
  });

  it('renders the svg for a correct answer', () => {
    const wrapper = shallowMount(StatusSVG, {
      props: {
        correct: true,
      },
    });
    const correctSvg = wrapper.findComponent(Correct);
    expect(correctSvg.exists()).toBe(true);

    const incorrectSvg = wrapper.findComponent(Incorrect);
    expect(incorrectSvg.exists()).toBe(false);
  });

  it('renders the svg for an incorrect answer', () => {
    const wrapper = shallowMount(StatusSVG, {
      props: {
        correct: false,
      },
    });
    const correctSvg = wrapper.findComponent(Correct);
    expect(correctSvg.exists()).toBe(false);

    const incorrectSvg = wrapper.findComponent(Incorrect);
    expect(incorrectSvg.exists()).toBe(true);
  });
});
