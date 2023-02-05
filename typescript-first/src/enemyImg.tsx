import React, { useEffect } from "react";
import { Enemy } from "./interface";
interface IEnemyProps {
    props: Enemy;
    newEnemyPos: (enemy: Enemy) => void;
    clearImgEnemy: (enemy: Enemy) => void;
}

export const EnemyImg = ({
    props,
    newEnemyPos,
    clearImgEnemy,
}: IEnemyProps) => {
    const { enemyId, position } = props;
    // изменяю позицию врага
    useEffect(() => {
        const interval = setInterval(() => {
            const { top, left } = position;
            const enemyPos = { enemyId, position: { top: top + 1, left } };
            newEnemyPos(enemyPos);
        }, 3);
        return () => {
            clearInterval(interval);
        };
    }, [enemyId, newEnemyPos, position]);
    // ==============================================
    // Удаляю врага за пределами экрана
    useEffect(() => {
        if (position.top > window.innerHeight) {
            clearImgEnemy(props);
        }
    }, [clearImgEnemy, position.top, props]);

    // ==============================================
    return (
        <div
            // onMouseEnter={() => clearImgEnemy(enemy.enemyId)}
            className="enemyDiv"
            style={position}
        >
            <img className="enemy" src="../image/enemy.png" alt="laser" />
        </div>
    );
};
