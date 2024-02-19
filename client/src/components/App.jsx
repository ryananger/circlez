import React, {useEffect, useState} from 'react';

import 'styles';
import st from 'ryscott-st';
import {helpers} from 'util';

import Stars from './Stars.jsx';
import Circle from './Circle.jsx';

const App = function() {
  const center = {x: window.innerWidth/2, y: window.innerHeight/2};

  st.mobile = window.innerWidth < 1100;
  st.landscape = st.mobile && window.innerWidth > window.innerHeight;

  st.center = center;

  return (
    <div className='app v'>
      <Stars />
    </div>
  );
};

export default App;