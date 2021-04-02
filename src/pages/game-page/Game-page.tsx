import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gameStartStatusChange } from '../../actions/word-actions';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { LinkButton } from '../../components/link-button/Link-button';
import { GameStart, mainPath } from '../../utils/constants';
import rootStyles from '../e-book-page/e-book-page.module.css';

const GamePage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameStartStatusChange(GameStart.Menu));
  }, []);
  return (
    <div className={rootStyles['ebook-container']}>
      <h2 className={rootStyles.title}>Мини-игры</h2>
      <div className={rootStyles['ebook-buttons-container']}>
        <LinkButton link={mainPath.gamePage} buttonName="Саванна" />
        <LinkButton link={mainPath.gamePage} buttonName="Аудиовызов" />
      </div>
      <div className={rootStyles['ebook-buttons-container']}>
        <LinkButton link={mainPath.gamePage} buttonName="Спринт" />
        <LinkButton
          link={mainPath.constructorGame}
          buttonName="Конструктор слов"
        />
      </div>
      <MainCat />
    </div>
  );
};

export default GamePage;
