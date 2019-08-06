var BrowserAgent = require('./browser');
var WebViewAgent = require('./webview');

module.exports = function getAgent(callback, options={}) {
  return BrowserAgent.isAvailable(function (available) {
    const onIOS = window.cordova.platformId === 'ios';
    if (available && (onIOS || !options.useNativeBrowser)) {
      return callback(null, new BrowserAgent());
    }
    return callback(null, new WebViewAgent());
  });
};

