import React, { useState } from "react";
import "./Gamebox.css";

import ReactDraggable from "react-draggable";

const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function Gamebox(props) {
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [activeDrags, setActiveDrags] = useState(0);

  const boxStyle = {
    boxSizing: 'border-box',
    width: "150px",
    height: "150px"
  };

  const [styles, setStyles] = useState(boxStyle);

  const handleDrag = (e, ui) => {
    console.log("ui", ui);
    console.log("ui.deltaX", ui.deltaX);
    const { x, y } = xy;
    setXy({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
    const newStyle = Object.assign({ zIndex: 10, border: 'solid 2px red' }, boxStyle);
    setStyles(newStyle);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
    const newStyle = Object.assign({ zIndex: 0, border: 'none'  }, boxStyle);
    setStyles(newStyle);
  };

  const dragHandlers = { onStart, onStop };

  const squaresArr = squares.map(function (elem, index) {
    return (
      <ReactDraggable
        key={index}
        bounds="parent"
        onDrag={handleDrag}
        {...dragHandlers}
      >
        <div style={styles} className="box">
          {elem}
        </div>
        {/* <div>x: {xy.x}, y: {xy.y}</div> */}
      </ReactDraggable>
    );
  });
  return squaresArr;
}

export default Gamebox;
