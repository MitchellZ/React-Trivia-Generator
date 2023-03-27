import * as React from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Answers from './Pages/Answers';

export default function App() {
  return (
    <Router>
      <div>
      </div>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Answers" element={<Answers />} />
      </Routes>
      <div>
      </div>
    </Router>
  );
}
