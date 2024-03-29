import anime from 'animejs';
import { SECTION_BLOCK, SECTION_BG, FLASH_IN, ANIMATE, FLASH_DURATION, TITLE } from '../../constants';

export default function setContactsPage() {
  const block = document.querySelector(`.${SECTION_BLOCK}`);
  const img = document.querySelector(`.${SECTION_BG}`);
  const word = document.querySelector(`.${FLASH_IN}`);
  const title = document.querySelector(`.${TITLE}`);

  if (word) {
    word.classList.add(ANIMATE);
  };

  if (title) {
    setTimeout(() => {
      title.classList.add(ANIMATE);
    }, FLASH_DURATION);
  };

  const tl = anime.timeline({ 'easing': 'linear' });

  tl
    .add({
      targets: block,
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 700
    }, `+=${FLASH_DURATION}`)
    .add({
      targets: img,
      opacity: [0, 1],
      duration: 600
    });
};
