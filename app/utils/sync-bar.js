export const CLASSES = {
  SUCCESS: 'sync-bar--success',
  ERROR: 'sync-bar--error',
  SYNCING: 'sync-bar--syncing'
};

export class SyncBar {
  constructor(element) {
    this.el = element;
    this.messageEl = element.querySelector('p');
    this.closeEl = element.querySelector('button');

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.syncing = this.syncing.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);

    this.closeEl.addEventListener('click', this.hide);
  }

  show() {
    this.el.setAttribute('aria-hidden', 'false');
  }

  hide() {
    this.el.setAttribute('aria-hidden', 'true');
  }

  setMessage(message) {
    this.messageEl.textContent = message;
  }

  syncing() {
    this.el.classList.remove(CLASSES.SUCCESS, CLASSES.ERROR);
    this.el.classList.add(CLASSES.SYNCING);
    this.setMessage('Syncing...');
    this.show();
  }

  success() {
    this.el.classList.remove(CLASSES.SYNCING, CLASSES.ERROR);
    this.el.classList.add(CLASSES.SUCCESS);
    this.setMessage('Syncing complete');
    this.show();
  }

  error() {
    this.el.classList.remove(CLASSES.SYNCING, CLASSES.SUCCESS);
    this.el.classList.add(CLASSES.ERROR);
    this.setMessage('Syncing failed');
    this.show();
  }
}
