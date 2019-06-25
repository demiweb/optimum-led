import Animator from './Animator';
import { ACTIVE, $WIN, $DOC } from '../../constants';
import anime from 'animejs';
import '../../lib/touchevents';
// import PerfectScrollbar from 'perfect-scrollbar';

export default class Paginator {
  constructor(wrap, { next, prev, pagination, customPagging = true, allowWheel = false, allowTouch = false, pagingFromZero = true, zeroSlide = 0 }) {
    this.$wrap = $(wrap);
    this.$sections = this.$wrap.children();
    this.$pagination = $(pagination);
    this.activeSection = 0;
    this.nextSection = 0;
    this.delay = 2400;
    this.allowScroll = true;
    this.$prev = $(prev);
    this.$next = $(next);
    this.allowWheel = allowWheel;
    this.allowTouch = allowTouch;
    this.customPagging = customPagging;
    this.pagingFromZero = pagingFromZero;
    this.zeroSlide = zeroSlide;
    this.anchor = 'js-fullpage-anchor';
  };

  init() {
    if (!this.$sections.length) return;

    this._createPagination();

    if (this.getIdFromUrl() && this.getIdFromUrl().length > 1) {
      this._paginateOnLoad();
    } else if (this._initFirstSection) {
      this._initFirstSection();
    };

    
    if (this.allowWheel) {
      this._paginateOnScroll();
    };    
    this._paginateOnClick();
    if (this.allowTouch) {
      this._paginateOnTouch();
    };    
  };

  getIdFromUrl() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('#'));
    if (id.indexOf('http') === -1) {
      return id;
    };    
  };

  paginate(e) {
    if (!this.allowScroll) return;
    let direction;

    if (e && e.type === 'wheel') {
      e = e.originalEvent;
      direction = e.deltaY > 0 ? 1 : -1;
      this.nextSection = this.activeSection + direction;
    };

    if (e && e.type === 'click') {
      e.preventDefault();

      if ($(e.currentTarget).is(this.$prev)) {
        this.nextSection = this.activeSection - 1;
      } else if ($(e.currentTarget).is(this.$next)) {
        this.nextSection = this.activeSection + 1;
      } else {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        if (typeof index !== 'number') return;
        this.nextSection = index;
      };
    };
    if (e && e.type === 'swd') {
      const $container = $(e.target).closest('.fullpage-section');
      const $thumbY = $container.find('.ps__thumb-y');

      if ($thumbY && $thumbY.length > 0) {
        const top = parseInt($thumbY.css('top'));
        if (top === 0 ) {
          this.nextSection = this.activeSection - 1;
        };        
      } else {
        this.nextSection = this.activeSection - 1;
      };
    };
    if (e && e.type === 'swu') {
      const $container = $(e.target).closest('.fullpage-section');
      const $thumbY = $container.find('.ps__thumb-y');

      if ($thumbY && $thumbY.length > 0) {
        const thumbTop = parseInt($thumbY.css('top'));
        const thumbHeight = parseInt($thumbY.css('height'));
        const bottom = $container.innerHeight() - thumbTop - thumbHeight;

        if (bottom === 0 || thumbTop === 0) {
          this.nextSection = this.activeSection + 1;
        };
      } else {
        this.nextSection = this.activeSection + 1;
      };
    };

    if (typeof e === 'string') {
      const id = e;
      const index = this.$wrap.find(id).index();

      this.nextSection = index;
    };

    if (this.nextSection >= this.$sections.length || this.nextSection < this.zeroSlide || this.nextSection === this.activeSection) return;

    this.allowScroll = false;

    if (this.$buttons && this.$buttons.length > 0) {
      this.$buttons.removeClass(ACTIVE);
      $(this.$buttons[this.nextSection]).addClass(ACTIVE);
    };

    this.animator = new Animator({
      direction,
      $sections: this.$sections,
      from: this.activeSection,
      to: this.nextSection
    });

    if (this.getElements) {
      this.animator.getElements = this.getElements;
    };

    if (this.enterAnimations) {
      this.animator.enterAnimations = this.enterAnimations;
    };

    if (this.exitAnimations) {
      this.animator.exitAnimations = this.exitAnimations;
    };
  
    this.animator.animate();
  
    this.activeSection = this.nextSection;

    if (this.pagingFromZero && this.activeSection > 0) {
      this.$pagination.addClass(ACTIVE);
    } else {
      this.$pagination.removeClass(ACTIVE);
    };

    setTimeout(() => {
      this.allowScroll = true;
    }, this.delay);
  };

  _createPagination() {
    if (!this.$pagination.length) return;

    if (this.customPagging) {
      this.$buttons = this.$pagination.find('a');
      this.$buttons.each((i, btn) => {
        btn.setAttribute('data-index', i);
      });
    } else {
      this.$pagination.append('<ul></ul>');
      for (let i = 0; i < this.$sections.length; i++) {
        const $list = this.$pagination.find('ul');
        let btnInner, number;

        if (this.pagingFromZero) {
          number = i < 10 ? `0${i}` : i;  
        } else {
          number = i + 1 < 10 ? `0${i + 1}` : i + 1;  
        };
        

        if (i === 0) {
          $list.append(`<li><a href="#" class="${ACTIVE}" data-index="${i}">${number}</a></li>`);
        } else {
          $list.append(`<li><a href="#" data-index="${i}">${number}</a></li>`);
        };      
      };
      this.$buttons = this.$pagination.find('a');
    };
  };

  _paginateOnScroll() {
    $WIN.on('wheel', this.paginate.bind(this));
  };

  _paginateOnClick() {
    if (this.anchor) {
      $DOC.on('click', `.${this.anchor}`, this.paginate.bind(this));
    };
    if (this.$buttons && this.$buttons.length > 0) {
      this.$buttons.on('click', this.paginate.bind(this));
    };
    if (this.$next.length > 0) {
      this.$next.on('click', this.paginate.bind(this));
    };
    if (this.$prev.length > 0) {
      this.$prev.on('click', this.paginate.bind(this));
    };
  };

  _paginateOnTouch() {
    const events = ['swu', 'swd'];
    events.forEach((event) => {
      window.addEventListener(event, this.paginate.bind(this));
    });
  };

  _paginateOnLoad() {
    this.paginate(this.getIdFromUrl());
  };
};
