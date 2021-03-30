import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStateType } from '../../reducer/root-reducer';
import * as actions from '../../actions/menu-actions';
import styles from './Header.module.css';
import { MenuState } from '../../reducer/menu-reducer';
import profileImg from '../../assets/images/profile.svg';
import settingsImg from '../../assets/images/settings.svg';
import teamImg from '../../assets/images/team.svg';
import infoImg from '../../assets/images/info.svg';
import { mainPath } from '../../utils/constants';
import { UserState } from '../../reducer/user-reducer';

type MapDispatchToProps = {
  topMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState & UserState;

const Header: React.FC<Props> = ({ topMenuIsOpen, topMenuOpen, isLogin }) => {
  const topMenu = useRef(null);
  const buttonsContainer = useRef(null);

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
            <Link to={isLogin ? mainPath.profilePAge : mainPath.auth}>
              <img src={profileImg} alt="profile" />
            </Link>
          </div>
          <div
            className={`${styles['bottom-button']} ${styles['button_margin-big']}`}
          >
            <Link to={mainPath.main}>
              <img src={teamImg} alt="about team" />
            </Link>
          </div>
          <div
            className={`${styles['bottom-button']} ${styles['button_margin-small']}`}
          >
            <Link to={mainPath.main}>
              <img src={infoImg} alt="info" />
            </Link>
          </div>
          <div className={styles['up-button']}>
            <Link to={mainPath.main}>
              <img src={settingsImg} alt="settings" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <button
          type="button"
          aria-label="Top-menu"
          className={styles['menu-btn']}
          onMouseEnter={() => topMenuOpen(true)}
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
