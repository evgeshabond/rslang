export const mainPath = {
  main: '/',
  gamePage: '/gamepage',
  wordList: '/wordlist',
  auth: '/user',
  ebookPage: '/ebookpage',
  learnPage: '/ebookpage/learn',
  dictionaryPage: '/ebookpage/dictionary',
  profilePAge: '/profile',
  constructorGame: '/constructorgame',
  langUrl: 'https://rslang-app.herokuapp.com/',
  questionPage: '/quiz',
  userStatistic: '/statistic',
};

export const authErrorPath = {
  name: 'name',
  email: 'email',
  password: 'password',
};

export const gameType = {
  savanna: 'savanna',
  audiocall: 'audiocall',
  sprint: 'sprint',
  constructors: 'constructors',
};

export const difficulty = {
  hard: 'hard',
  easy: 'easy',
  deleted: 'deleted',
};

export const gameConstants = {
  amountOfRounds: 10,
};

export const serverUrl = 'https://rslang-app.herokuapp.com/';
export const serverUrlLocal = 'http://localhost:3001/';

// prettier-ignore
export enum GameStart {
  Menu = 'MENU',
  Dictionary = 'DICTIONARY',
  Book = 'BOOK',
  Deleted= 'DELETED'
}
