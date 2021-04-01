import React from 'react';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { LinkButton } from '../../components/link-button/Link-button';
import { mainPath } from '../../utils/constants';
import rootStyles from '../e-book-page/e-book-page.module.css';

const GamePage: React.FC = () => (
  <div className={rootStyles['ebook-container']}>
    <div className={rootStyles['ebook-buttons-container']}>
      <LinkButton link={mainPath.gamePage} buttonName="Саванна" />
      <LinkButton link={mainPath.gamePage} buttonName="Аудиовызов" />
    </div>
    <div className={rootStyles['ebook-buttons-container']}>
      <LinkButton link={mainPath.sprint} buttonName="Спринт" />
      <LinkButton link={mainPath.gamePage} buttonName="Конструктор слов" />
    </div>
    <MainCat />
  </div>
);

export default GamePage;
