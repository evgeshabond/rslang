import React from 'react';
import { Link } from 'react-router-dom';
import styles from './button-main.module.css';

type Props = {
  text: string;
  clickOnButton: () => void;
};

const MainButton: React.FC<Props> = ({ text, clickOnButton }) => (
  <Link
    to="/"
    className={styles['main-button']}
    onClick={clickOnButton}
    type="button"
  >
    {text}
  </Link>
);

export { MainButton };
