const conf = require('../config.json'),
options = require('./options'),
gulp = require('gulp'),
scp = require('gulp-rsync'),
runSequence = require('run-sequence');

gulp.task('rsync', function() {
  return gulp.src(options.src)
  .pipe(rsync({
    root: conf.base.dist,
    hostname: options.host,
    username: 'webadmin',
    destination: options.dest,
    archive: true,
    silent: false,
    compress: true
  }))
  .on('error', function(err) {
    console.log(err);
  });
});

gulp.task('deploy', function (cb){
  runSequence('release', 'rsync', cb);
});
