import React from 'react';
import { CurrentWordListType } from '../../actions/word-actions';
import styles from './word-item-game.module.css';

type Props = { word: CurrentWordListType };

const WordItem: React.FC<Props> = ({ word }) => (
  <div className={styles.word__item}>
    { word.wordTranslate}
  </div >

)

export { WordItem };
