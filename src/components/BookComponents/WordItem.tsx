import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

//  material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

//  helpers
import getColor from '../../utils/getColor';
import { CurrentWordListType } from '../../actions/word-actions';
import { serverUrl } from '../../utils/constants';
import UserWordsService from '../../services/user-words-service';
import { RootStateType } from '../../reducer/root-reducer';

//  icons
import hardIcon from '../../assets/images/hardWord.svg';
import playIcon from '../../assets/images/play-big.svg';
import deleteIcon from '../../assets/images/delete.svg';
import returnIcon from '../../assets/images/return.svg';

type Params = {
  group: number;
  word: CurrentWordListType;
};

const useStyles = makeStyles({
  wordContainer: {
    display: 'flex',
    minHeight: '10rem',
    width: '95%',
    padding: 0,
    margin: 0,
    marginLeft: '1rem',
    marginBottom: '1rem',
    backgroundColor: (params: any) => getColor(params.group),
  },
  statusIconContainer: {
    width: '1.5rem',
    height: '1.5rem',
    flexShrink: 0,
    marginTop: '1.5rem',
    marginLeft: '1rem',
  },
  icon: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${hardIcon})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    filter: 'contrast(20%)',
  },
  imageContainer: {
    width: '5rem',
    height: '5rem',
    flexShrink: 0,
    marginTop: '1rem',
    marginLeft: '1rem',
    backgroundImage: (params: Params) =>
      `url(${serverUrl}${params.word.image})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  playButton: {
    flexBasis: '2.5rem',
    height: '2.5rem',
    flexShrink: 0,
    marginTop: '1.6rem',
    marginLeft: '1rem',
    cursor: 'pointer',
    backgroundImage: `url(${playIcon})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  textContainerWrapper: {
    display: 'flex',
    flexBasis: '60rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  textContainer: {
    display: 'flex',
    flexBasis: '24rem',
    flexShrink: 15,
    flexDirection: 'column',
    marginTop: '1.5rem',
    marginLeft: '1rem',
    alignItems: 'flex-start',
  },
  infoContainer: {
    display: 'flex',
    flexBasis: '40rem',
    flexShrink: 10,
    flexWrap: 'wrap',
    marginTop: '1.5rem',
    marginLeft: '1.5rem',
    alignItems: 'flex-start',
  },
  buttonsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    flexBasis: '20rem',
  },
  statsBox: {
    display: 'flex',
    marginTop: '1.5rem',
    flexBasis: '20rem',
  },
  button: {
    flexBasis: '2.5rem',
    height: '2.5rem',
    flexShrink: 0,
    marginLeft: '1rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  buttonHard: {
    backgroundImage: `url(${hardIcon})`,
  },
  buttonDelete: {
    backgroundImage: `url(${deleteIcon})`,
  },
  buttonReturn: {
    backgroundImage: `url(${returnIcon})`,
  },
  helperMarginLeft: {
    marginLeft: '1rem',
  },
});

type UserType = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

type WordType = {
  id?: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: {
    difficulty: string;
    optional?: {
      learning?: boolean | undefined;
    };
  };
};

type Props = {
  word: any;
  group: number;
  forseFetch: any;
  settings: {
    showTranslate: boolean,
    showButtons: boolean
  }
};

const WordItem: React.FC<Props> = ({ word, group, forseFetch, settings }) => {
  const service = new UserWordsService();
  const user = useSelector((state: RootStateType) => state.userState.user);
  const classes = useStyles({ group, word });

  const addItemToHard = async () => {
    const params = {
      /* eslint-disable */
      userId: user.userId,
      wordId: word._id,
      token: user.token,
      body: {
        difficulty: 'hard',
        optional: {
          learning: true,
        },
      },
      /* eslint-enable */
    };
    try {
      const response = await service.updateWord(params,{
        difficulty: 'hard',
        optional: {
          learning: true
        }      
      })
      console.log(response)
    }
    catch(e) {
      console.log(e)
    }    
    forseFetch();
  };

  const deleteItem = async () => {
    const params = {
      /* eslint-disable */
      userId: user.userId,
      wordId: word._id,
      token: user.token,
      body: {
        difficulty: 'deleted',
        optional: {
          learning: false,
        },
      },
      /* eslint-enable */
    };
    try {
      const response = await service.updateWord(params,{
        difficulty: 'deleted',
        optional: {
          learning: false
        }      
      })
      console.log(response)
    }
    catch(e) {
      console.log(e)
    }    
    forseFetch();
  };

  const returnItem = async () => {
    const params = {
      /* eslint-disable */
      userId: user.userId,
      wordId: word._id,
      token: user.token,
      body: {
        difficulty: 'easy',
        optional: {
          learning: true,
        },
      },
      /* eslint-enable */
    };
    try {
      const response = await service.updateWord(params,{
        difficulty: 'easy',
        optional: {
          learning: true
        }      
      })
      console.log(response)
    }
    catch(e) {
      console.log(e)
    }    
    forseFetch();
  };

  return (
    <div key={word.id} className={classes.wordContainer}>
      <div className={classes.statusIconContainer}>
        {word?.userWord?.difficulty === 'hard' && (
          <div className={classes.icon} />
        )}
      </div>
      <div className={classes.imageContainer} />
      <div className={classes.playButton} aria-hidden={true} />
      <div className={classes.textContainerWrapper}>
        <div className={classes.textContainer}>
          <div>
            <Typography variant="h4" component="span">
              {word.word}
            </Typography>
            <Typography
              variant="h4"
              component="span"
              className={classes.helperMarginLeft}
            >
              {word.transcription}
            </Typography>
          </div>
          <div>
            <Typography align="left" variant="body1" component="p">
              {word.textMeaning}
            </Typography>
            <Typography align="left" variant="body1" component="p">
              {word.textExample}
            </Typography>
          </div>
        </div>
        <div className={classes.textContainer}>
          {settings.showTranslate && (<>
          <div>
            <Typography align="left" variant="h4" component="span">
              {word.wordTranslate}
            </Typography>
          </div>
          <div>
            <Typography align="left" variant="body1" component="p">
              {word.textMeaningTranslate}
            </Typography>
            <Typography align="left" variant="body1" component="p">
              {word.textExampleTranslate}
            </Typography>
          </div>
          </>)}
        </div>
      </div>

      <div className={classes.infoContainer}>
        {settings.showButtons && (<div className={classes.buttonsBox}>
          <div
            className={clsx(classes.button, classes.buttonHard)}
            onClick={() => addItemToHard()}
            aria-hidden={true}
          />
          <div
            className={clsx(classes.button, classes.buttonDelete)}
            onClick={() => deleteItem()}
            aria-hidden={true}
          />
          <div
            className={clsx(classes.button, classes.buttonReturn)}
            onClick={() => returnItem()}
            aria-hidden={true}
          />
          {/* className={clsx({[classes.difficultyButton]: true, [classes.activeButton]: difficulty === 'all'})} */}
        </div>)}
        <div className={classes.statsBox}>StatsBox</div>
      </div>

      {/* {item?.word}
    <span>  </span>
    {item?.userWord?.difficulty} */}
    </div>
  );
};

export default WordItem;
