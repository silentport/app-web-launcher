## app-web-launcher
[![Build Status](https://travis-ci.org/silentport/app-web-launcher.svg?branch=master)](https://travis-ci.org/silentport/app-web-launcher)
<a href="https://www.npmjs.com/package/app-web-launcher"><img alt="undefined" src="https://img.shields.io/npm/v/app-web-launcher.svg?style=flat"></a>
### This is a function that could open Native App from HTML page when some events are triggered.

### install
```javascript
npm i app-web-launcher -S
```

### usage

```html
<button onclick="goto"> open by app <button>
```

```javascript
const AppLauncher = require('app-web-launcher')
const appLauncher = new AppLauncher()
function goto() {
   appLauncher.launch({
     deepLink: "****",
     url: "****",
     pressCb: () => {/*todo*/},
     failCb: () => {/*todo*/}
   })
}
```
options

|key|type|value|
|-|-|-|
|ctx | Object|callback's context, default is window|
|deeplink | String|app's deeplink, must|
|url | String|download url if no app, must|
|pressCb | Function|callback when events were triggered, not must |
|failCb | Function|callback when no app, not must|       

