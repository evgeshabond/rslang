import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/game-page/Game-page';
import { MainPage } from '../../pages/main-page/main-page';
import WordsList from '../word-list/words-list';
import styles from './App.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserPage from '../../pages/auth-page/User-page';
import { mainPath } from '../../utils/constants';
import SprintGame from '../Sprint-game/sprint-game/SprintGame';
import EbookPage from '../../pages/e-book-page/E-book-page';
import LearnPage from '../../pages/learn-page/LearnPage';
import DictionaryPage from '../../pages/dictionary-page/DictionaryPage';
import ProfilePage from '../../pages/profile-page/Profile-page';
import AudioGame from '../../pages/AudioGame/AudioGame';

import ConstructorGame from '../ConstructorGame/ConstructorGame';
import GitLinks from '../GitLinks/GitLinks';
import { QuestionPage } from '../../pages/question-page/Question-page';
import { GameTest } from '../game-statistic-test/Game-statistic-test';
<<<<<<< HEAD
import SavannaGame from '../../pages/SavannaGame/SavannaGame';
=======
import { StatisticPage } from '../../pages/statistic-page/Statistic-page';
>>>>>>> 436d19767f189f6dd44dcd6a97db86773a42af07

const App: React.FC = () => (
  <Router basename="/">
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>

          <GitLinks />
          <Switch>
            <Route path={mainPath.main} component={MainPage} exact />
            <Route path={mainPath.gamePage} component={GamePage} />
            <Route path={mainPath.wordList} component={WordsList} />
            <Route path={mainPath.auth} component={UserPage} />
            <Route path={mainPath.sprint} component={SprintGame} />
            <Route path={mainPath.ebookPage} component={EbookPage} exact />
            <Route path={mainPath.learnPage} component={LearnPage} />
            <Route path={mainPath.dictionaryPage} component={DictionaryPage} />
            <Route path={mainPath.profilePAge} component={ProfilePage} />
            <Route path={mainPath.audioGame} component={AudioGame} />
            <Route path={mainPath.savannaGame} component={SavannaGame} />

            <Route
              path={mainPath.constructorGame}
              component={ConstructorGame}
            />
            <Route path={mainPath.questionPage} component={QuestionPage} />
            <Route path={mainPath.testStatistic} component={GameTest} />
            <Route path={mainPath.statistic} component={StatisticPage} />
          </Switch>
        </main>

        <Footer />
      </div>
    </div>
  </Router>
);

export default App;
