import React, {useEffect, useState, useRef} from 'react';

import st from 'ryscott-st';
import {helpers} from 'util';

const Star = function({min = 12, max = 150, range = 300}) {
  const [width, setWidth] = useState(min);
  const [style, setStyle] = useState({});
  const minW = min;
  const fullW = max;
  const el       = useRef(null);
  const styleRef = useRef(null);
  const pos      = useRef(null);
  const vel      = useRef(0.01 * (0.1 + helpers.rand(5)));
  const baseVel  = useRef(10);
  const seed     = useRef(Math.random());

  var mount = function() {
    var colors = ['#ffcf97c4', '#ffae97c4', '#fff197c4', '#adffe4c4'];
    var coords = {
      x: helpers.rand(window.innerWidth - ((max - min)*2)),
      y: helpers.rand(window.innerHeight - ((max - min)*2))
    };

    pos.current = coords;

    var chk = Math.random() < 0.1 ? 4 : 3;

    styleRef.current = {
      position: 'fixed',
      top: coords.y,
      left: coords.x,
      backgroundColor: colors[helpers.rand(chk)]
    };

    setStyle(styleRef.current);

    requestAnimationFrame(animate);
  };

  var moveStar = function() {
    if (st.rotate) {
      baseVel.current = 500;
    } else {
      if (baseVel.current > 10) {
        if (Number(st.page)) {
          baseVel.current *= 0.99;
        } else {
          baseVel.current *= 0.95;
        }
      }

      if (baseVel.current < 10.5) {
        baseVel.current = 10;
      }
    }

    var dir = pos.current.y < window.innerHeight/2 ? -baseVel.current : baseVel.current;
    var half = window.innerHeight/2;
    var dist = Math.abs(pos.current.y - half)/half;

    if (seed.current < 0.1) {
      dir *= -1;
      dir *= 0.7;
    }

    dir *= vel.current * dist;

    var newPos = {x: helpers.sigFigs(pos.current.x + dir, 2), y: pos.current.y};

    if (newPos.x < -10) {
      newPos.x = window.innerWidth + 10;
    } else if (newPos.x > window.innerWidth + 10) {
      newPos.x = -10;
    }

    var moved  = {...styleRef.current, left: newPos.x};

    setStyle(moved);
    styleRef.current = moved;
    pos.current = newPos;
  };

  var animate = function() {
    helpers.handleWidth(el, minW, fullW, range, setWidth);

    moveStar();

    requestAnimationFrame(animate);
  };

  useEffect(mount, []);
  useEffect(()=>{
    if (st.page) {
      baseVel.current += 1000;
    }
  }, [st.page]);

  return (
    <div ref={el} className='star circle grow' style={{...style, width: width, margin: `${-width/2}px`}}/>
  );
};

export default Star;