import lozad from 'lozad';

export default function lazyLoading() {
  const $imgs = $('.js-lazy');

  $imgs.each((i, img) => {
    const observer = lozad(img);
    observer.observe();
  });  
};
