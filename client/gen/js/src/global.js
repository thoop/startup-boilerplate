(function() {

  window.delay = function(ms, func, scope) {
    return setTimeout(_.bind(func, scope || this), ms);
  };

}).call(this);
