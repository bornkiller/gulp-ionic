# gulp-ionic
![Build Status](https://img.shields.io/travis/bornkiller/through-gulp/master.svg?style=flat)
![Coverage Report](http://img.shields.io/coveralls/bornkiller/through-gulp.svg?style=flat)
![Package Dependency](https://david-dm.org/bornkiller/through-gulp.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/through-gulp/dev-status.svg?style=flat)

tiny wrap for ionic prepare, inject manifest, modify body class like platform-ios, platform-cordova, platform-webview, and and declare ng-app automatically.

## Install
```js
npm install gulp-ionic --save-dev
```

## Options
```
{
  // the path link manifest
  manifest: false,
  // the angular application name
  application: false,
  // the specific platform, like ios, android
  platform: false
}
```

## Attention
Plugin still in development.

## Example

```javascript
// options
{
  manifest: 'manifest/mocha.manifest',
  application: 'mocha',
  platform: 'ios'
}
```


```html
<!-- original template -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <meta name="format-detection" content="telephone=no"/>
  <title>Internal Hybrid</title>
</head>

<body class="container">
</body>

</html>
```

```html
<!-- ionicify template -->
<!DOCTYPE html>
<html lang="zh-CN" manifest="manifest/mocha.manifest">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <meta name="format-detection" content="telephone=no"/>
  <title>Internal Hybrid</title>
</head>

<body class="container platform-ios platform-cordova platform-webview" ng-app="mocha">
</body>

</html>
```

## Contact
hjj491229492@hotmail.com
