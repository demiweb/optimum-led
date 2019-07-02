import Paginator from '../fullpage/Paginator';
import anime from 'animejs';
import { ACTIVE, ANIMATE, FLASH_DURATION, SECTION_BLOCK, FLASH_IN, SECTION_BG, TITLE, HIDDEN } from '../../constants';


export default function setAboutPage(page) {
  const wrap = page.parentNode;

  const paginator = new Paginator('.js-fullpage', {
    allowWheel: true,
    allowTouch: true
  });
  paginator._initFirstSection = () => {
    const section = paginator.$sections[0];
    const $elseSections = paginator.$sections.not(section);

    const block = section.querySelector(`.${SECTION_BLOCK}`);
    const word = section.querySelector((`.${FLASH_IN}`));
    const img = section.querySelector((`.${SECTION_BG}`));
    const title = section.querySelector(`.${TITLE}`);
    const glowingext = section.querySelector('.glowing');    

    section.classList.add(ACTIVE);
    if (word) {
      word.classList.add(ANIMATE);
    };
    

    if (title) {
      setTimeout(() => {
        title.classList.add(ANIMATE);
        if (glowingext) {
          glowingext.classList.add(ANIMATE);
        };
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
        duration: 700
      });

    paginator.tl.finished.then(() => {
      paginator.allowScroll = true;
      if (word) {
        word.classList.remove(ANIMATE);
      };      
    });
  };
  paginator.getElements = (section) => {
    const elements = {
      word: section.querySelector((`.${FLASH_IN}`)),
      block: section.querySelector(`.${SECTION_BLOCK}`),
      img: section.querySelectorAll((`.${SECTION_BG}`)),
      featuresTitle: section.querySelector('.features__title'),
      features: section.querySelectorAll('.feature'),
      title: section.querySelector(`.${TITLE}`),
      nav: document.querySelector('.header .nav')
    };
    return elements;
  };
  paginator.enterAnimations = (self) => {
    if (paginator.nextSection > 0) {
      if (paginator.getElements(self.current).nav) {
        paginator.getElements(self.current).nav.classList.add(HIDDEN);
      };      
    } else {
      if (paginator.getElements(self.current).nav) {
        paginator.getElements(self.current).nav.classList.remove(HIDDEN);
      }; 
    };
    if (self.getElements(self.target).word) {
      self.getElements(self.target).word.classList.add(ANIMATE);
    };

    if (self.getElements(self.target).title) {
      setTimeout(() => {
        self.getElements(self.target).title.classList.add(ANIMATE);
      }, FLASH_DURATION);
    };


    if (paginator.animator.direction === 1) {
      self.target.style.opacity = 1;
      self.target.style.zIndex = 1;

      if (self.getElements(self.target).featuresTitle) {
        self.tl
          .add({
            targets: self.target,
            // opacity: [0, 1],
            translateY: ['100%', '0%'],
            zIndex: [0, 1],
            duration: 600
          }, 1)
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
          })
          .add({
            targets: self.getElements(self.target).img,
            opacity: [0, 1],
            duration: 700
          });
      } else {
        self.tl
          .add({
            targets: self.target,
            // opacity: [0, 1],
            translateY: ['100%', '0%'],
            zIndex: [0, 1],
            duration: 600
          }, 1)
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
    } else {
      self.target.style.opacity = 1;
      self.target.style.zIndex = 1;

      if (self.getElements(self.target).featuresTitle) {
        self.tl
          .add({
            targets: self.target,
            // opacity: [0, 1],
            translateY: ['-100%', '0%'],
            zIndex: [0, 1],
            duration: 600
          }, 1)
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
          })
          .add({
            targets: self.getElements(self.target).img,
            opacity: [0, 1],
            duration: 700
          });
      } else {
        self.tl
          .add({
            targets: self.target,
            // opacity: [0, 1],
            translateY: ['-100%', '0%'],
            zIndex: [0, 1],
            duration: 600
          }, 1)
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
  };
  paginator.exitAnimations = (self) => {
    if (paginator.animator.direction === 1) {
      self.tl
        .add({
          targets: self.current,
          // opacity: [1, 0],
          translateY: ['0%', '-100%'],
          zIndex: [1, 0],
          duration: 600
        });
    } else {
      self.tl
        .add({
          targets: self.current,
          // opacity: [1, 0],
          translateY: ['0%', '100%'],
          zIndex: [1, 0],
          duration: 600
        });
    };
    
    self.tl.finished.then(() => {
      if (self.getElements(self.current).word) {
        self.getElements(self.current).word.classList.remove(ANIMATE);
      };      
    });
  };
  paginator.init();
};
