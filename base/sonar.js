/**
 * @author bornkiller <hjj491229492@hotmail.com>
 * @version v0.1.0
 * @copyright bornkiller personal project
 * @license MIT
 */

"use strict";

/**
 * @description - seek specific target from template
 * @module base/sonar
 */

const htmlRegExp =  /<html(?=[\s>])(.*?)>/gi;
const bodyRegExp = /<body(?=[\s>])(.*?)>/gi;
const classRegExp = / class="(.*?)"/gi;

exports.seekHtmlTag = seekHtmlTag;
exports.seekBodyTag = seekBodyTag;
exports.seekClassAttr = seekClassAttr;
exports.seekCordovaClass = seekCordovaClass;

/**
 * @description - seek html tag from standard html
 * @name module:base/sonar.seekHtmlTag
 *
 * @param {string} segment - standard html content
 * @returns {boolean|string}
 */
function seekHtmlTag(segment) {
  return htmlRegExp.test(segment) && segment.match(htmlRegExp)[0];
}

/**
 * @description - seek body tag from standard html
 * @name module:base/sonar.seekBodyTag
 *
 * @param {string} segment - standard html content
 * @returns {boolean|string}
 */
function seekBodyTag(segment) {
  return bodyRegExp.test(segment) && segment.match(bodyRegExp)[0];
}

/**
 * @description - seek body tag from standard html
 * @name module:base/sonar.seekClassAttr
 *
 * @param {string} bodyTag - standard body tag, like '<body class="text-info" ng-app="Cloud">'
 * @returns {boolean|string}
 */
function seekClassAttr(bodyTag) {
  return classRegExp.test(bodyTag) && bodyTag.match(classRegExp)[0];
}

/**
 * @description - seek class name which should inject into body
 * @name module:base/sonar.seekCordovaClass
 *
 * @param {string} platform - which hybrid platform, like ios, android
 * @returns {boolean|string}
 */
function seekCordovaClass(platform) {
  const platformClass = 'platform-' + platform;
  const cordovaClass = 'platform-cordova platform-webview';

  return ' ' + platformClass + ' ' + cordovaClass;
}