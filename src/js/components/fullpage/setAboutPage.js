import Paginator from '../fullpage/Paginator';
import anime from 'animejs';
import { ACTIVE, ANIMATE, FLASH_DURATION } from '../../constants';
import setLazy from '../setLazy';

export default function setAboutPage(page) {
  const wrap = page.parentNode;

  const paginator = new Paginator('.js-fullpage', {
    allowWheel: true,
    allowTouch: true
  });
  paginator._initFirstSection = () => {
    const section = paginator.$sections[0];
    const $elseSections = paginator.$sections.not(section);

    const block = section.querySelector('.section__block');
    const word = section.querySelector('.flashIn');
    const img = section.querySelector('.section-bg');

    section.classList.add(ACTIVE);
    word.classList.add(ANIMATE);

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
        duration: 700
      });

    paginator.tl.finished.then(() => {
      paginator.allowScroll = true;
      word.classList.remove(ANIMATE);
    });    
  };
  paginator.getElements = (section) => {
    const elements = {
      word: section.querySelector('.flashIn'),
      block: section.querySelector('.section__block'),
      img: section.querySelector('.section-bg'),
      featuresTitle: section.querySelector('.features__title'),
      features: section.querySelectorAll('.feature')
    };
    return elements;
  };
  paginator.enterAnimations = (self) => {
    if (self.getElements(self.target).word) {
      self.getElements(self.target).word.classList.add(ANIMATE);
    };

    if (self.getElements(self.target).featuresTitle) {
      self.tl
        .add({
          targets: self.target,
          opacity: [0, 1],
          zIndex: [0, 1],
          duration: 600
        })
        .add({
          targets: self.getElements(self.target).featuresTitle,
          opacity: [0, 1],
          translateY: [-30, 0],
          duration: 500
        })
        .add({
          targets: self.getElements(self.target).features,
          opacity: [0, 1],
          translateY: [-30, 0],
          delay: anime.stagger(100),
          duration: 500
        });
    } else {
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
      if (self.getElements(self.current).word) {
        self.getElements(self.current).word.classList.remove(ANIMATE);
      };      
    });
  };
  paginator.init();
};
