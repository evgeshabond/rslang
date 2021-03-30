const TOP_MENU_STATUS = 'TOP_MENU_STATUS';
const BOTTOM_MENU_STATUS = 'BOTTOM_MENU_STATUS';

const topMenuOpen = (value: boolean) => ({
  type: TOP_MENU_STATUS,
  payload: value,
});

const bottomMenuOpen = (value: boolean) => ({
  type: BOTTOM_MENU_STATUS,
  payload: value,
});

export type MenuOpenActionType = {
  type: string;
  payload: boolean;
};

export { topMenuOpen, bottomMenuOpen, TOP_MENU_STATUS, BOTTOM_MENU_STATUS };
