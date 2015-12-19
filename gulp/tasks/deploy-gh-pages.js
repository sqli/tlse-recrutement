'use strict';

var gulp = require('gulp-help')(require('gulp'));
var ghPages = require('gulp-gh-pages');
var plumber = require('gulp-plumber');
var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');

gulp.task('deploy-gh-pages', 'Deploy to Github pages', ['build'], function() {
  return gulp.src(config.deploy.src)
    .pipe(plumber(handleError))
    .pipe(ghPages());
});
