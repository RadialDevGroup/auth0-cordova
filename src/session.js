function Session() {}

Session.clean = function () {
  console.log('NOW');
  Session.current = function () { return false; };
  Session.isClosing = false;
};

Session.closing = function () {
  Session.isClosing = true;
};

Session.start = function (current) {
  console.log("Ready. Begin");
  Session.current(new Error('Only one instance of auth can happen at a time'));
  Session.current = current;
};

Session.onRedirectUri = function (url) {
  console.log('handling Uri', url);
  if (Session.current(null, url)) {
    Session.clean();
  }
};

module.exports = Session;
