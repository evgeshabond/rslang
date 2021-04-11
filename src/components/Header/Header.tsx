import { createStyles, makeStyles, Theme, Zoom } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/menu-actions';
import infoImg from '../../assets/images/info.svg';
import profileImg from '../../assets/images/profile.svg';
import settingsImg from '../../assets/images/settings.svg';
import teamImg from '../../assets/images/team.svg';
import { MenuState } from '../../reducer/menu-reducer';
import { RootStateType } from '../../reducer/root-reducer';
import { UserState } from '../../reducer/user-reducer';
import { mainPath } from '../../utils/constants';
import styles from './Header.module.css';

type MapDispatchToProps = {
  topMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState & UserState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customWidth: {
      fontSize: '2rem',
      color: '#5b2467',
      backgroundColor: '#fdebff',
      border: '1px solid #5b2467',
      marginTop: '0px',
    },
  })
);

const Header: React.FC<Props> = ({ topMenuIsOpen, topMenuOpen, isLogin }) => {
  const topMenu = useRef(null);
  const buttonsContainer = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (topMenu && topMenuIsOpen) {
      (topMenu.current! as HTMLElement).style.top = '-1144px';
      (buttonsContainer.current! as HTMLElement).style.opacity = '1';
    }
    if (topMenu && !topMenuIsOpen) {
      (topMenu.current! as HTMLElement).style.top = '-1194px';
      (buttonsContainer.current! as HTMLElement).style.opacity = '0';
    }
  }, [topMenuIsOpen]);

  const toggleMenuHandler = () => {
    topMenuIsOpen ? topMenuOpen(false) : topMenuOpen(true);
  };

  return (
    <header>
      <div
        className={styles.wrapper__circle}
        ref={topMenu}
        onMouseLeave={() => topMenuOpen(false)}
        onMouseEnter={() => topMenuOpen(true)}
      >
        <div
          ref={buttonsContainer}
          className={styles['menu-buttons-container']}
        >
          <div
            className={`${styles['up-button']} ${styles['button_margin-small']}`}
          >
            <Tooltip
              classes={{
                tooltip: classes.customWidth,
              }}
              placement="bottom"
              title="Профиль"
              TransitionComponent={Zoom}
            >
              <Link to={isLogin ? mainPath.profilePAge : mainPath.auth}>
                <img src={profileImg} alt="profile" />
              </Link>
            </Tooltip>
          </div>
          <div
            className={`${styles['bottom-button']} ${styles['button_margin-big']}`}
          >
            <Tooltip
              placement="bottom"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="О команде"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.aboutUs}>
                <img src={teamImg} alt="about team" />
              </Link>
            </Tooltip>
          </div>
          <div
            className={`${styles['bottom-button']} ${styles['button_margin-small']}`}
          >
            <Tooltip
              placement="bottom"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="Инфо"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.main}>
                <img src={infoImg} alt="info" />
              </Link>
            </Tooltip>
          </div>

          <div className={styles['up-button']}>
            <Tooltip
              placement="bottom"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="Статистика"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.statistic}>
                <img src={settingsImg} alt="statistic" />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <button
          type="button"
          aria-label="Top-menu"
          className={styles['menu-btn']}
          onClick={toggleMenuHandler}
        >
          <div className={styles['menu-btn__inner']} />
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  ...state.menuState,
  ...state.userState,
});

export default connect(mapStateToProps, actions)(Header);
