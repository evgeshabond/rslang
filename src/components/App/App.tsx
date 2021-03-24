import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/Game-page';
import { MainPage } from '../../pages/main-page/main-page';
import WordsList from '../word-list/words-list';
import styles from './App.module.css';
<<<<<<< HEAD
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import AudioGame from '../AudioGame/AudioGame';
import SavannaGame from '../SavannaGame/SavannaGame';

export const mainPath = {
    main: '/',
    game: '/game',
    wordList: '/wordlist',
};

const App: React.FC = () => (
    <Router basename="/">
        <div className={styles.App}>
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <AudioGame />
                    {/* <SavannaGame /> */}
                    <Switch>
                        <Route path={mainPath.main} component={MainPage} exact />
                        <Route path={mainPath.game} component={GamePage} />
                        <Route path={mainPath.wordList} component={WordsList} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </div>
    </Router>
=======
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserPage from '../../pages/auth-page/User-page';
import { mainPath } from '../../utils/constants';

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
            <Route path={mainPath.auth} component={UserPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  </Router>
>>>>>>> 556a247d4dd12be52ea2ca5c94f462681bebd575
);

export default App;
