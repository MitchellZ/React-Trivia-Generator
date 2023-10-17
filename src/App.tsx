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
import { useEffect } from 'react';

// Defining the default function for the App component
export default function App() {

  // Handle Dark Mode/Light Mode preference based on system color scheme
  useEffect(() => {
    // Function to handle changes in color scheme preference
    const handleColorSchemeChange = (event) => {
      if (event.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    };

    // Check the initial color scheme preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    handleColorSchemeChange(prefersDarkMode); // Set initial state

    // Listen for changes in color scheme preference and update the class
    prefersDarkMode.addEventListener('change', handleColorSchemeChange);

    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      prefersDarkMode.removeEventListener('change', handleColorSchemeChange);
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

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
