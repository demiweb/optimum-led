export const {
  $DOC,
  $WIN,
  $HTMLBODY,
  $HTML,
  $BODY,

  ACTIVE,
  OPEN,
  SHOW,
  FOCUS,
  ANIMATE,
  HIDDEN,
  NOSCROLL,
  NOTOUCH,
  ERROR,
  HASTEXT,
  VALID,
  FIXED,
  FLASH_DURATION,
  SECTION_BLOCK,
  FLASH_IN,
  SECTION_BG,
  TITLE,
  LOADING
} = {
  $DOC: $(document),
  $WIN: $(window),
  $HTMLBODY: $('html, body'),
  $HTML: $('html'),
  $BODY: $('body'),

  LOADING: 'is-loading',
  ACTIVE: 'is-active',
  OPEN: 'is-open',
  SHOW: 'is-show',
  FOCUS: 'has-focus',
  ANIMATE: 'is-animate',
  HIDDEN: 'is-hidden',
  NOSCROLL: 'no-scroll',
  NOTOUCH: 'no-touch',
  ERROR: 'has-error',
  HASTEXT: 'has-text',
  VALID: 'is-valid',
  FIXED: 'is-fixed',
  FLASH_DURATION: 1200,
  SECTION_BLOCK: 'section__block',
  FLASH_IN: 'flashIn',
  SECTION_BG: 'section-bg',
  TITLE: 'js-title'
};
