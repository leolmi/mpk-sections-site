'use strict';
// MYPAK - deploy sequences
var runSequence = require('run-sequence');
var gulp = require('gulp');

gulp.task('deploy', function(cb) {
  runSequence(
    'deploy-clean',
    'deploy-images',
    // 'deploy-fonts',
    // 'deploy-icons',
    'deploy-styles',
    'deploy-vendor-styles',
    'deploy-templates',
    'deploy-js',
    'deploy-vendor-js',
    'deploy-index',
    cb);
});
