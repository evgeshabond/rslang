export type GameStatistic = {
  _id?: string;
  date: Date;
  gameType: string;
  know: number;
  dont_know: number;
  combo: number;
  wordsId: Array<string>;
};

export type TodayGameStatisticType = {
  correctAvg: number;
  gameCount: number;
  gameType: Array<string>;
  maxCombo: number;
  wordsCountArr: Array<string>;
};

export type AllGameStatisticType = {
  savanna?: {
    total: Array<GameStatistic>;
  };
  sprint?: {
    total: Array<GameStatistic>;
  };
  audiocall?: {
    total: Array<GameStatistic>;
  };
  constructors?: {
    total: Array<GameStatistic>;
  };
};
