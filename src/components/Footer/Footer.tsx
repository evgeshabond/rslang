import {
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
  Zoom,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/menu-actions';
import teamImg from '../../assets/images/team.svg';
import statisticImg from '../../assets/images/statistic.svg';
import { MenuState } from '../../reducer/menu-reducer';
import { RootStateType } from '../../reducer/root-reducer';
import { mainPath } from '../../utils/constants';
import styles from './Footer.module.css';

type MapDispatchToProps = {
  bottomMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    customWidth: {
      fontSize: '2rem',
      color: '#5b2467',
      backgroundColor: '#fdebff',
      border: '1px solid #5b2467',
      marginBottom: '50px',
    },
  })
);

const Footer: React.FC<Props> = ({ bottomMenuIsOpen, bottomMenuOpen }) => {
  const bottomMenu = useRef(null);
  const buttonsContainer = useRef(null);
  const classes = useStyles();

  const toggleMenuHandler = () => {
    bottomMenuIsOpen ? bottomMenuOpen(false) : bottomMenuOpen(true);
  };

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
          {/* <div
            className={`${styles['bottom-button']} ${styles['button_margin-small']}`}
          >
            <Tooltip
              placement="top"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="Игры"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.gamePage}>
                <img src={gamesImg} alt="games" />
              </Link>
            </Tooltip>
          </div> */}
          <div
            className={`${styles['up-button']} ${styles['button_margin-big']}`}
          >
            <Tooltip
              placement="top"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="О команде"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.aboutUs}>
                <img src={teamImg} alt="ebook" />
              </Link>
            </Tooltip>
          </div>
          <div className={styles['up-button']}>
            <Tooltip
              placement="top"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="Статистика"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.statistic}>
                <img src={statisticImg} alt="stat" />
              </Link>
            </Tooltip>
          </div>
          {/* <div className={styles['bottom-button']}>
            <Tooltip
              placement="top"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="Главная"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.main}>
                <img src={statisticImg} alt="statistic" />
              </Link>
            </Tooltip>
          </div> */}
        </div>
      </div>
      <div className={styles.wrapper}>
        <button
          type="button"
          aria-label="Bottom-menu"
          className={styles['menu-btn']}
          onClick={toggleMenuHandler}
        >
          <div className={styles['menu-btn__inner']} />
        </button>
      </div>
    </footer>
  );
};

const mapStateToProps = (state: RootStateType) => state.menuState;

export default connect(mapStateToProps, actions)(Footer);
