const conf = require('../config.json'),
gulp = require('gulp'),
runSequence = require('run-sequence'),
browserSync = require('browser-sync').create();

gulp.task('browser-sync:build', function() {
  'use strict';
  browserSync.init({
    server: {
      baseDir: conf.base.build
    },
    reloadDebounce: 2000,
    notify: false,
    open: false
  });
});

gulp.task('browser-sync:dist', function() {
  'use strict';
  browserSync.init({
    server: {
      baseDir: conf.base.dist
    },
    reloadDebounce: 2000,
    notify: false,
    open: false
  });
});

gulp.task('watch', function () {
  'use strict';
  gulp.watch(conf.base.src + conf.path.sass + conf.files.sassAll, ['sass', browserSync.reload]);
  gulp.watch(conf.base.src + conf.path.js + conf.files.js, ['js:build', browserSync.reload]);
  gulp.watch(conf.base.src + conf.files.pug, ['pug:build', browserSync.reload]);
  gulp.watch(conf.base.src + conf.path.json + conf.files.json, ['copy:build', browserSync.reload]);
});
