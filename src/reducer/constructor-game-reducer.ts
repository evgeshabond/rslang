import {
  CONSTRUCTOR_GAME_PLAY_STATUS,
  ConstructorGameActionType,
  CONSTRUCTOR_SHUFFLED_LIST,
  CONSTRUCTOR_ROUND_STATUS,
  UPDATE_CHARS_POSITION,
} from '../actions/constructor-game-actions';
import { CurrentWordListType } from '../actions/word-actions';

export type ConstructorGameStartState = {
  constructorGameIsStarted: boolean;
  shuffledWordList: Array<CurrentWordListType>;
  constructorRoundStatus: boolean;
  chars: [string, string][];
  roundCount: number;
};

const initialState: ConstructorGameStartState = {
  constructorGameIsStarted: false,
  shuffledWordList: [],
  constructorRoundStatus: false,
  chars: [['', '']],
  roundCount: 0,
};

const constructorGameReducer = (
  state = initialState,
  action: ConstructorGameActionType
) => {
  switch (action.type) {
    case CONSTRUCTOR_GAME_PLAY_STATUS:
      return { ...state, constructorGameIsStarted: action.payload };
    case CONSTRUCTOR_SHUFFLED_LIST:
      return { ...state, shuffledWordList: action.payload };
    case CONSTRUCTOR_ROUND_STATUS:
      return { ...state, constructorRoundStatus: action.payload };
    case UPDATE_CHARS_POSITION:
      return { ...state, chars: action.payload };
    default:
      return state;
  }
};

export { constructorGameReducer };
