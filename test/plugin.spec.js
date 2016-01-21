"use strict";

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const assert = require('stream-assert');
const gutil = require('gulp-util');
const File = gutil.File;

const ionic = require('../');

describe.only('gulp-ionic module', function () {
  it('should ignore null files', function (done) {
    let stream = ionic();
    let file = new File();

    stream.pipe(assert.length(0)).pipe(assert.end(done));
    stream.write(file);
    stream.end();
  });

  it('should not handle stream', function (done) {
    gulp.src('test/fixture/index-origin.html', {buffer: false})
      .pipe(ionic())
      .on('error', function(err) {
        err.message.should.equal('Stream Not Support');
        done();
      })
  });

  it('should inject specific thing into template', function (done) {
    gulp.src('test/fixture/index-origin.html')
      .pipe(ionic({
        manifest: 'manifest/mocha.manifest',
        application: 'mocha',
        platform: 'ios'
      }))
      .pipe(assert.first(function(file) {
        let destiny = fs.readFileSync(path.join(__dirname, 'fixture', 'index.html')).toString();
        file.contents.toString().should.equal(destiny);
        done();
      }));
  });
});