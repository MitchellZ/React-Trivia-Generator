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

      setAnswers(
        answerKey.answers.results.map((item, index) => {
          return <p key={index}>{atob(item.question)}</p>;
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
