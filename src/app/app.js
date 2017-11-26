import 'es6-promise/auto';

import ChuGame from './ChuGame';

const init = () => {
  // COMPONENT CREATION
  [ChuGame].forEach(e => e.factory());
};


((callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
})(init);
