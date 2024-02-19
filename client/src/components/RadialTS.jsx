import React, {useEffect, useState, useRef} from 'react';

const RadialTS = function({options}) {
  const [coords, setCoords] = useState([]);
  const [points, setPoints] = useState([]);
  const [unit, setUnit] = useState(0);
  const count = useRef(0);

  const {
    data,
    title,
    unitName,
    opacity,
    animated,
    center = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    skip   = 1,
    chunk  = 1,
    yMin   = 0,
    scale  = 200,
    resize = 1,
  } = options;

  var calculateCoordinates = function(xData, xMax, yData, yMin) {
    const angle = (360 / xMax) * (xData);
    const radius = (yData - yMin) * scale;
    const posx = radius * Math.cos((angle * Math.PI) / 180);
    const posy = radius * Math.sin((angle * Math.PI) / 180);

    return {x: sigFigs(posx + center.x, 2), y: sigFigs(posy + center.y, 2)};
  };

  var getCoords = function() {
    var coords = [];

    for (var key in data) {
      var cycle = data[key];

      cycle.map(function(entry, i) {
        if (Math.floor(i/skip) === i/skip) {
          entry && coords.push({year: Number(key), entry: calculateCoordinates(i/skip, Math.floor(cycle.length/skip), entry, yMin)});
        }
      });
    }

    setCoords(coords);
  };

  var renderPoints = function() {
    var rendered = [];

    points.map(function(point, i) {
      let style = {
        top: point.entry.y,
        left: point.entry.x,
        opacity: opacity ? sigFigs((i + 1)/(points.length), 2) : 1
      };

      rendered.push(<div key={i} className='point circle' style={style}/>);
    });

    return rendered;
  };

  var animate = function() {
    if (!animated) {
      setPoints(coords);
      return;
    }

    if (count.current < coords.length) {
      setPoints(coords.slice(0, count.current));

      if (coords[count.current][unitName] > unit) {
        setUnit(coords[count.current][unitName]);
      }

      if (count.current + chunk < coords.length) {
        count.current += chunk;
      } else {
        count.current += coords.length - count.current - 1;
      }

      requestAnimationFrame(animate);
    }
  };

  useEffect(getCoords, []);
  useEffect(animate, [coords]);

  return (
    <>
      <div className='headline'>{title}</div>
      <h2 className='year'>{unit > 0 ? unit : ''}</h2>
      <div className='radialContainer v' style={{transform: `scale(${resize})`}}>
        <div className='point circle' style={{top: center.y, left: center.x}}/>
        {renderPoints()}
      </div>
    </>
  );
};

var sigFigs = function(val, figs = 3) {
  var num = 1;

  for (var i = 0; i < figs; i++) {
    num += '0';
  }

  num = Number(num);

  return Math.floor(val * num)/num;
};

export default RadialTS;