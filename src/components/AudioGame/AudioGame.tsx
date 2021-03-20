import React from 'react';
import classes from './AudioGame.module.css'

export default function AudioGame() {
    return (
        <div className={classes.game__wrapper}>
            <div className={classes.game__content}>
                <div className={classes.game__title}>Аудиовызов</div>
                <div className={classes.game__decription}>Тренировка улучшает восприятие английской речи на слух.
                Выберите из предложенных вариантов ответа правильный перевод слова,
которое услышите</div>
                <div className={classes.game__btn} />
            </div>


        </div>
    )
}
