function Browser() {
  this.browser = window.SafariViewController;
  this.open = this.open.bind(this);
  this.close = this.close.bind(this);
}

Browser.isAvailable = function (callback) {
  var waitForSafariViewController = function() {
    if (window.SafariViewController) {
      window.SafariViewController.isAvailable(callback);
    } else {
      setTimeout(waitForSafariViewController, 100);
    }
  }
  waitForSafariViewController();
};


Browser.prototype.open = function (url, callback) {
  var options = {
    url: url
  };

  this.browser.show(options, function (result) {
    callback(null, result);
  }, function (message) {
    callback(new Error(message));
  });
};

Browser.prototype.close = function (callback) {
  if(! callback instanceof Function) {
    callback = function() {}
  }

  this.browser.hide(function (result) {
    callback(null, result);
  }, function (message) {
    callback(new Error(message));
  });
};

module.exports = Browser;
