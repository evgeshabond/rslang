import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/Game-page';
import MainPage from '../../pages/Main-page';
import WordsList from '../words-list';
import styles from './App.module.css';

export const mainPath = {
  main: '/',
  game: '/game',
  wordList: '/wordlist',
};

const App: React.FC = () => (
  <Router basename="/travel-app">
    <div className={styles.App}>
      <h1 className={styles.App__title}>Rs Lang!</h1>
      <Switch>
        <Route path={mainPath.main} component={MainPage} exact />
        <Route path={mainPath.game} component={GamePage} />
        <Route path={mainPath.wordList} component={WordsList} />
      </Switch>
    </div>
  </Router>
);

export default App;
