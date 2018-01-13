import 'es6-promise/auto';

import ChuGame from './ChuGame';

const init = () => {
  // COMPONENT CREATION
  const game = ChuGame.factory();
  window.addEventListener('resize', () => game.resize());
};


((callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
})(init);
