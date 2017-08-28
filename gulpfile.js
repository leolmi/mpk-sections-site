/* Created by Leo on 14/08/2017. */
'use strict';

require('require-dir')('./gulp');
var fs = require('fs');
var gulp = require('gulp');
var runSequence = require('run-sequence');


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
