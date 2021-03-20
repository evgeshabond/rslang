import React from 'react';
import classes from './SavannaGame.module.css'

export default function AudioGame() {
    return (
        <div className={classes.game__wrapper}>
            <div className={classes.game__content}>
                <div className={classes.game__title}>Саванна</div>
                <div className={classes.game__decription}>Тренировка Саванна развивает словарный запас.
                Выберите правильный перевод слова.
</div>
                <div className={classes.game__btn} />
            </div>


        </div>
    )
}
