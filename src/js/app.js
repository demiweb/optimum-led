import 'promise-polyfill/src/polyfill';

import setTouchClassName from './components/setTouchClassName';
import sayHello from './lib/sayHello';
import setLazy from './components/setLazy';
import setFullPage from './components/fullpage/setFullPage';
import toggleMenu from './components/toggleMenu';
import setScrollbar from './components/setScrollbar';
import correctSectionBgPosition from './components/correctSectionBgPosition';
import setPageAnimations from './components/animations/setPageAnimations';
import checkSectionsOverflow from './components/checkSectionsOverflow';
// import animateTitles from './components/animateTitles';

$(function() {
  // sayHello();
  setTouchClassName();
  setLazy();
  setFullPage();
  toggleMenu();
  setScrollbar();
  correctSectionBgPosition();
  setPageAnimations();
  checkSectionsOverflow();
  // animateTitles();
});
