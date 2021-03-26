import React from 'react';
import { Link } from 'react-router-dom';
import styles from './link-button.module.css'

type Props = {
  link: string;
  buttonName: string;
};

export const LinkButton: React.FC<Props> = ({ link, buttonName }) => (
  <Link to={link} className={styles['link-button']}>{buttonName}</Link>
);
