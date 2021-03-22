import React from 'react';
import styles from './main-cat.module.css';
import img from '../../../assets/images/cat.png';

const MainCat: React.FC = () => (
  <img src={img} alt="" className={styles['main-cat']} />
);

export { MainCat };
