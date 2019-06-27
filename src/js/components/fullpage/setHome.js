import Paginator from '../fullpage/Paginator';
import anime from 'animejs';
import { ACTIVE, ANIMATE, FLASH_DURATION, FLASH_IN, TITLE } from '../../constants';

export default function setHome(page) {
  const wrap = page.parentNode;
  const pagination = wrap.querySelector('.js-pagination');
  const next = wrap.querySelector('.js-next');
  const prev = wrap.querySelector('.js-prev');

  const paginator = new Paginator('.js-fullpage', {
    pagination,
    next,
    prev
  });
  paginator._initFirstSection = () => {
    const section = paginator.$sections[0];
    const $elseSections = paginator.$sections.not(section);

    const block = section.querySelector('.home-page__block');
    const img = section.querySelector('.home-page__img');
    const word = section.querySelector(`.${FLASH_IN}`);
    const title = section.querySelector(`.${TITLE}`);

    section.classList.add(ACTIVE);
    word.classList.add(ANIMATE);

    if (title) {
      setTimeout(() => {
        title.classList.add(ANIMATE);
      }, FLASH_DURATION);
    };    

    paginator.tl = anime.timeline({ easing: 'linear' });

    paginator.tl
      .add({
        targets: block,
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800
      }, `+=${FLASH_DURATION}`)
      .add({
        targets: img,
        opacity: [0, 1],
        duratioin: 800
      });

    paginator.tl.finished.then(() => {
      paginator.allowScroll = true;
      word.classList.remove(ANIMATE);
    });
  };
  paginator.enterAnimations = (self) => {
    self.getElements(self.target).word.classList.add(ANIMATE);
    if (self.getElements(self.target).title) {
      setTimeout(() => {
        self.getElements(self.target).title.classList.add(ANIMATE);
      }, FLASH_DURATION);
    };
    
    self.tl
      .add({
        targets: self.target,
        opacity: [0, 1],
        zIndex: [0, 1],
        duration: 600
      })      
      .add({
        targets: self.getElements(self.target).block,
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800
      }, `+=${FLASH_DURATION / 2}`)
      .add({
        targets: self.getElements(self.target).img,
        opacity: [0, 1],
        duration: 700
      });
  };
  paginator.exitAnimations = (self) => {
    self.tl
      .add({
        targets: self.current,
        opacity: [1, 0],
        zIndex: [1, 0],
        duration: 600
      });
    self.tl.finished.then(() => {
      self.getElements(self.current).word.classList.remove(ANIMATE);
    });
  };
  paginator.getElements = (section) => {
    const elements = {
      word: section.querySelector((`.${FLASH_IN}`)),
      block: section.querySelector('.home-page__block'),
      img: section.querySelector('.home-page__img'),
      title: section.querySelector(`.${TITLE}`)
    };
    return elements;
  };
  paginator.init();
};
