import { CurrentWordListType } from './word-actions';

const AUDIO_GAME_STATUS = 'AUDIO_GAME_STATUS';
const WORD_WRONG='WORD_WRONG';
const WORD_RIGHT=' WORD_RIGHT';
const IS_ANSWER_SELECTED='IS_ANSWER_SELECTED'


const wordRight = (value: CurrentWordListType) => ({
  type: WORD_RIGHT,
  payload: value,
});

const audioGameStart = (value: boolean) => ({
  type: AUDIO_GAME_STATUS,
  payload: value
})

const wordWrong=(value: string)=>({
  type: WORD_WRONG,
  payload:value
})

const isAnswerSelected = (value: boolean) => ({
  type: IS_ANSWER_SELECTED,
  payload: value
})


export type AudioGameStartActionType = {
  type: string;
  payload:
  | boolean
  | string
  | CurrentWordListType;
};


export { 
  audioGameStart, AUDIO_GAME_STATUS,
  wordWrong, WORD_WRONG,
  wordRight, WORD_RIGHT,
  isAnswerSelected, IS_ANSWER_SELECTED
 }