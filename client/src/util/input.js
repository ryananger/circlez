import st      from 'ryscott-st';

var mouse = {
  x: null,
  y: null,
  over: null
};

var handleCursor = function(e) {
  mouse.x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  mouse.y = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

  var element = document.elementFromPoint(mouse.x, mouse.y);

  mouse.over = element ? element : null;
};

window.addEventListener('mousemove', handleCursor, {passive: true});
window.addEventListener('touchmove', handleCursor, {passive: true});

var throttle;

var throttleKey = function() {
  var now = Date.now();
  var chk;

  if (throttle && now - throttle < 150) {
    chk = true;
  } else {
    chk = false;
  }

  throttle = Date.now();
  return chk;
};

window.addEventListener('keyup', function(e) {
  if (e.target.type === 'text') {return}

  if (throttleKey()) {
    return;
  }

  switch (e.key) {
  case 'h':

    break;
  case 'o':

    break;
  case 'm':

    break;
  case 'r':

    break;
  case '1':
  case '2':
  case '3':

    break;
  }
});

export default mouse;