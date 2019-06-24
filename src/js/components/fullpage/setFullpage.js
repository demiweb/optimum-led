// import Paginator from '../fullpage/Paginator';
// import anime from 'animejs';
// import { ACTIVE } from '../../constants';
import setHome from './setHome';
import setServicesPage from './setServicesPage';

export default function setFullpage() {
  const page = document.querySelector('.js-fullpage');  

  if (!page) return;

  const name = page.getAttribute('data-page');

  if (name === 'home') {
    setHome(page);
  };
  if (name === 'services') {
    setServicesPage(page);
  };

  

  
  
  // const lines = [].slice.call(page.children[0].querySelectorAll('.line'));
  // const letters = [].slice.call(document.querySelectorAll('.letter span'));

  // const $sections = $('.js-fullpage').children();
  // const section = $sections[0];

  // const logo = document.querySelector('.logo');
  // const navLinks = document.querySelector('.nav ul').children;
  // const contacts = document.querySelector('.header__contacts');
  // const lang = document.querySelector('.lang');
  // const burger = document.querySelector('.burger');
  // const copy = document.querySelector('.copy');
  
  // $sections.css({
  //   zIndex: -1,
  //   opacity: '0'
  // });

  // const tl = anime.timeline({
  //   easing: 'linear'
  // });

  // if (window.matchMedia('(min-width: 320px)').matches && window.matchMedia('(max-width: 991px)').matches) {
  //   tl
  //     .add({
  //       targets: logo,
  //       opacity: [0, 1],
  //       duration: 1000
  //     })      
  //     .add({
  //       targets: contacts,
  //       opacity: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: lang,
  //       opacity: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: burger,
  //       opacity: [0, 1],
  //       duration: 500
  //     })      
  //     .add({
  //       targets: copy,
  //       opacity: [0, 1],
  //       duration: 600,
  //     })
  //     .add({
  //       targets: section,
  //       opacity: [0, 1],
  //       zIndex: [0, 1],
  //       duration: 500
  //     });
  // } else if (window.matchMedia('(min-width: 992px)').matches && window.matchMedia('(max-width: 1199px)').matches) {
  //   tl
  //     .add({
  //       targets: logo,
  //       opacity: [0, 1],
  //       duration: 1000
  //     })
  //     .add({
  //       targets: contacts,
  //       opacity: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: lang,
  //       opacity: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: burger,
  //       opacity: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: copy,
  //       opacity: [0, 1],
  //       duration: 600,
  //     })
  //     .add({
  //       targets: section,
  //       opacity: [0, 1],
  //       zIndex: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: lines,
  //       translateY: ['-150%', '0%'],
  //       duration: 1000,
  //       delay: anime.stagger(300)
  //     }, '-=500')
  //     .add({
  //       targets: letters,
  //       translateX: ['-100%', '-40%'],
  //       opacity: [0, 1],
  //       duration: 500
  //     });
  // } else if (window.matchMedia('(min-width: 1200px)').matches) {
  //   tl
  //     .add({
  //       targets: logo,
  //       opacity: [0, 1],
  //       duration: 1000
  //     })
  //     .add({
  //       targets: navLinks,
  //       opacity: [0, 1],
  //       delay: anime.stagger(200),
  //       duration: 500
  //     })
  //     .add({
  //       targets: contacts,
  //       opacity: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: lang,
  //       opacity: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: copy,
  //       opacity: [0, 1],
  //       duration: 600,
  //     })
  //     .add({
  //       targets: section,
  //       opacity: [0, 1],
  //       zIndex: [0, 1],
  //       duration: 500
  //     })
  //     .add({
  //       targets: lines,
  //       translateY: ['-150%', '0%'],
  //       duration: 1000,
  //       delay: anime.stagger(300)
  //     }, '-=500')
  //     .add({
  //       targets: letters,
  //       translateX: ['-100%', '-40%'],
  //       opacity: [0, 1],
  //       duration: 500
  //     });
  // };  

  // tl.finished.then(() => {
  //   const paginator = new Paginator('.js-fullpage');
  //   paginator.init();
  // });  
};




