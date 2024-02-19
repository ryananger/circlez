import React from 'react';

import {helpers} from 'util';

import Star from './Star.jsx';

const Stars = function() {
  const winX = window.innerWidth;

  var renderStars = function() {
    var rendered = [];
    var num = winX >= 1100 ? 150 : 50;

    for (var i = 0; i < num; i++) {
      var min = 1;
      var max = helpers.rand(6) + min + min;

      rendered.push(<Star key={i} min={min} max={max}/>);
    }

    return rendered;
  };

  return (
    <div className='stars'>
      {renderStars()}
    </div>
  );
};

export default Stars;