import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "./Context";
import { EnemyImg } from "./enemyImg";
import { Enemy, Laser, Position } from "./interface";
import { LaserImg } from "./LaserImg";
// import { BackGroundPole } from "./backGroundPole";

let positionPlane: Position = { top: 0, left: 0 };

export const BattleField = () => {
    const {
        enemy,
        setEnemy,
        laser,
        setLaser,
        login,
        innerDivWidth,
        setScore,
        setLogin,
        setTtlScore,
        ttlScore,
        score,
        time,
        setNewScore,
        setNewTime,
    } = useContext(Context);
    // новая позиция врага
    const newEnemyPos = useCallback(
        (enemy: Enemy) => {
            setEnemy((prev) => {
                return [
                    ...prev.filter((item) => item.enemyId !== enemy.enemyId),
                    enemy,
                ];
            });
        },
        [setEnemy]
    );
    //=======================================================

    // перемещение лазера
    const newLaserPos = useCallback(
        (laser: Laser) => {
            setLaser((prev) => {
                return [
                    ...prev.filter((item) => item.laserId !== laser.laserId),
                    laser,
                ];
            });
        },
        [setLaser]
    );
    //=======================================================
    // удаление врагов за пределами экрана
    const clearImgEnemy = useCallback(
        (enemy: Enemy) => {
            setEnemy((prev) => [
                ...prev.filter((item) => item.enemyId !== enemy.enemyId),
            ]);
        },
        [setEnemy]
    );
    //===================================================

    // удаление лазера за пределами экрана
    const clearImgLaser = useCallback(
        (laser: Laser) => {
            setLaser((prev) => [
                ...prev.filter((item) => item.laserId !== laser.laserId),
            ]);
        },
        [setLaser]
    );
    //===================================================

    // позиция самолетика
    const handelMouseMove = useCallback(
        (event: MouseEvent): void => {
            let posX = event.clientX;
            let posY = event.clientY;
            let leftPosX = innerDivWidth.current
                ? posX < innerDivWidth.current.offsetLeft + 50
                    ? innerDivWidth.current.offsetLeft
                    : posX - 50
                : posX - 50;

            positionPlane = {
                top: posY - 50,
                left: leftPosX,
            };
        },
        [innerDivWidth]
    );
    // обработчик клика
    const handelMouseClick = useCallback(
        (event: MouseEvent) => {
            if (!event.button && login) {
                let laserId = Date.now();
                setLaser((prev) => {
                    const newLaser = {
                        laserId,
                        position: {
                            top: positionPlane.top - 50,
                            left: positionPlane.left + 23,
                        },
                    };

                    return [...prev, newLaser];
                });
            }
        },
        [login, setLaser]
    );

    // попадание лазера
    const laserEnemy = useCallback(
        (laser: Laser) => {
            enemy.forEach((item) => {
                if (
                    item.position.top + 50 >= laser.position.top &&
                    item.position.top <= laser.position.top &&
                    item.position.left - 25 <= laser.position.left &&
                    item.position.left + 25 >= laser.position.left
                ) {
                    clearImgEnemy(item);
                    clearImgLaser(laser);
                    setScore((prev) => prev + 2);
                }
            });
        },
        [clearImgEnemy, clearImgLaser, enemy, setScore]
    );

    //===================================================

    // столкновение с самолетиком
    const crashPlane = useCallback(() => {
        enemy.forEach((item) => {
            if (
                item.position.top + 50 >= positionPlane.top &&
                item.position.top <= positionPlane.top &&
                item.position.left <= positionPlane.left + 100 &&
                item.position.left + 75 >= positionPlane.left
            ) {
                setEnemy([]);
                setLaser([]);
                setNewScore(score);
                setNewTime(time);
                setTtlScore(!ttlScore);
                setLogin(!login);
            }
        });
    }, [
        enemy,
        login,
        score,
        setEnemy,
        setLaser,
        setLogin,
        setNewScore,
        setNewTime,
        setTtlScore,
        time,
        ttlScore,
    ]);

    // вешаю событие на документ
    useEffect(() => {
        document.addEventListener("mousemove", handelMouseMove);
        document.addEventListener("mousedown", handelMouseClick);
        crashPlane();
        return () => {
            document.removeEventListener("mousemove", handelMouseMove);
            document.removeEventListener("mousedown", handelMouseClick);
        };
    }, [crashPlane, handelMouseClick, handelMouseMove]);
    //===================================================

    return (
        <div className="battlefield" ref={innerDivWidth}>
            {enemy &&
                enemy.map((item) => (
                    <EnemyImg
                        key={item.enemyId}
                        props={item}
                        newEnemyPos={newEnemyPos}
                        clearImgEnemy={clearImgEnemy}
                    />
                ))}
            {laser &&
                laser.map((item) => (
                    <LaserImg
                        key={item.laserId}
                        item={item}
                        newLaserPos={newLaserPos}
                        clearImgLaser={clearImgLaser}
                        laserEnemy={laserEnemy}
                    />
                ))}
            {login && (
                <div style={positionPlane} className="plane">
                    <img src="../image/plane.png" alt="plane" />
                </div>
            )}
        </div>
    );
};
