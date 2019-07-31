const HIDDEN_CLASS = 'is-hidden';

export class FabForm {
  constructor(element, onSubmitCallback) {
    this.el = element;
    this.form = this.el.querySelector('form');
    this.onSubmitCallback = onSubmitCallback;
    this.isShown = false;

    this.clickOutsideToClose = this.clickOutsideToClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);

    this.form.addEventListener('submit', this.onSubmit);
    document.querySelectorAll(`[aria-controls="${this.el.id}"]`).forEach((trigger) => {
      trigger.addEventListener('click', this.toggle);
    });
  }

  clickOutsideToClose(event) {
    if (this.el.contains(event.target)) {
      return;
    }
    event.preventDefault();
    this.hide();
  }

  onSubmit(event) {
    this.onSubmitCallback(event);
    this.hide();
  }

  toggle(event) {
    event.stopPropagation();
    this.isShown ? this.hide() : this.show();
  }

  show() {
    this.isShown = true;
    this.el.classList.remove(HIDDEN_CLASS);
    document.body.addEventListener('click', this.clickOutsideToClose);
  }

  hide() {
    this.isShown = false;
    this.el.classList.add(HIDDEN_CLASS);
    document.body.removeEventListener('click', this.clickOutsideToClose);
  }
};
