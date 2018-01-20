export default class Progress {
  constructor() {
    this.$section = document.getElementById('js-progress');
    [this.$progressBar] = this.$section.getElementsByClassName('js-progress-bar');
    this.$inputs = [].slice.call(this.$section.getElementsByClassName('input'));
    [this.$form] = this.$section.getElementsByClassName('form');
  }

  get isSesame() {
    return [
      '12211',
      '21112',
      '11212',
    ].indexOf(this.$inputs.map($char => $char.value).join('')) > -1;
  }

  hide() {
    this.$section.classList.add('hidden');
  }

  progress(loader, debug = false) {
    this.$progressBar.style.width = `${loader.progress}%`;
    if (debug && loader.progress >= 100) this.hide();
  }

  resetCode() {
    for (let i = 0, l = this.$inputs.length; i < l; i += 1) {
      this.$inputs[i].value = '';
    }

    this.$inputs[0].focus();
  }

  init() {
    this.$inputs.forEach(($input) => {
      $input.addEventListener('keyup', (e) => {
        const curr = e.currentTarget;
        if (curr.value.length === 1) {
          const next = curr.nextElementSibling;
          if (next) {
            next.focus();
          } else if (this.isSesame) {
            this.hide();
          } else this.resetCode();
        } else {
          e.currentTarget.value = '';
        }
      });

      $input.addEventListener('focus', (e) => {
        e.currentTarget.value = '';
      });
    });

    return this;
  }

  /**
   * init and returns an instance of Progress
   *
   * @static
   * @returns Progress
   * @memberof Progress
   */
  static factory() {
    return new Progress().init();
  }
}
