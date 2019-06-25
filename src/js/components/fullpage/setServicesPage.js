import Paginator from '../fullpage/Paginator';
import anime from 'animejs';
import { ACTIVE, ANIMATE, FLASH_DURATION } from '../../constants';

export default function setServicesPage(page) {
  const wrap = page.parentNode;
  const pagination = wrap.querySelector('.js-fullpage-pagination');

  const paginator = new Paginator('.js-fullpage', {
    pagination,
    allowWheel: true,
    allowTouch: true,
    customPagging: false
  });
  paginator._initFirstSection = () => {
    const section = paginator.$sections[0];
    const $elseSections = paginator.$sections.not(section);

    const block = section.querySelector('.section__block');
    const img = section.querySelector('.section-bg');

    section.classList.add(ACTIVE);

    paginator.tl = anime.timeline({ easing: 'linear' });

    paginator.tl
      .add({
        targets: block,
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800
      })
      .add({
        targets: img,
        opacity: [0, 1],
        duration: 700
      });

    paginator.tl.finished.then(() => {
      paginator.allowScroll = true;
    });    
  };
  paginator.getElements = (section) => {
    const elements = {
      word: section.querySelector('.flashIn'),
      block: section.querySelector('.section__block'),
      img: section.querySelector('.section-bg')
    };
    return elements;
  };
  paginator.enterAnimations = (self) => {
    if (self.getElements(self.target).word) {
      self.getElements(self.target).word.classList.add(ANIMATE);

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
        })
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
