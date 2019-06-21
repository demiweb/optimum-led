import anime  from 'animejs';
import { ACTIVE, ANIMATE, FLASH_DURATION } from '../../constants';

export default class Animator {
  constructor({ direction, $sections, from, to }) {
    this.direction = direction;
    this.$sections = $sections;
    this.from = from;
    this.to = to;
    this.current = $sections[from];
    this.target = $sections[to];
  };

  // this.getElements - in Paginator.js

  enterAnimations() {
    this.tl
      .add({
        targets: this.target,
        opacity: [0, 1],
        zIndex: [0, 1],
        duration: 600
      })      
      .add({
        targets: this.getElements(this.target).block,
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800
      })
      .add({
        targets: this.getElements(this.target).img,
        opacity: [0, 1],
        duration: 700
      });
  };

  exitAnimations() {
    this.getElements(this.current).word.classList.add(ANIMATE);
    this.tl
      .add({
        targets: this.getElements(this.current).block,
        opacity: [1, 0],
        translateY: [0, -30],
        duration: 800
      })
      .add({
        targets: this.getElements(this.current).img,
        opacity: [1, 0],
        duration: 700
      })      
      .add({
        targets: this.current,
        opacity: [1, 0],
        zIndex: [1, 0],
        duration: 600
      });
    this.tl.finished.then(() => {
      this.getElements(this.current).word.classList.remove(ANIMATE);
    });
  };

  animate() {
    this.tl = anime.timeline({
      easing: 'linear'
    });

    this.tl.finished.then(() => {
      $(this.current).removeClass(ACTIVE);
      $(this.target).addClass(ACTIVE);
    });

    this.exitAnimations();
    this.enterAnimations();
  };
};
