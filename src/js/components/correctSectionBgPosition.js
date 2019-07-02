import { SECTION_BG } from '../constants';

export default function correctSectionBgPosition() {
  const $imgs = $((`.${SECTION_BG}`));

  if (!$imgs.length) return;

  $imgs.each((i, img) => {
    const container = $(img).closest('.ps')[0];
    if (!container) return;

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        let bottom = container.clientHeight - container.scrollHeight;
        img.style.bottom = bottom + 'px';
      });
    });
    observer.observe(container, { attributes: true });

    let bottom = container.clientHeight - container.scrollHeight;
    img.style.bottom = bottom + 'px';
  });
};
