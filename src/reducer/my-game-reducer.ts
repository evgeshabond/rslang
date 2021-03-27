import {
  MY_GAME_PLAY_STATUS,
  MyGameStartActionType,
} from '../actions/my-game-actions';

export type MyGameStartState = {
  myGameIsStarted: boolean;
};

const initialState: MyGameStartState = {
  myGameIsStarted: false,
};

const myGameReducer = (state = initialState, action: MyGameStartActionType) => {
  switch (action.type) {
    case MY_GAME_PLAY_STATUS:
      return { ...state, myGameIsStarted: action.payload };
    default:
      return state;
  }
};

export { myGameReducer };
