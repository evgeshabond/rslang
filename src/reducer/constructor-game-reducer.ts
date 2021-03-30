import {
  CONSTRUCTOR_GAME_PLAY_STATUS,
  ConstructorGameActionType,
  CONSTRUCTOR_SHUFFLED_LIST,
  CONSTRUCTOR_ROUND_STATUS,
  UPDATE_CHARS_POSITION,
  UPDATE_ROUND_COUNT,
  UPDATE_WORD_OBJ,
  UPDATE_LEARNED_COUNT,
} from '../actions/constructor-game-actions';
import { CurrentWordListType } from '../actions/word-actions';

export type ConstructorGameStartState = {
  constructorGameIsStarted: boolean;
  shuffledWordList: Array<CurrentWordListType>;
  constructorRoundStatus: boolean;
  chars: [string, string][];
  roundCount: number;
  wordObj: CurrentWordListType;
  learned: number;
};

const initialState: ConstructorGameStartState = {
  constructorGameIsStarted: false,
  shuffledWordList: [],
  constructorRoundStatus: false,
  chars: [['', '']],
  roundCount: 0,
  learned: 0,
  wordObj: {
    id: '0',
    group: 0,
    page: 0,
    word: '',
    image: '',
    audio: '',
    audioMeaning: '',
    audioExample: '',
    textMeaning: '',
    textExample: '',
    transcription: '',
    wordTranslate: '',
    textMeaningTranslate: '',
    textExampleTranslate: '',
  },
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
    case UPDATE_ROUND_COUNT:
      return { ...state, roundCount: action.payload };
    case UPDATE_WORD_OBJ:
      return { ...state, wordObj: action.payload };
    case UPDATE_LEARNED_COUNT:
      return { ...state, learned: action.payload };
    default:
      return state;
  }
};

export { constructorGameReducer };
