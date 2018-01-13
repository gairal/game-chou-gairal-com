export default class Progress {
  constructor() {
    this.$section = document.getElementById('js-progress');
    [this.$progressBar] = this.$section.getElementsByClassName('js-progress-bar');
  }

  progress(loader) {
    this.$progressBar.value = loader.progress;
    if (loader.progress >= 100) this.$section.classList.add('hidden');
  }
}
