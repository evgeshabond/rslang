import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './Footer.module.css';
import * as actions from '../../actions/menu-actions';
import { MenuState } from '../../reducer/menu-reducer';
import gamesImg from '../../assets/images/games.svg';
import ebookImg from '../../assets/images/e-book.svg';
import statisticImg from '../../assets/images/statistic.svg';
import { mainPath } from '../../utils/constants';

type MapDispatchToProps = {
  bottomMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState;

const Footer: React.FC<Props> = ({ bottomMenuIsOpen, bottomMenuOpen }) => {
  const bottomMenu = useRef(null);
  const buttonsContainer = useRef(null);

  useEffect(() => {
    if (bottomMenu && bottomMenuIsOpen) {
      (bottomMenu.current! as HTMLElement).style.bottom = '-1144px';
      (buttonsContainer.current! as HTMLElement).style.opacity = '1';
    }
    if (bottomMenu && !bottomMenuIsOpen) {
      (bottomMenu.current! as HTMLElement).style.bottom = '-1194px';
      (buttonsContainer.current! as HTMLElement).style.opacity = '0';
    }
  }, [bottomMenuIsOpen]);
  return (
    <footer className={styles.footer}>
      <div
        ref={bottomMenu}
        className={styles.wrapper__circle}
        onMouseLeave={() => bottomMenuOpen(false)}
        onMouseEnter={() => bottomMenuOpen(true)}
      >
        <div
          ref={buttonsContainer}
          className={styles['menu-buttons-container']}
        >
          <div
            className={`${styles['bottom-button']} ${styles['button_margin-small']}`}
          >
            <Link to={mainPath.gamePage}>
              <img src={gamesImg} alt="games" />
            </Link>
          </div>
          <div
            className={`${styles['up-button']} ${styles['button_margin-big']}`}
          >
            <Link to={mainPath.ebookPage}>
              <img src={ebookImg} alt="ebook" />
            </Link>
          </div>
          <div
            className={`${styles['up-button']} ${styles['button_margin-small']}`}
          >
            <Link to={mainPath.main}>
              <img src={ebookImg} alt="main" />
            </Link>
          </div>
          <div className={styles['bottom-button']}>
            <Link to={mainPath.main}>
              <img src={statisticImg} alt="statistic" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <button
          type="button"
          aria-label="Bottom-menu"
          className={styles['menu-btn']}
          onMouseEnter={() => bottomMenuOpen(true)}
        >
          <div className={styles['menu-btn__inner']} />
        </button>
      </div>
    </footer>
  );
};

const mapStateToProps = (state: RootStateType) => state.menuState;

export default connect(mapStateToProps, actions)(Footer);