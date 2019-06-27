import PerfectScrollbar from 'perfect-scrollbar';

export default function setScrollbar() {
  const containers = [].slice.call(document.querySelectorAll('.js-scrollbar-mob'));

  if (window.matchMedia('(max-width: 767px)').matches) {
    containers.forEach(container => {
      const ps = new PerfectScrollbar(container, {
        suppressScrollX: true
      });
    });
  };
};
