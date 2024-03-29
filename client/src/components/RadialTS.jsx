import React, {useEffect, useState, useRef} from 'react';
import {IoIosInformationCircle as InfoIcon} from 'react-icons/io';


const RadialTS = function({options}) {
  const [coords, setCoords] = useState([]);
  const [points, setPoints] = useState([]);
  const [display, setDisplay] = useState('');
  const yMax = useRef(0);
  const unit = useRef(0);
  const count = useRef(0);
  const mobile = window.innerWidth < 1024;
  const landscape = mobile && window.innerHeight < window.innerWidth;

  const {
    data,
    title,
    source,
    unitName,
    opacity,
    animated,
    throttle,
    showVal,
    center = {x: window.innerWidth / 2, y: window.innerHeight / 2},
    skip   = 1,
    chunk  = 1,
    yMin   = 0,
    scale  = 200,
    resize = 1,
  } = options;

  var calculateCoordinates = function(xData, xMax, yData, yMin, scale) {
    const angle = (360 / xMax) * (xData);
    const radius = (yData - yMin) * scale;
    const posx = radius * Math.cos((angle * Math.PI) / 180);
    const posy = radius * Math.sin((angle * Math.PI) / 180);

    return {x: sigFigs(posx + center.x, 2), y: sigFigs(posy + center.y, 2)};
  };

  var getCoords = function() {
    var coords = [];
    var ratio = scale;
    var space;

    if (mobile) {
      for (let key in data) {
        let cycle = data[key];

        cycle.map(function(entry) {
          if (entry > yMax.current) {
            yMax.current = entry;
            space = yMax.current - yMin;
            ratio = landscape ? (window.innerHeight/space/2)*0.9 : window.innerWidth/space/2*0.9;
          }
        });
      }
    }

    for (let key in data) {
      let cycle = data[key];

      cycle.map(function(entry, i) {
        if (Math.floor(i/skip) === i/skip) {
          entry && coords.push({year: Number(key), value: entry, entry: calculateCoordinates(i/skip, Math.floor(cycle.length/skip), entry, yMin, ratio)});
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
        opacity: opacity ? sigFigs((i + 1)/(points.length), 3) : 1
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

      if (unit.current !== coords[count.current][unitName]) {
        var string = `${coords[count.current].value}`;

        showVal && setDisplay(string);
        unit.current = coords[count.current][unitName];
      }

      if (count.current + chunk < coords.length) {
        count.current += chunk;
      } else {
        count.current += coords.length - count.current - 1;
      }

      if (throttle) {
        setTimeout(function() {
          requestAnimationFrame(animate);
        }, throttle);
      } else {
        requestAnimationFrame(animate);
      }
    }
  };

  useEffect(getCoords, []);
  useEffect(()=>{
    setTimeout(animate, 1000);
  }, [coords]);

  return (
    <>
      <div className='headline'>{title} <InfoIcon className='icon grow' onClick={()=>{window.open(source, '_blank')}}/></div>
      <h2 className='display h' style={{justifyContent: showVal ? 'space-between' : 'center'}}>
        <div>{unit.current > 0 ? unit.current : ''}</div>
        {showVal && <div>{display}</div>}
      </h2>
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