import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
//  redux
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

//  material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
//  components
import WordItem from '../../components/BookComponents/WordItem';

//  types
import { RootStateType } from '../../reducer/root-reducer';
import { WordStateType } from '../../reducer/word-reducer';
//  herlpers and services
import AggregateService from '../../services/word-aggregate-service';
import UserWordsService from '../../services/user-words-service';
import LangService from '../../services/lang-service'

//  icons
import learningIcon from '../../assets/images/learning.svg';
import hardIcon from '../../assets/images/hardWord.svg';
import deletedIcon from '../../assets/images/delete.svg';
import gamesIcon from '../../assets/images/games.svg';
import settingsIcon from '../../assets/images/settings.svg';

// update theme object of material ui
const primaryColor = '#FDEBFF';
const secondaryColor = '#5B2467';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '80vh',
    width: '95vw',
    minHeight: '550px',
    maxWidth: 1250,
    margin: '1rem auto',
    paddingTop: '1rem',
    borderRadius: '3rem',
    color: secondaryColor,
    backgroundColor: primaryColor,
  },
  difficultyContainer: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    left: 0,
  },
  difficultyButton: {
    display: 'block',
    cursor: 'pointer',
    marginLeft: '2rem',
    border: '2px solid transparent',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginTop: '0.5rem',
  },
  activeButton: {
    border: '2px solid blue',
  },
  difficultyIcon: {
    display: 'inline-block',
    width: '3rem',
    height: '3rem',
    marginTop: '0.5rem',
  },
  difficultyText: {
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '1.6rem',
    width: '10rem',
    marginLeft: '1rem',
  },
  buttonsContainer: {
    position: 'absolute',
    top: '25px',
    right: '8rem',
    display: 'flex',
  },
  button: {
    flexBasis: '3rem',
    height: '3rem',
    flexShrink: 0,
    marginLeft: '1rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  buttonGames: {
    backgroundImage: `url(${gamesIcon})`,
  },
  buttonSettings: {
    backgroundImage: `url(${settingsIcon})`,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    minWidth: '350px',
  },
  container: {
    display: 'flex',
    marginTop: '2rem',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
  },
  levels: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    marginLeft: '15px',
    alignSelf: 'center',
  },
  level: {
    display: 'flex',
    padding: '2rem 2rem',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid transparent',
    outline: 'none',
  },
  levelName: {
    fontSize: '2rem',
    color: secondaryColor,
  },
  levelName__a1: {
    backgroundColor: '#61E9FC',
    borderRadius: '10px 10px 0px 0px',
  },
  levelName__a2: {
    backgroundColor: '#FC5FE3',
  },
  levelName__a2plus: {
    backgroundColor: '#FC5F5F',
  },
  levelName__b1: {
    backgroundColor: '#FCB45F',
  },
  levelName__b2: {
    backgroundColor: '#F9FC5F',
  },
  levelName__b2plus: {
    backgroundColor: '#62FC5F',
    borderRadius: '0px 0px 10px 10px',
  },
  activeLevelName: {
    border: '2px solid blue',
  },
  wordList: {
    display: 'flex',
    flexDirection: 'column',
    // alignSelf: 'flex-start',
    marginTop: '1rem',
    width: '90%',
    maxWidth: '1150px',
    maxHeight: '60vh',
    margin: '1rem',
    overflowY: 'scroll',
    willChange: 'transform',
  },
  pagination: {
    height: '70px',
    width: '600px',
    margin: '1rem auto',
    marginBottom: '3rem',
    fontSize: '2rem',
    listStyle: 'none',

    '& li': {
      display: 'inline-block',
      marginLeft: '0.5rem',
    },

    '& a': {
      width: '3rem',
      height: '3rem',
      cursor: 'pointer',
      paddingLeft: '0.9rem',
      paddingRight: '1rem',
    },
  },
  activePage: {
    color: 'white',
    backgroundColor: secondaryColor,
    borderRadius: '2rem',
  },
  disabled: {
    color: 'grey',

    '& a': {
      display: 'none',
    },
  },
  activeLink: {
    outline: 'none',
  },
  hidden: {
    display: 'none',
  },
  helperFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});

const LearnPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.userState.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWordListLoaded, setIsWordListLoaded] = useState(false);
  const [settings, setSettings] = useState({
    showTranslate: true,
    showButtons: true,
  });
  const [pageIsDeleted, setPageIsDeleted] = useState(false)
  const [allUserWords, setAllUserWords] = useState([])
  const [modalOpened, setModalOpened] = useState(false);
  const [difficulty, setDifficulty] = useState('hard');
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(30);
  const [currentWordsPerPage, setCurrentWordsPerPage] = useState(20);
  const [wordsToRender, setWordsToRender] = useState([]);
  const [reRender, setRerender] = useState(true);

  const langService = new LangService();
  const userWordsService = new UserWordsService();
  const classes = useStyles({ group: currentGroup });

  const forseRender = () => {
    console.log('rerender ran');
    setRerender(!reRender);
  };

  const handleGamesButtonClick = () => {
    console.log('clicked games button');
  };

  const handleSettingsButtonClick = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handlePageChange = (data: any) => {
    console.log('page variable is', data.selected);
    setCurrentPage(data.selected);
  };

  //  fetch all userwords from backend
  const getAllUserWords = async () => {
    try {
      const words = await userWordsService.getWordsList({
        userId: user.userId,
        token: user.token,
      });
      console.log(words)
      return words;
    } catch (e) {
      console.log(e);
    }
    return []
  };

  type GetWordsPageProps = {
    page: number,
    group: number
  }
  //  get words Page
  const getWordsPage = async ({
    page,
    group
  }: GetWordsPageProps) => {
    try {
      const wordsPage = await langService.getWordList({page, group})
      console.log(wordsPage)
      return wordsPage
    }
    catch(e) {
      console.log(e)
    }
    return []
  }

  //  get words from API depending on difficulty, group, page
  useEffect(() => {
    getWordsPage({page: currentPage, group: currentGroup})
      .then((wordsPage: any) => {
        console.log('inside use effect. words page is')
        console.log(wordsPage)
        {
          getAllUserWords()
          .then((userWords: any) => {
            console.log('inside use effect. words are')
            console.log(userWords)
            const updatedWordsList = wordsPage.map((word: any) => {              
              const wordInfo = userWords.find((userWord: any) => word.id === userWord.wordId) 
              // if (wordInfo.difficulty === 'deleted') return {...word}        
              return {...word, userWord: {...wordInfo}}
            })
            if (updatedWordsList.every((updatedWord: any) => updatedWord.userWord.difficulty === 'deleted')) {
              setPageIsDeleted(true)
              return
            }
            setWordsToRender(updatedWordsList.filter( (updatedWord: any) => updatedWord.userWord.difficulty !== 'deleted') )
            setIsLoaded(true)
            setIsWordListLoaded(true)
            setPageIsDeleted(false)
          })
          .catch((e) => console.log(e))
        }
      })
  }, [difficulty, currentGroup, currentPage, reRender]);

  const handleGroupChange = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as Element;
    console.log(target.textContent);
    switch (target.textContent) {
      case 'A1':
        setCurrentGroup(0);
        break;
      case 'A2':
        setCurrentGroup(1);
        break;
      case 'A2+':
        setCurrentGroup(2);
        break;
      case 'B1':
        setCurrentGroup(3);
        break;
      case 'B2':
        setCurrentGroup(4);
        break;
      case 'B2+':
        setCurrentGroup(5);
    }
  };

  if (!isLoaded) return <CircularProgress />;
  return (
    <Paper className={classes.root}>
      <span className={classes.hidden}>{currentPage}</span>
      <Typography variant="h4" component="h3">
        Электронный учебник
      </Typography>
      <Box className={classes.buttonsContainer}>
        <div
          className={clsx(classes.button, classes.buttonGames)}
          onClick={() => handleGamesButtonClick()}
          aria-hidden={true}
        />
        <div
          className={clsx(classes.button, classes.buttonSettings)}
          onClick={() => handleSettingsButtonClick()}
          aria-hidden={true}
        />
      </Box>
      <Modal
        open={modalOpened}
        onClose={handleModalClose}
        aria-labelledby="settings-modal"
        aria-describedby="settings-modal"
      >
        <Paper className={classes.modal}>
          <div className={classes.helperFlex}>
            <Typography align="left" variant="h4" component="span">
              Показывать перевод
            </Typography>
            <div>
              <Switch
                checked={settings.showTranslate}
                color="secondary"
                onChange={() => {
                  setSettings({
                    ...settings,
                    showTranslate: !settings.showTranslate,
                  });
                }}
              />
            </div>
          </div>
          <div className={classes.helperFlex}>
            <Typography align="left" variant="h4" component="span">
              Показывать кнопки
            </Typography>
            <div>
              <Switch
                checked={settings.showButtons}
                color="secondary"
                onChange={() => {
                  setSettings({
                    ...settings,
                    showButtons: !settings.showButtons,
                  });
                }}
              />
            </div>
          </div>
        </Paper>
      </Modal>
      <div className={classes.container}>
        <Box className={classes.levels} role="menu">
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__a1]: true,
              [classes.activeLevelName]: currentGroup === 0,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>A1</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__a2]: true,
              [classes.activeLevelName]: currentGroup === 1,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>A2</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__a2plus]: true,
              [classes.activeLevelName]: currentGroup === 2,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>A2+</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__b1]: true,
              [classes.activeLevelName]: currentGroup === 3,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>B1</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__b2]: true,
              [classes.activeLevelName]: currentGroup === 4,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>B2</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__b2plus]: true,
              [classes.activeLevelName]: currentGroup === 5,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>B2+</span>
          </div>
        </Box>
        {pageIsDeleted && (<Box>
          <Typography variant="h4" component="p" align='center'>
          Данная страница удалена, так как все слова добавлены в удаленные.
          </Typography>
          </Box>)}
        {!pageIsDeleted && (<div className={classes.wordList}>
          {isWordListLoaded &&
            wordsToRender.length > 0 &&
            wordsToRender.map((item: any, index) => (
              <WordItem
                word={item}
                group={currentGroup}
                key={item.word}
                forseFetch={() => forseRender()}
                settings={settings}
              />
            ))}
        </div>)}
      </div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName="breakMe"
        pageCount={pagesCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={classes.pagination}
        activeClassName={classes.activePage}
        initialPage={currentPage}
        disabledClassName={classes.disabled}
        activeLinkClassName={classes.activeLink}
      >
        <span className={classes.hidden}>{currentPage}</span>
      </ReactPaginate>
    </Paper>
  );
};

export default LearnPage;
