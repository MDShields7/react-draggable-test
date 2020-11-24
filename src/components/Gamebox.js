import React, { useState } from "react";
import "./Gamebox.css";

import ReactDraggable from "react-draggable";

const squares = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

function Gamebox() {
  // console.log("starting gamebox");
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [activeDrags, setActiveDrags] = useState(0);
  const [selected, setSelected] = useState([undefined, undefined]);
  const [hover, setHover] = useState(undefined);
  const [squareArr, setSquareArr] = useState(squares);
  // const [posOrigArr, setPosOrigArr] = useState([undefined, undefined]);
  const [posChangeArr, setPosChangeArr] = useState([undefined, undefined]);

  const boxStyle = {
    boxSizing: "border-box",
    width: "150px",
    height: "150px",
    zIndex: "0",
  };
  const pieceStyle = {
    boxSizing: "border-box",
    width: "150px",
    height: "150px",
    zIndex: "10",
    border: "solid 2px red",
  };
  const selectedStyle = {
    boxSizing: "border-box",
    width: "150px",
    height: "150px",
    zIndex: "10",
    border: "solid 2px red",
  };

  const handleDrag = (e, ui) => {
    // const { x, y } = xy;
    // console.log('selected',selected);
    let changeRow = ui.deltaX / 150;
    let changeCol = ui.deltaY / 150;
    console.log("changeRow", changeCol, "changeCol", changeRow);
    console.log("e.target.attributes", e.target.attributes);
    if (changeRow !== 0 || changeCol !== 0) {
     setPosChangeArr([changeRow, changeCol]);
    }
    console.log('posChangeArr[0]', posChangeArr[0], 'posChangeArr[1]', posChangeArr[1]);

    // setXy({
    //   x: x + ui.deltaX,
    //   y: y + ui.deltaY,
    // });
  };

  const onStart = (e) => {
    setActiveDrags(activeDrags + 1);
    console.log("e.target", e.target);
    console.log("e.target.attributes", e.target.attributes);
    let indexArr = e.target.attributes[0].value;
    // console.log('indexArr', indexArr)
    indexArr = indexArr.split(",");
    // console.log("transformed indexArr 1", indexArr);
    indexArr = indexArr.map((elem) => parseInt(elem));
    // console.log("transformed indexArr 2", indexArr);
    setSelected(indexArr);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
    
    let currentRow = selected[0];
    let currentCol = selected[1];
    console.log('currentRow', currentRow, 'currentCol', currentCol)    
    let changeCol = posChangeArr[0] || 0;
    let changeRow = posChangeArr[1] || 0;
    console.log('changeRow', changeRow, 'changeCol', changeCol)
    let newCol = currentCol + changeCol;
    let newRow = currentRow + changeRow;
    console.log('newRow', newRow, 'newCol', newCol)
    let currentItem = squareArr[currentRow][currentCol];
    let newItem = squareArr[newRow][newCol];
    // console.log('squareArr',squareArr);
    console.log('currentItem', currentItem, 'newItem', newItem)
    squareArr[newRow][newCol] = currentItem;
    squareArr[currentRow][currentCol] = newItem;
    setSquareArr(squareArr);
    console.log('squareArr',squareArr);
    setSelected([undefined, undefined]);
  };

  const dragHandlers = { onStart, onStop };
  let piecesArr = [];
  let rowArr = [];
  squareArr.forEach(function (elem, index) {
    elem.forEach(function (innerElem, innerIndex) {
      
      rowArr.push(
        <ReactDraggable
          data={[index, innerIndex]}
          key={innerIndex}
          bounds="parent"
          onDrag={handleDrag}
          grid={[150, 150]}
          positionOffset={{x:0, y:0}}
          {...dragHandlers}
        >
          <div
            data={[index, innerIndex]}
            style={
              selected && selected[0] === index && selected[1] === innerIndex
                ? selectedStyle
                : boxStyle
            }
            //   style={selected || hover === index ? selectedStyle || hoverStyle : boxStyle}
            className="box"
            // onMouseEnter={onHover}
            // onMouseOut={offHover}
          >
            <div className="no-cursor">innerElem: {innerElem}</div>
            {/* <div className="no-cursor">innerIndex: {innerIndex}</div> */}
            <div className="no-cursor">{[index, ",", innerIndex]}</div>
            <div className="no-cursor">
              x: {xy.x}, y: {xy.y}
            </div>
          </div>
        </ReactDraggable>
      );
    });
    piecesArr.push(rowArr);
    rowArr = [];
  });
  const squaresArr = [];
  squares.map(function (elem, index) {
    squaresArr.push(<div key={index} className="box"></div>);
  });
  const res = [piecesArr, squaresArr];
  //   console.log("res", res);
  return res;
  //   return squaresArr;
}

export default Gamebox;
