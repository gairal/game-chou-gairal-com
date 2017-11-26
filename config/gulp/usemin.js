const conf = require('../config.json'),
gulp = require('gulp'),
usemin = require('gulp-usemin'),
uglify = require('gulp-uglify'),
cleanCss = require('gulp-clean-css'),
rev = require('gulp-rev');


gulp.task('usemin', function() {
  'use strict';
  return gulp.src(conf.base.build + '*.html')
    .pipe(usemin({
      css: [ cleanCss, 'concat', rev ],
      js: [ uglify, rev ]
    }))
    .pipe(gulp.dest(conf.base.dist));
});
