"use strict";

const fs = require('fs');
const path = require('path');
const should = require('should');
const sonar = require('../base/sonar.js');
const template = fs.readFileSync(path.join(__dirname, 'fixture', 'index-origin.html')).toString();

describe('sonar sub module', function () {
  it('should return html tag when template valid', function () {
    sonar.seekHtmlTag(template).trim().should.equal('<html lang="zh-CN">')
  });

  it('should return false when template invalid', function () {
    sonar.seekHtmlTag('<p class="text-info"></p>').should.be.false;
  });

  it('should return body tag when template valid', function () {
    sonar.seekBodyTag(template).trim().should.equal('<body class="container">')
  });

  it('should return body tag when template invalid', function () {
    sonar.seekBodyTag('<p class="text-info"></p>').should.be.false;
  });

  it('should return false when bodyTag have nothing class attribution', function () {
    sonar.seekClassAttr('<body id="world">').should.be.false;
  });

  it('should return class name when bodyTag have class attribution', function () {
    sonar.seekClassAttr('<body class="text-info">').trim().should.equal('class="text-info"')
  });

  it('should generate related cordova class', function () {
    sonar.seekCordovaClass('ios').trim().should.equal('platform-ios platform-cordova platform-webview');
    sonar.seekCordovaClass('android').trim().should.equal('platform-android platform-cordova platform-webview');
  });
});