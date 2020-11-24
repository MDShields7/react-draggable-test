import "./App.css";
import Gamebox from "./Gamebox";


function App() {
const gamebox = Gamebox();
const piecesArr = gamebox[0];
const squaresArr = gamebox[1];
// console.log('Gamebox',Gamebox)
// console.log('piecesArr',piecesArr)
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Draggable Test</h1>
      </header>
      <div className="gameContainer">
        {/* {squaresArr} */}
        {piecesArr}
        {/* <Gamebox/> */}
      </div>
    </div>
  );
}

export default App;
