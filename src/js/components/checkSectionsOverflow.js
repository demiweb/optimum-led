export default function checkSectionsOverflow() {
  const sections = [].slice.call(document.querySelectorAll('.section'));

  if (!sections.length) return;

  sections.forEach(section => {
    const sectionCSS = window.getComputedStyle(section);
    // const height = section.clientHeight - parseInt(sectionCSS.paddingTop) - parseInt(sectionCSS.paddingBottom);
    const height = section.clientHeight ;
    const sHeight = section.scrollHeight;
    
    if (sHeight > height) {
      section.classList.add('is-overflowing');
    };
  });
};
