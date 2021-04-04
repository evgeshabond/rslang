export type GameStatistic = {
  _id?: string;
  date: Date;
  level: string;
  know: number;
  dont_know: number;
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
