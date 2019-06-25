export default function correctSectionBgPosition() {
  const $imgs = $('.section-bg');

  if (!$imgs.length) return;

  $imgs.each((i, img) => {
    const container = $(img).closest('.ps')[0];
    const bottom = container.clientHeight - container.scrollHeight;
    img.style.bottom = bottom + 'px'; });
};
