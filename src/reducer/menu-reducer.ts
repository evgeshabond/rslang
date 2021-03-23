import {
  BOTTOM_MENU_STATUS,
  MenuOpenActionType,
  TOP_MENU_STATUS,
} from '../actions/menu-actions';

export type MenuState = {
  topMenuIsOpen: boolean;
  bottomMenuIsOpen: false;
};

const initialState: MenuState = {
  topMenuIsOpen: false,
  bottomMenuIsOpen: false,
};
const menuReducer = (state = initialState, action: MenuOpenActionType) => {
  switch (action.type) {
    case TOP_MENU_STATUS:
      return { ...state, topMenuIsOpen: action.payload };
    case BOTTOM_MENU_STATUS:
      return { ...state, bottomMenuIsOpen: action.payload };
    default:
      return state;
  }
};

export { menuReducer };
