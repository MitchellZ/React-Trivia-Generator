import * as React from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCFy8u7W1OT1-sRF5aTI4Qn3Z7k3_eJx3s',
  authDomain: 'react-trivia-generator.firebaseapp.com',
  projectId: 'react-trivia-generator',
  storageBucket: 'react-trivia-generator.appspot.com',
  messagingSenderId: '425929609914',
  appId: '1:425929609914:web:fe481e73d643a82c0aa883',
  measurementId: 'G-FWGCCGGD6N',
});

const firestore = firebase.firestore();

const Answers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = Number(searchParams.get('id'));

  const [answers, setAnswers] = useState<any | null>(null);

  const keysRef = firestore.collection('keys');
  const query = keysRef;

  const [keys] = useCollectionData(query);

  useEffect(() => {
    //Runs on every render
    if (keys != null) {
      getAnswers();
    }
  }, [keys]);

  function getAnswers() {
    if (keys.find((x) => x.id === id)) {
      let answerKey = keys.find((x) => x.id === id);

      let incorrect1 = <div/>;
      let incorrect2 = <div/>;
      let incorrect3 = <div/>;

      setAnswers(
        answerKey.answers.results.map((item, index) => {
          incorrect1 = (
            <p key={20 * (index + 1)} className="incorrect">
              {atob(item.incorrect_answers[0])}
            </p>
          );

          if (item.incorrect_answers.length >= 2) {
            incorrect2 = (
              <p key={30 * (index + 1)} className="incorrect">
                {atob(item.incorrect_answers[1])}
              </p>
            );
          }
          if (item.incorrect_answers.length >= 3) {
            incorrect3 = (
              <p key={40 * (index + 1)} className="incorrect">
                {atob(item.incorrect_answers[2])}
              </p>
            );
          }
          return (
            <div key={50 * (index + 1)}>
              <p key={index} className="question">
                {atob(item.question)}
              </p>
              <br />
              <p key={10 * (index + 1)} className="correct">
                {atob(item.correct_answer)}
              </p>
              <br />
              {incorrect1}
              <br />
              {incorrect2}
              <br />
              {incorrect3}
              <div key={60 * (index + 1)} id="spacer" />
            </div>
          );
        })
      );
    } else {
      setAnswers(
        <div>
          <p id="answers">Session ID expired or invalid.</p>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="nav">
        <ul>
          <li>
            <Link to="/" className="active">
              TRIVIA GENERATOR
            </Link>
          </li>
          <li className="about">
            <Link to="/About" className="active">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="main_body">
        <div className="welcome">
          <h1>ANSWER KEY</h1>
          <br />
          {answers}
        </div>
      </div>
      <footer>
        <ul>
          <li className="title">Trivia Generator developed by Mitchell Zoph</li>
        </ul>
      </footer>
    </div>
  );
};

export default Answers;
