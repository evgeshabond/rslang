import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RootStateType } from '../../reducer/root-reducer';
import * as actions from '../../actions/menu-actions';
import styles from './Header.module.css';
import { MenuState } from '../../reducer/menu-reducer';

type MapDispatchToProps = {
  topMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState;

const Header: React.FC<Props> = ({ topMenuIsOpen, topMenuOpen }) => {
  const topMenu = useRef(null);
  useEffect(() => {
    if (topMenu && topMenuIsOpen) {
      (topMenu.current! as HTMLElement).style.top = '-1104px';
    }
    if (topMenu && !topMenuIsOpen) {
      (topMenu.current! as HTMLElement).style.top = '-1194px';
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
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
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
