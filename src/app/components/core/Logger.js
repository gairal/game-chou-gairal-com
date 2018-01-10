export default class Logger {
  constructor(opts) {
    this.level = opts.level || Logger.levels.ERROR;
  }

  static get levels() {
    return {
      ERROR: 0,
      LOG: 1,
      INFO: 2,
      DEBUG: 3,
    };
  }

  /* eslint-disable no-console */

  info(...msg) {
    if (this.level >= Logger.levels.INFO) console.info(...msg);
  }

  log(...msg) {
    if (this.level >= Logger.levels.LOG) console.log(...msg);
  }

  error(...msg) {
    if (this.level >= Logger.levels.ERROR) console.error(...msg);
  }

  /* eslint-enable no-console */
}
