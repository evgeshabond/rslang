import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/Game-page';
import MainPage from '../../pages/Main-page';
import styles from './App.module.css';

const App: React.FC = () => (
  <Router basename="/travel-app">
    <div className={styles.App}>
      <h1 className={styles.App__title}>Travel-app</h1>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/game" component={GamePage} />
      </Switch>
    </div>
  </Router>
);

export default App;
