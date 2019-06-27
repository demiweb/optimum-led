import { SECTION_BG } from '../constants';

export default function correctSectionBgPosition() {
  const $imgs = $((`.${SECTION_BG}`));

  if (!$imgs.length) return;

  $imgs.each((i, img) => {
    const container = $(img).closest('.ps')[0];
    if (!container) return;

    const bottom = container.clientHeight - container.scrollHeight;
    img.style.bottom = bottom + 'px';
  });
};
