import * as React from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

import { useState} from 'react';

import { useSearchParams } from 'react-router-dom'

let amount = '10';
let difficulty = '';
let type = 'multiple';
var slideIndex = 0;
var numSlides = 0;

const Home = () => {

  function carousel() {
      var i;
      var x = document.querySelectorAll<HTMLElement>('.slide');
      console.log(x)
      numSlides = x.length;
      for (i = 0; i < x.length; i++) {
          x[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > x.length) {
          slideIndex = 1;
      }
      x[slideIndex - 1].style.display = '';
      
  }

  function goFullscreen() {
      slideIndex -= 1;
      var elements = document.getElementsByClassName('slides');
      var elem = elements[0];
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      }
      else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
      }
      else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
      }
      else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
      }
  }

  let lastKey = 'none';

  document.onkeydown = function (event) {
      if (lastKey != event.key) {
          lastKey = event.key;
          changeSlides(event);
      }
  }

  document.onkeyup = function (event) {
      if (lastKey == event.key) {
          lastKey = 'none';
          
      }
  }

  function changeSlides(event) {
      const localX = event.clientX - event.target.offsetLeft;
      if (localX >= 30)
          carousel();
      if (localX < 30) {
          if (slideIndex - 2 == -1)
              slideIndex = numSlides - 1;
          else
              slideIndex -= 2;
          carousel();
      }
      switch (event.keyCode) {
          case 37:
              
              if (slideIndex - 2 == -1)
                  slideIndex = numSlides - 1;
              else
                  slideIndex -= 2;
              carousel();
              break;
          case 39:
              
              carousel();
              break;
      }
  }

  const updateAmount = (event) => {
      let newAmount = event.target.value;
      setNum(newAmount);
      if (newAmount < 1 || newAmount > 50)
          amount = '10';
      else
          amount = newAmount;
      
      updateUrl();
  }

  const updateDifficulty = (event) => {
      let newDifficulty = event.target.value;
      if (newDifficulty === 'Any Difficulty')
          difficulty = '';
      if (newDifficulty === 'Easy')
          difficulty = 'easy';
      if (newDifficulty === 'Medium')
          difficulty = 'medium';
      if (newDifficulty === 'Hard')
          difficulty = 'hard';
      
      updateUrl();
  }

  const updateType = (event) => {
      let newType = event.target.value;
      if (newType === 'Any Type')
          type = '';
      if (newType === 'Multiple Choice')
          type = 'multiple';
      if (newType === 'True/False')
          type = 'boolean';
      
      updateUrl();
  }

  let displayData;

  const [number, setNum] = useState(10);
  const [showPosts, setShowPosts] = useState();

  let apiUrl = 'https://opentdb.com/api.php?amount=' +
      amount +
      '&difficulty=' +
      difficulty +
      '&type=' +
      type +
      '&encode=base64';

  const updateUrl = () => {
      apiUrl =
          'https://opentdb.com/api.php?amount=' +
              amount +
              '&difficulty=' +
              difficulty +
              '&type=' +
              type +
              '&encode=base64'; 
  };

  const pullJson = (event) => {
      event.preventDefault();
      
      fetch(apiUrl)
          .then((response) => response.json())
          .then((responseData) => {
          displayData = responseData.results.map((item, index) => {
              return (
                <div className='slide' key={index} style={{display: 'none'}}>
                    <p id='slideText'>
                    {index + 1}. {atob(item.question)}
                    </p>
                </div>
              )
          });
          
          setShowPosts(displayData);
      });
  }

  const generateHandle = (event) => {
    slideIndex = 0;
    setTimeout(carousel);
    pullJson(event);
    document.querySelector<HTMLElement>('.slides').style.display = ''};

return (
  <div id="container">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"/>
    <div className="nav">
        <ul>
            <li><a className="active" href="/">TRIVIA GENERATOR</a></li>
            <li className="about"><a href="/About">About</a></li>
        </ul>
    </div>
    <div className="main_body">
        <div className="welcome">
            <h1>Welcome to Trivia Generator!</h1>
        </div>
        <section className="parameters_form">
            <p>Enter your parameters below</p>
            <br/>
            <label>Number of Questions</label>
            <br/>
            <input onChange={updateAmount} type="number" min="1" max="50" value="10"/>
            <br/>
            <label>Difficulty</label>
            <br/>
            <select onChange={updateDifficulty}>
                <option>Any Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
            <br/>
            <label>Type</label>
            <br/>
            <select onChange={updateType}>
                <option>Any Type</option>
                <option selected>Multiple Choice</option>
                <option>True/False</option>
            </select>
            <br/>
            <button type="button" onClick={generateHandle}>Generate</button>
        </section>
        <br/>
        <section className="slides" onClick={changeSlides} style={{display: 'none'}}>
            <div className="slide" style={{display: 'none'}}>
                <p id="slideText">TRIVIA</p>
            </div>
            {showPosts}
            <p id="fullscreen">
                <span className="material-symbols-outlined" onClick={goFullscreen}>fullscreen</span>
            </p>
        </section>
        <div id="spacer">

        </div>
    </div>
    <footer>
        <ul>
            <li className="title">Trivia Generator developed by Mitchell Zoph</li>
        </ul>
    </footer>
  </div>
  );
}

export default Home;