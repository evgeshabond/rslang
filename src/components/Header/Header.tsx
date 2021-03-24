import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RootStateType } from '../../reducer/root-reducer';
import * as actions from '../../actions/menu-actions';
import styles from './Header.module.css';
import { MenuState } from '../../reducer/menu-reducer';
import profileImg from '../../assets/images/profile.svg';
import settingsImg from '../../assets/images/settings.svg';
import teamImg from '../../assets/images/team.svg';
import infoImg from '../../assets/images/info.svg';

type MapDispatchToProps = {
  topMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState;

const Header: React.FC<Props> = ({ topMenuIsOpen, topMenuOpen }) => {
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
            <img src={profileImg} alt="profile" />
          </div>
          <div
            className={`${styles['bottom-button']} ${styles['button_margin-big']}`}
          >
            <img src={teamImg} alt="about team" />
          </div>
          <div
            className={`${styles['bottom-button']} ${styles['button_margin-small']}`}
          >
            <img src={infoImg} alt="info" />
          </div>
          <div className={styles['up-button']}>
            <img src={settingsImg} alt="settings" />
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

const mapStateToProps = (state: RootStateType) => state.menuState;

export default connect(mapStateToProps, actions)(Header);
