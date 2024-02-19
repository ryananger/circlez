import React, {useState} from 'react';

import 'styles';
import t1 from './temp_data.js';
import t2 from './temp_data2.js';
import t3 from './butterfly.js';
import RadialTS from './RadialTS.jsx';
import CSVParse from './CSVParse.jsx';

const App = function() {
  const [options, setOptions] = useState('dsst');

  const dsst = {
    data: t1,
    yMin: 19.5,
    title: 'Daily Sea Surface Temperature, World',
    unitName: 'year',
    skip: 2,
    chunk: 60,
    opacity: true,
    animated: true,
    scale: 200
  };

  const dast = {
    data: t2,
    yMin: 11,
    title: 'Daily Surface Air Temperature, World',
    unitName: 'year',
    skip: 4,
    chunk: 30,
    opacity: true,
    animated: true,
    scale: 60
  };

  const butterfly = {
    data: t3['Pyronia tithonus'],
    yMin: 10,
    title: 'Pyronia tithonus, observed',
    unitName: 'year',
    skip: 1,
    chunk: 1,
    opacity: true,
    animated: true,
    scale: 0.05,
    throttle: 10
  };

  return (
    <div className='app v'>
      {options === 'dsst' && <RadialTS options={dsst}/>}
      {options === 'dast' && <RadialTS options={dast}/>}
      {options === 'butterfly' && <RadialTS options={butterfly}/>}
      <div className='nav'>
        <div onClick={()=>{setOptions('dsst')}}>DSST, World</div>
        <div onClick={()=>{setOptions('dast')}}>DAST, World</div>
        <div onClick={()=>{setOptions('butterfly')}}>Butterflies</div>
      </div>
      {/* <CSVParse /> */}
    </div>
  );
};

export default App;