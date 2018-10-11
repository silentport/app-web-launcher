
### This is a function that could open Native App from HTML page when some events are triggered.

### usage

#### for example
```html
<button onclick="goto"> open by app <button>
```
you can call openByApp in "goto" and handle some thing, it need one argument named option, option is an object, as follows:

|key|value|
|-|-|
|context | Object|callback's context, default is null|
|deeplink | String|app's deeplink, must|
|downloadUrl | String|download url if no app, must|
|hangUp | Number|maxium time from page was hangup to backup, default is 600ms|
|enter | Function|callback when events were triggered, not must |
|willDownLoad | Function|callback when no app, not must|       
