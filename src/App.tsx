import * as React from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home.tsx';
import About from './Pages/About.tsx';
import Answers from './Pages/Answers.tsx';

// Defining the default function for the App component
export default function App() {
  return (
    <Router>
      <div>
      </div>
      <Routes>
        {/* Defining routes for the pages */}
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Answers" element={<Answers />} />
      </Routes>
      <div>
      </div>
    </Router>
  );
}
