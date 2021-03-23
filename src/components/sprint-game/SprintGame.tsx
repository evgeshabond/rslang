import React, {useState, useEffect} from 'react';
import styles from './sprint-game.module.css';
import FirstTable from './FIrstTable';

const SprintGame: React.FC = () => {

    const [timer, setTimer] = useState(5);


    useEffect(() =>{
      timer > 0 && setTimeout(() => setTimer( timer -1), 1000);
    }, [timer]);
 
const startGame = () => {
    return( <div className={styles.timer}>
        

    </div>)
}

 return(
  <div className={styles.sprint__game}>
    <FirstTable />
  </div>
 )
};

export default SprintGame;
