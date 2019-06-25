import { $DOC, $BODY, ACTIVE, NOSCROLL } from '../constants';
import anime from 'animejs';

class Burger {
  init() {
    $DOC.on('click', `.${Burger.classNames.burger}`, this.toggle.bind(this));
  };

  toggle(e) {
    e.preventDefault();

    const name = e.currentTarget.getAttribute('data-menu-target');
    const $target = name 
      ? $(`.${Burger.classNames.menu}[data-menu="${name}"]`)
      : $(`.${Burger.classNames.menu}`);

    $(e.currentTarget).toggleClass(ACTIVE);
    $target.toggleClass(ACTIVE);

    if (this.onToggle) {
      this.onToggle($(e.currentTarget), $target);
    };
  };

  close() {
    const $burgers = $(`.${Burger.classNames.burger}`);
    const $targets = $(`.${Burger.classNames.menu}`);

    if ($burgers.length > 0 && $targets.length > 0) {
      
      const customClose = () => {
        return new Promise(resolve => {
          if (this.onClose) {
            this.onClose($burgers, $targets, resolve);
          };
        });
      };
      const removeClasses = () => {
        return new Promise(resolve => {
          $burgers.removeClass(ACTIVE);
          $targets.removeClass(ACTIVE);
        });
      };

      customClose()
        .then(removeClasses);
    };   
  };
};

Burger.classNames = {
  burger: 'js-burger',
  menu: 'js-menu'
};

export default function toggleMenu() {
  const burger = new Burger();
  burger.onToggle = ($btn, $menu) => {
    const menu = $menu[0];
    const inner = menu.querySelector('.menu__inner');
    const items = menu.querySelectorAll('li');
    const tl = anime.timeline({ 'easing': 'linear' });

    if ($menu.hasClass(ACTIVE)) {
      tl
        .add({
          targets: inner,
          translateX: ['-100%', '0%'],
          duration: 300
        })
        .add({
          targets: items,
          translateX: [-100, 0],
          delay: anime.stagger(100),
          duration: 500
        });
    };
  };

  burger.onClose = ($btn, $menu, resolve) => {
    const menu = $menu[0];
    const inner = menu.querySelector('.menu__inner');
    const items = menu.querySelectorAll('li');
    const tl = anime.timeline({ 'easing': 'linear' });

    tl      
      .add({
        targets: items,
        translateX: [0, -100],
        delay: anime.stagger(100),
        duration: 500
      })
      .add({
        targets: inner,
        translateX: ['0%', '-100%'],
        duration: 300
      }, '-=500');

    tl.finished.then(resolve);
  };

  burger.init();

  const close = 'js-menu-close';

  $DOC.on('click', `.${close}`, (e) => {
    burger.close();
  });  
};
