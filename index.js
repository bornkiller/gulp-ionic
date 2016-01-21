/**
 * @description
 * - tiny wrap for ionic prepare
 * - inject manifest modify body class like platform-ios, platform-cordova, platform-webview
 * - and declare ng-app directive
 *
 * @version v0.1.0
 * @author bornkiller <hjj491229492@hotmail.com>
 * @copyright bornkiller personal project
 * @license MIT
 */

"use strict";

/**
 * Module dependencies
 */
const _ = require('underscore');
const through = require('through-gulp');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const sonar = require('./base/sonar.js');
const injector = require('./base/injector.js');

const PLUGIN_NAME = 'gulp-ionic';
/**
 * @description - gulp-ionic default options
 * @type options
 */
const defaults = {
  manifest: false,
  application: false,
  platform: false
};


/**
 * @module gulp-ionic
 * @type function
 */
exports = module.exports = plugin;

/**
 * @description - generate transform stream prepare ionic base html
 * @alias gulp-ionic
 *
 * @param {options} options
 */
function plugin(options) {
  options = _.defaults(options || {}, defaults);

  function transform(file, enc, callback) {
    if (file.isNull()) {
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Stream Not Support'))
    }

    if (file.isBuffer()) {
      let template = file.contents.toString();
      let htmlTag = sonar.seekHtmlTag(template);
      let bodyTag = sonar.seekBodyTag(template);
      let newHtmlTag;
      let newBodyTag;
      let newTemplate;

      newHtmlTag = injector.injectManifest(htmlTag, options.manifest);
      newBodyTag = injector.injectAngularApp(bodyTag, options.application);
      newBodyTag = injector.injectCordovaClass(newBodyTag, options.platform);

      newTemplate = template.replace(htmlTag, newHtmlTag);
      newTemplate = newTemplate.replace(bodyTag, newBodyTag);

      file.contents = new Buffer(newTemplate);
      this.push(file);
    }
  }

  return through(transform);
}
