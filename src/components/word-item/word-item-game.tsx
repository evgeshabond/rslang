import React from 'react';
import { CurrentWordListType } from '../../actions/word-actions';

type Props = { word: CurrentWordListType };
const style = {
    width: '200px',
    height: '50px',
    borderRadius: '30px',
    color: '#5b2467',
    backgroundColor: '#FDEBFF'

}

const WordItem: React.FC<Props> = ({ word }) => (
    <div style={style}>
        { word.wordTranslate}
    </div >

)

export { WordItem };
