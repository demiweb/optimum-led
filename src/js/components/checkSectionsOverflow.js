export default function checkSectionOverflow(section) {
  // const sections = [].slice.call(document.querySelectorAll('.section'));

  // if (!sections.length) return;

  // sections.forEach(section => {
  const sectionCSS = window.getComputedStyle(section);
  // const height = section.clientHeight - parseInt(sectionCSS.paddingTop) - parseInt(sectionCSS.paddingBottom);
  const height = section.clientHeight ;
  const sHeight = section.scrollHeight;

  // console.log({height, sHeight});
    
  if (sHeight > height) {
    section.classList.add('is-overflowing');
  } else {
    section.classList.remove('is-overflowing');
  };
  // });
};
