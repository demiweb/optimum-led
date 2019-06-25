import 'promise-polyfill/src/polyfill';

import setTouchClassName from './components/setTouchClassName';
import sayHello from './lib/sayHello';
import setLazy from './components/setLazy';
import setFullPage from './components/fullpage/setFullPage';
import toggleMenu from './components/toggleMenu';
import setScrollbar from './components/setScrollbar';
import correctSectionBgPosition from './components/correctSectionBgPosition';

$(function() {
  // sayHello();
  setTouchClassName();
  setLazy();
  setFullPage();
  toggleMenu();
  setScrollbar();
  correctSectionBgPosition();
});
