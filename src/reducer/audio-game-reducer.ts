import {
  AUDIO_GAME_STATUS,
  AudioGameStartActionType,
  WORD_USER_ANSWER,
  WORD_RIGHT,
  IS_ANSWER_SELECTED,
  CURRENT_PLAY_WORDS
} from '../actions/audioGame-actions';

import { CurrentWordListType } from '../actions/word-actions';

export type AudioGameState = {
  audioGameStart: boolean;
  wordUserAnswer:string;
  wordRight: CurrentWordListType;
  isAnswerSelected: boolean;
  currentPlayWords: Array<CurrentWordListType>
};

const initialState: AudioGameState = {
  audioGameStart: false,
  isAnswerSelected: false,
  wordUserAnswer: '',
  currentPlayWords: [],
  wordRight: {
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
  }
};

const audioGameReducer = (state = initialState, action: AudioGameStartActionType) => {
  switch (action.type) {
    case AUDIO_GAME_STATUS:
      return { ...state, audioGameStart: action.payload };
    case WORD_USER_ANSWER:
      return { ...state, wordUserAnswer: action.payload };
    case WORD_RIGHT:
      return { ...state, wordRight: action.payload };
    case IS_ANSWER_SELECTED:
      return { ...state,  isAnswerSelected: action.payload };
    case CURRENT_PLAY_WORDS:
      return { ...state,  currentPlayWords: action.payload };
    default:
      return state;
  }
};


export { audioGameReducer }

