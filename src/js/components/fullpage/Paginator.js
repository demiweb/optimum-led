import Animator from './Animator';
import { ACTIVE, $WIN, $DOC } from '../../constants';
import anime from 'animejs';
import '../../lib/touchevents';

export default class Paginator {
  constructor(wrap, { next, prev, pagination, customPagging = true, allowWheel = false, pagingFromZero = true, zeroSlide = 1 }) {
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
    this.customPagging = customPagging;
    this.pagingFromZero = pagingFromZero;
    this.zeroSlide = zeroSlide;
    this.anchor = 'js-fullpage-anchore';
  };

  init() {
    if (!this.$sections.length) return;

    // const url = window.location.href;
    // const id = url.substring(url.lastIndexOf('#') + 1);

    if (this._initFirstSection) {
      this._initFirstSection();
    };
    // this._initFirstSection();

    this._createPagination();
    if (this.allowWheel) {
      this._paginateOnScroll();
    };    
    this._paginateOnClick();
    this._paginateOnTouch();
  };

  paginate(e) {
    if (!this.allowScroll) return;
    let direction;
    
    if (e.type === 'wheel') {
      e = e.originalEvent;
      direction = e.deltaY > 0 ? 1 : -1;
      this.nextSection = this.activeSection + direction;
    };

    if (e.type === 'click') {
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
    if (e.type === 'swd') {
      this.nextSection = this.activeSection - 1;
    };
    if (e.type === 'swu') {
      this.nextSection = this.activeSection + 1;
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
      // this.$anchors.on('click', this.paginate.bind(this));
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
};
