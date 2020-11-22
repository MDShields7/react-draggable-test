import "./App.css";
import Gamebox from "./Gamebox";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Draggable Test</h1>
      </header>
      <div className="gameContainer">
        <Gamebox></Gamebox>
      </div>
    </div>
  );
}

export default App;
