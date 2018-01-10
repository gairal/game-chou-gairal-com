const conf = require('../config.json'),
  gulp = require('gulp'),
  webpack = require('webpack'),
  gulpWebpack = require('webpack-stream'),
  eslint = require('gulp-eslint'),
  webpackDevConfig = require('../webpack.conf.dev');
  webpackProdConfig = require('../webpack.conf.prod');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('js:build', function() {
  'use strict';
  return gulp.src([conf.base.src + conf.path.js + conf.files.js])
  .pipe(gulpWebpack(webpackDevConfig, webpack))
  .on('error', handleError)
  .pipe(gulp.dest(conf.base.build + conf.path.js));
});

gulp.task('js:release', function() {
  'use strict';
  return gulp.src([conf.base.src + conf.path.js + conf.files.js])
  .pipe(eslint({configFile: './.eslintrc'}))
  .pipe(eslint.format())
  .pipe(gulpWebpack(webpackProdConfig, webpack))
  .on('error', handleError)
  .pipe(gulp.dest(conf.base.build + conf.path.js));
});
