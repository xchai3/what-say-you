import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import About from "./pages/About";
import Header from "./layout/Header";
import buildQuestion from "./pages/BuildQuestion";
import currentQuestion from "./components/CurrentQuestion";
import result from "./pages/Results";
import users from "./components/Emails"
function App() {

  return (
      <Router>
    <div className="App">
        <Header/>
        <Route exact path="/" component={currentQuestion}
        />
        <Route exact path="/newQuestion" component={buildQuestion}
        />
        <Route exact path="/result" component={result}
        />
        <Route exact path="/about" component={About}
        />
        <Route exact path="/users" component={users}
        />
    </div>
      </Router>
  );
}

export default App;
