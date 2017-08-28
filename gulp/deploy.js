'use strict';
const _ = require('lodash');
const gulp = require('gulp');
const args = require('yargs').argv;
const u = require('./utilities.js');
const path = require('path');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const templateCache = require('gulp-angular-templatecache');
const del = require('del');


gulp.task('deploy-clean', function () {
  return del([u.options.distRoot]);
});

/**
 * Copia le immagini
 */
gulp.task('deploy-images', function () {
  return u.task(['./assets'], u.options.distRoot + 'assets/');
});
// /**
//  * Copia i font
//  */
// gulp.task('deploy-fonts', function () {
//   return u.task(u.options.vendorFonts, u.options.distRoot + 'iconfont/');
// });
// /**
//  * Copia le icone
//  */
// gulp.task('deploy-icons', function () {
//   return u.task(u.options.vendorIcons, u.options.distRoot + 'icons/');
// });
/**
 * Copia e concatena i css dell'applicazione
 */
gulp.task('deploy-styles', function(){
  return u.task([u.options.src + '**/*.css'], u.options.distRoot,{
    csso: true,
    concat: u.options.app+'.css'
  });
});
/**
 * Copia e concatena i css di 3 party
 */
gulp.task('deploy-vendor-styles', function(){
  return u.task(u.options.vendorCss, u.options.distRoot,{
    csso: true,
    concat: u.options.app+'.vendor.css'
  });
});
/**
 * Produce un file temporaneo con tutti i template html da includere
 * nel js dell'applicazione
 */
gulp.task('deploy-templates', function () {
  var src = [
    u.options.src + '/**/*.html',
    '!' + u.options.src + '/index.html'
  ];
  return gulp.src(src)
    .pipe(htmlmin({
      collapseWhitespace: true,
      preserveLineBreaks: true
    }))
    .pipe(templateCache(u.options.tempFile, {
      module: 'rdsApp'
    }))
    .pipe(gulp.dest(u.options.distRoot));
});
/**
 * Produce un unico file js con tutto il codice dell'applicazione
 */
gulp.task('deploy-js', function() {
  // var src = [
  //   config.package.src + '/app.js',
  //   config.package.src + '/app.routes.js',
  //   config.package.src + '/app.theme.js',
  //   config.package.src + '/app.mainscope.controller.js',
  //   config.package.src + '**/*.js',
  //   config.package.distRoot + config.package.tempFile,
  //   '!' + config.package.src + '**/*-printable.js',
  //   '!' + config.package.srcCustom + '**/*'];
  //
  // // esclude i moduli da opzione
  // var excluded = u.is('player') ? 'player' : args.excluded;
  // src.push.apply(src, config.exclusion(excluded, 'js'));
  //
  // return gulp.src(src)
  //   .pipe(concat(config.package.app+'.js'))
  //   .pipe(header(u.appBanner()))
  //   .pipe(gulp.dest(config.package.distApp));
});

/**
 * Produce un unico file js con tutto il codice di 3 party
 */
gulp.task('deploy-vendor-js', function () {
  // var src = _.clone(config.package.vendorJs);
  // src.push.apply(src, config.package.vendorFixJs);
  // var task = gulp.src(src)
  //   .pipe(concat(config.package.vendor+'.js'));
  // return task.pipe(header(u.appBanner('vendor')))
  //   .pipe(gulp.dest(config.package.distApp));
});


gulp.task('deploy-index', function () {
  //TODO ....


});
