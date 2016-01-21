/**
 * @author bornkiller <hjj491229492@hotmail.com>
 * @version v0.1.0
 * @copyright bornkiller personal project
 * @license MIT
 */

"use strict";

/**
 * @description - inject specific content into template
 * @module base/injector
 */

const manifestRegExp = / manifest="(.*?)"/gi;
const applicationRegExp = / ng-app="(.*?)"/gi;
const sonar = require('./sonar.js');

exports.injectManifest = injectManifest;
exports.injectCordovaClass = injectCordovaClass;
exports.injectAngularApp = injectAngularApp;

/**
 * @description - inject manifest into html tag
 * @name module:base/injector.injectManifest
 *
 * @param {string} htmlTag - html tag from template
 * @param {string} manifest - manifest static path
 * @returns {boolean|string}
 */
function injectManifest(htmlTag, manifest) {
  if (!manifest) return htmlTag;
  return manifestRegExp.test(htmlTag) ? htmlTag : htmlTag.replace('>', ' manifest="' + manifest + '">');
}

/**
 * @description - inject ng-app into html tag
 * @name module:base/injector.injectAngularApp
 *
 * @param {string} bodyTag - body tag from template
 * @param {string} platform - which hybrid platform, like ios, android
 * @returns {boolean|string}
 */
function injectCordovaClass(bodyTag, platform) {
  if (!platform) return bodyTag;

  let classAttr = sonar.seekClassAttr(bodyTag);
  let className = sonar.seekCordovaClass(platform);
  let newBodyTag = bodyTag;

  if (!classAttr) {
    newBodyTag = bodyTag.replace('>', ' class="' + className.trim() + '">');
  } else {
    let endingQuote = classAttr.substring(classAttr.length - 1);
    let newClassAttr = classAttr.substring(0, classAttr.length - 1);
    newClassAttr = newClassAttr + className + endingQuote;
    newBodyTag = bodyTag.replace(classAttr, newClassAttr);
  }

  return newBodyTag;
}

/**
 * @description - inject ng-app into html tag
 * @name module:base/injector.injectAngularApp
 *
 * @param {string} bodyTag - body tag from template
 * @param {boolean|string} application - angular application name
 * @returns {boolean|string}
 */
function injectAngularApp(bodyTag, application) {
  if (!application) return bodyTag;
  return applicationRegExp.test(bodyTag) ? bodyTag : bodyTag.replace('>', ' ng-app="' + application + '">');
}