const conf = require('../config.json'),
pkg = require('../../package.json'),
gulp = require('gulp'),
puglint = require('gulp-pug-lint'),
pug = require('gulp-pug'),
inject = require('gulp-inject');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('pug:build', function() {
  'use strict';
  var myLocals = {
    'appName': pkg.name
  };

  return gulp.src([conf.base.src + conf.files.pug])
    .pipe(puglint())
    .pipe(pug({
      locals: myLocals,
      pretty: true
    }))
    .on('error', handleError)
    .pipe(inject(gulp.src(conf.vendor.js, {read: false}), {addRootSlash: false}))
    .pipe(gulp.dest(conf.base.build));
});
