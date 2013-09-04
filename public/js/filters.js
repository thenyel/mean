//Articles service used for articles REST endpoint
window.app.

  filter('trim', [function() {
    return function(text, len) {
      return String(text).substr(0, len || 10) + '...';
    };
  }]);
