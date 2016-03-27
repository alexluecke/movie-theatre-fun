angular.module('snackFilters', []).filter('whitespace', function() {
  return function(s) {
    return s.trim().split(/\s+/).join(' ');
  };
});
