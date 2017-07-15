
$(function() {
  var components = [];
  var componentsData = [];
  var componentsLoaded = 0;
  if ($('.component').length > 0) {
    for (var i=0; i < $('.component').length; i++) {
      var el = $('.component').eq(i);
      components[i] = el;
      getData(i,el)
    }
  } else {
    runScript()
  }

  function getData(i,el) {
    $.get('/components/' + el.data('component') + '.html').done(function(data) {
      if (el.data()) {
        data = data.replace('{{twitter}}',el.data('twitter'))
        data = data.replace('{{fb}}',el.data('fb'))
        data = data.replace('{{bg}}',el.data('bg'))
        data = data.replace('{{vidID}}',el.data('vidid'))
        data = data.replace('{{person}}',el.data('person'))
        data = data.replace('{{first-last}}',el.data('first-last'))
        data = data.replace('{{twitter-user}}',el.data('twitter-user'))
      }
      componentsData[i] = data;
      componentsLoaded++;
      if (componentsLoaded === $('.component').length) {
        populateComponents()
      }
    }).fail(function(error){'Tell @dannpetty he should’ve found a better dev.'});
  }
  function populateComponents() {
    for (var i = components.length - 1; i >= 0; i--) {
      components[i].replaceWith(componentsData[i]);
    }
    runScript()
  }
})
