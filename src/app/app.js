import 'es6-promise/auto';

const init = () => {
  // COMPONENT CREATION
  [].forEach(e => e.factory());
};


((callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
})(init);
