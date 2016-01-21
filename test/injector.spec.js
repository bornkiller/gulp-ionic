"use strict";

const should = require('should');
const injector = require('../base/injector.js');

const baseHtmlTag = '<html lang="zh-CN">';
const extendHtmlTag = '<html lang="zh-CN" manifest="manifest/test.manifest">';
const baseBodyTag = '<body class="container">';
const extendBodyTag = '<body class="container" ng-app="Cloud">';

describe('injector sub module', function () {
  it('should inject nothing when platform not specific', function () {
    injector.injectCordovaClass(baseBodyTag).should.equal(baseBodyTag);
  });

  it('should inject platform specific class into body tag with create', function () {
    injector.injectCordovaClass('<body>', 'ios').should.equal('<body class="platform-ios platform-cordova platform-webview">')
  });

  it('should inject platform specific class into body tag with concat', function () {
    injector.injectCordovaClass(baseBodyTag, 'ios').should.equal('<body class="container platform-ios platform-cordova platform-webview">')
  });

  it('should inject manifest into html when manifest valid', function () {
    injector.injectManifest(baseHtmlTag, 'manifest/mocha.manifest').should.equal('<html lang="zh-CN" manifest="manifest/mocha.manifest">')
  });

  it('should inject nothing into html when manifest invalid', function () {
    injector.injectManifest(baseHtmlTag).should.equal(baseHtmlTag);
  });

  it('should inject nothing into html when already exist and manifest valid', function () {
    injector.injectManifest(extendHtmlTag, 'manifest/mocha.manifest').should.equal('<html lang="zh-CN" manifest="manifest/test.manifest">')
  });

  it('should inject application into body when application valid', function () {
    injector.injectAngularApp(baseBodyTag, 'Mocha').should.equal('<body class="container" ng-app="Mocha">')
  });

  it('should inject nothing into body when already exist and application valid', function () {
    injector.injectAngularApp(extendBodyTag, 'Mocha').should.equal('<body class="container" ng-app="Cloud">')
  });

  it('should inject nothing into body when application invalid', function () {
    injector.injectAngularApp(baseBodyTag).should.equal(baseBodyTag);
  });
});