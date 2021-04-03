import {
  ADD_LEARNED_WORD,
  ADD_NOT_LEARNED_WORD,
  CLEAR_WORDS,
  ConstructorGameActionType,
  CONSTRUCTOR_GAME_PLAY_STATUS,
  CONSTRUCTOR_GAME_RESULT_STATUS,
  CONSTRUCTOR_ROUND_STATUS,
  CONSTRUCTOR_SHUFFLED_LIST,
  UPDATE_CHARS_POSITION,
  UPDATE_LEARNED_COUNT,
  UPDATE_ROUND_COUNT,
  UPDATE_WORD_OBJ
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
  isResultPage: boolean;
  learnedWords: Array<CurrentWordListType>;
  notLearnedWords: Array<CurrentWordListType>;
};

const initialState: ConstructorGameStartState = {
  constructorGameIsStarted: false,
  shuffledWordList: [],
  constructorRoundStatus: false,
  chars: [['', '']],
  roundCount: 1,
  learned: 0,
  learnedWords: [],
  notLearnedWords: [],
  isResultPage: false,
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
    case CONSTRUCTOR_GAME_RESULT_STATUS:
      return { ...state, isResultPage: action.payload };
    case ADD_LEARNED_WORD:
      return {
        ...state,
        learnedWords: [...state.learnedWords, action.payload],
      };
    case ADD_NOT_LEARNED_WORD:
      return {
        ...state,
        notLearnedWords: [...state.notLearnedWords, action.payload],
      };
    case CLEAR_WORDS:
      return {
        ...state,
        notLearnedWords: [],
        learnedWords: [],
      };
    default:
      return state;
  }
};

export { constructorGameReducer };

