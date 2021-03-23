import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './Footer.module.css';
import * as actions from '../../actions/menu-actions';
import { MenuState } from '../../reducer/menu-reducer';

type MapDispatchToProps = {
  bottomMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState;

const Footer: React.FC<Props> = ({ bottomMenuIsOpen, bottomMenuOpen }) => {
  const bottomMenu = useRef(null);
  useEffect(() => {
    if (bottomMenu && bottomMenuIsOpen) {
      (bottomMenu.current! as HTMLElement).style.bottom = '-1104px';
    }
    if (bottomMenu && !bottomMenuIsOpen) {
      (bottomMenu.current! as HTMLElement).style.bottom = '-1194px';
    }
  }, [bottomMenuIsOpen]);
  return (
    <footer className={styles.footer}>
      <div
        ref={bottomMenu}
        className={styles.wrapper__circle}
        onMouseLeave={() => bottomMenuOpen(false)}
        onMouseEnter={() => bottomMenuOpen(true)}
      />
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
