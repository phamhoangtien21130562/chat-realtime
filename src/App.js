import logo from './logo.svg';
import './App.css';
import LeftSideBar from "./components/leftSideBar/LeftSideBar";
import MainChat from "./components/mainChat/MainChat";
import RightSideBar from "./components/rightSideBar/RightSideBar";

function App() {
  return (
    <div className="App">
      <LeftSideBar/>
      <MainChat/>
      <RightSideBar/>
    </div>
  );
}

export default App;
