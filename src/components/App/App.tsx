import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/Game-page';
import MainPage from '../../pages/Main-page';
import WordsList from '../words-list';
import Book from '../Book/Book'
import Learn from '../Book/Learn'
import styles from './App.module.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const mainPath = {
  main: '/',
  game: '/game',
  wordList: '/wordlist',
  book: '/book',
  learn: '/book/learn'
};

const App: React.FC = () => (
  <Router basename="/">
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Switch>
            <Route path={mainPath.main} component={MainPage} exact />
            <Route path={mainPath.game} component={GamePage} />
            <Route path={mainPath.wordList} component={WordsList} />
            <Route path={mainPath.book} component={Book} exact/>
            <Route path={mainPath.learn} component={Learn} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  </Router>
);

export default App;
