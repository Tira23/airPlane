import React, { useEffect, useContext } from "react";
import { Context } from "./Context";
import { Leaderboard } from "./Leaderboard";

export const LeftSide = () => {
    const { score, time, setTime, login, leader, newScore } =
        useContext(Context);
    // счетчик времени полета
    useEffect(() => {
        const interval = setInterval(() => {
            if (login) {
                setTime((prev) => prev + 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [login, setTime]);
    // ============================================
    useEffect(() => {}, [score, newScore]);

    return (
        <div className="leftSide">
            <div className="score">
                <div>Заработано очков: </div>
                <div>{score}</div>
            </div>
            <div className="time">
                <div>Время полета: </div>
                <div>{time}</div>
            </div>
            <div className="leaderBoard">
                <div>Таблица лидеров: </div>
                <div className="scoreFlex">
                    {leader ? (
                        leader
                            .sort((a, b) => b.score - a.score)
                            .map((item) => (
                                <Leaderboard key={item.id} item={item} />
                            ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
};
