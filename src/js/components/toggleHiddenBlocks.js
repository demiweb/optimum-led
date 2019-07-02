import { $DOC, ACTIVE } from '../constants';
// import setScrollbar from './setScrollbar';
import PerfectScrollbar from 'perfect-scrollbar';
import { psAll } from './setScrollbar';

export default function toggleHiddenBlocks() {
  const btn = 'js-toggle-btn';

  $DOC.on('click', `.${btn}`, (e) => {
    e.preventDefault();
    const $wrap = $(e.currentTarget).closest('.section');
    const $blocks = $wrap.find('.js-toggle-block');
    const SLIDE_DURATION = 800;

    $(e.currentTarget).toggleClass(ACTIVE);
    $blocks.slideToggle(SLIDE_DURATION);

    setTimeout(() => {
      const container = $(e.currentTarget).closest('.ps')[0];
      if (!container) return;
      
      psAll.forEach((psCurrent, i) => {
        if (psCurrent.element.className === container.className) {
          console.log(psCurrent);
          // psCurrent.destroy();
          psCurrent.update();
        };
        
      });
    }, SLIDE_DURATION);
  });
};
