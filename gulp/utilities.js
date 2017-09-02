'use strict';
// MYPAK - deploy sequences
const _ = require('lodash');
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const csso = require('gulp-csso');

const _options = {
  src: './client',
  app: 'rds',
  distRoot: './dist/deploy',
  vendorCss: [],
  tempFile: '__temp.js'
};

module.exports.options = _options;


module.exports.task = function(src, dest, o, cb) {
  o = o||{};
  if (!_.isArray(src)) src = [src];
  var g = gulp.src(src);
  if (o.concat) g = g.pipe(concat(o.concat));
  if (o.replace && _.isObject(o.replace)) {
    for (var pn in o.replace)
      g = g.pipe(replace(pn, o.replace[pn], {skipBinary:true}));
  }
  if (o.uglify) g = g.pipe(uglify(o.uglifyOptions||{compress: { hoist_funs: false }}));
  if (o.csso) g = g.pipe(csso());
  if (cb) g = cb(g);
  if (o.rename) g = g.pipe(rename(o.rename));
  return g.pipe(gulp.dest(dest));
};
