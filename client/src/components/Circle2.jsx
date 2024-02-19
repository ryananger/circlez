import React, {useEffect, useState, useRef} from 'react';

import {helpers} from 'util';
import temp_data from './temp_data2.js';

const Circle = function() {
  const center = {x: window.innerWidth/2, y: window.innerHeight/2};
  const [points, setPoints] = useState([]);
  const [year, setYear] = useState(0);
  const count = useRef(0);

  var calculateCoordinates = function(xData, xMax, yData, yMin, scale = 200) {
    const angle = (360 / xMax) * (xData);
    const radius = (yData - yMin) * scale;
    const posx = radius * Math.cos((angle * Math.PI) / 180);
    const posy = radius * Math.sin((angle * Math.PI) / 180);

    return {x: helpers.sigFigs(posx + center.x, 2), y: helpers.sigFigs(posy + center.y, 2)};
  };

  var coords = [];

  for (var key in temp_data) {
    var yr = temp_data[key];

    if (Number(key) > 1981) {
      yr.map(function(entry, i) {
        var mod = 4;

        if (Math.floor(i/mod) === i/mod) {
          entry && coords.push({year: Number(key), entry: calculateCoordinates(i/mod, yr.length/mod, entry, 10, 50)});
        }
      });
    }
  }

  var renderPoints = function() {
    var rendered = [];

    points.map(function(point, i) {
      rendered.push(<div key={i} className='point circle' style={{top: point.entry.y, left: point.entry.x, opacity: helpers.sigFigs((i + 1)/(points.length), 2)}}/>);
    });

    return rendered;
  };

  var animate = function() {
    if (count.current < coords.length) {
      setPoints(coords.slice(0, count.current));

      if (coords[count.current].year > year) {
        setYear(coords[count.current].year);
      }

      count.current += 30;

      requestAnimationFrame(animate);
    }
  };

  useEffect(animate, []);
  useEffect(()=>{}, [year]);

  return (
    <>
      <div className='headline'>Daily Sea Surface Temperature, World</div>
      <h2 className='year'>{year}</h2>

      <div className='point circle' style={{top: center.y, left: center.x}}/>
      {renderPoints()}
    </>
  );
};

export default Circle;