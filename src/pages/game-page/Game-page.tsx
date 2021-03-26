import React from 'react';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { LinkButton } from '../../components/link-button/Link-button';
import AudioGame from '../AudioGame/AudioGame';
import { mainPath } from '../../utils/constants';
import rootStyles from '../e-book-page/e-book-page.module.css';

const GamePage: React.FC = () => (
  <div className={rootStyles['ebook-container']}>
    <div className={rootStyles['ebook-buttons-container']}>
      <LinkButton link={mainPath.savannaGame} buttonName="Саванна" />
      <LinkButton link={mainPath.audioGame} buttonName="Аудиовызов" />
    </div>
    <div className={rootStyles['ebook-buttons-container']}>
      <LinkButton link={mainPath.gamePage} buttonName="Спринт" />
      <LinkButton link={mainPath.gamePage} buttonName="Конструктор слов" />
    </div>
    <MainCat />
  </div>
);

export default GamePage;
