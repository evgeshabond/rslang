import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/Game-page';
import MainPage from '../../pages/Main-page';
import WordsList from '../words-list';
import styles from './App.module.css';
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
                    {/* <AudioGame /> */}
                    <SavannaGame />
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
);

export default App;
