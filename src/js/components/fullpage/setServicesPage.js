import Paginator from '../fullpage/Paginator';
import anime from 'animejs';
import { ACTIVE, ANIMATE, FLASH_DURATION } from '../../constants';

export default function setServicesPage(page) {
  const wrap = page.parentNode;
  const pagination = wrap.querySelector('.js-fullpage-pagination');

  console.log(pagination);

  const paginator = new Paginator('.js-fullpage', {
    pagination,
    allowWheel: true,
    customPagging: false,
    zeroSlide: 1
  });
  paginator._initFirstSection = () => {
    const section = paginator.$sections[0];
    const $elseSections = paginator.$sections.not(section);

    

    section.classList.add(ACTIVE);
    
  };
  paginator.getElements = (section) => {
    const elements = {
      
    };
    return elements;
  };
  paginator.enterAnimations = (self) => {
    console.log(self);
  };
  paginator.exitAnimations = (self) => {
    
  };
  paginator.init();
};
