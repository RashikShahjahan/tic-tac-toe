import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import StartScreen from "./pages/startscreen";
import GameScreen from "./pages/gamescreen";
import ResultScreen from "./pages/resultscreen";

function App() {
  return(
  <Router>
        <Route path="/">
          <StartScreen/>
        </Route>
        <Route path="/game">
          <GameScreen/>
        </Route>
        <Route path="/result">
          <ResultScreen/>
        </Route>
  </Router>
  )
  
}

export default App
