import { CurrentWordListType } from './word-actions';

const AUDIO_GAME_STATUS = 'AUDIO_GAME_STATUS';
const WORD_USER_ANSWER='WORD_USER_ANSWER';
const WORD_RIGHT=' WORD_RIGHT';
const IS_ANSWER_SELECTED='IS_ANSWER_SELECTED';
const CURRENT_PLAY_WORDS='CURRENT_PLAY_WORDS'


const wordRight = (value: CurrentWordListType) => ({
  type: WORD_RIGHT,
  payload: value,
});

const audioGameStart = (value: boolean) => ({
  type: AUDIO_GAME_STATUS,
  payload: value
})

const wordUserAnswer=(value: string)=>({
  type: WORD_USER_ANSWER,
  payload:value
})

const isAnswerSelected = (value: boolean) => ({
  type: IS_ANSWER_SELECTED,
  payload: value
})

const currentPlayWords = (value: Array<CurrentWordListType>) => ({
  type: CURRENT_PLAY_WORDS,
  payload: value
})



export type AudioGameStartActionType = {
  type: string;
  payload:
  | boolean
  | string
  | CurrentWordListType
  | Array<CurrentWordListType>
};


export { 
  audioGameStart, AUDIO_GAME_STATUS,
  wordUserAnswer, WORD_USER_ANSWER,
  wordRight, WORD_RIGHT,
  isAnswerSelected, IS_ANSWER_SELECTED,
  currentPlayWords, CURRENT_PLAY_WORDS
 }