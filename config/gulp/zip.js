const conf = require('../config.json'),
gulp = require('gulp'),
zip = require('gulp-zip'),
runSequence = require('run-sequence'),
git = require('gulp-git');

gulp.task('delivery', function (cb){
  'use strict';
  runSequence('release', 'zip:release', cb);
});

gulp.task('zip:build', function () {
  'use strict';
  git.exec({args : 'describe --tags'}, function (err, stdout) {
    var name = stdout.replace(/\r?\n|\r/g,'');
    return gulp.src([conf.base.build + '*', conf.base.build + '.*'])
    .pipe(zip('release-build' + name + '.zip'))
    .pipe(gulp.dest('.'));
  });
});

gulp.task('zip:release', function () {
  'use strict';
  git.exec({args : 'describe --tags'}, function (err, stdout) {
    var name = stdout.replace(/\r?\n|\r/g,'');
    return gulp.src([conf.base.dist + '*', conf.base.dist + '.*'])
    .pipe(zip('release-dist' + name + '.zip'))
    .pipe(gulp.dest('.'));
  });
});
