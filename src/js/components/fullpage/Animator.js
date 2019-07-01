import anime  from 'animejs';
import { ACTIVE, ANIMATE, FLASH_DURATION, LOADING } from '../../constants';

export default class Animator {
  constructor({ direction, $sections, from, to }) {
    this.direction = direction;
    this.$sections = $sections;
    this.from = from;
    this.to = to;
    this.current = $sections[from];
    this.target = $sections[to];
  };

  // getElements, enterAnimations, exitAnimations - in Paginator.js

  

  animate() {
    this.tl = anime.timeline({
      easing: 'linear'
    });    

    $(this.target).addClass(LOADING);

    this.exitAnimations(this);
    this.enterAnimations(this);

    this.tl.finished.then(() => {
      $(this.current).removeClass(ACTIVE);      
      $(this.target).addClass(ACTIVE);
      $(this.current).removeClass(LOADING);
      $(this.target).removeClass(LOADING);
    });
  };
};
