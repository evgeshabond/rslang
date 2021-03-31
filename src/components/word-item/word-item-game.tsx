import React from 'react';
import { CurrentWordListType } from '../../actions/word-actions';
import styles from './word-item-game.module.css';

type Props = { word: CurrentWordListType,
  buttonClick: () => void;
 };

const WordItem: React.FC<Props> = ({ word, buttonClick }) => (
  <button  type='button' onClick={buttonClick}  className={styles.word__item}>
    { word.wordTranslate}
  </button >

)

export { WordItem };
