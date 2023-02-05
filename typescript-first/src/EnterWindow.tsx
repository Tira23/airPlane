import React, { useCallback, useEffect } from "react";
import { useContext } from "react";
import { Context } from "./Context";
import { ServerLeader } from "./interface";

export const EnterWindow = () => {
    const {
        login,
        setLogin,
        setScore,
        setTime,
        setEnemy,
        setLaser,
        ttlScore,
        newScore,
        setNewScore,
        newTime,
        setNewTime,
        setLeader,
        leader,
        inputUser,
    } = useContext(Context);
    // добавление нового игрока
    const creatUser = useCallback(() => {
        // debugger;
        if (inputUser.current?.value) {
            const newLeader: ServerLeader = {
                id: Date.now(),
                nameLeader: inputUser.current?.value,
                score: 0,
                fromServer: false,
            };
            setLeader([...leader, newLeader]);
        } else {
            const newLeader: ServerLeader = {
                id: Date.now(),
                nameLeader: inputUser.current?.value || "Аноним",
                score: 0,
                fromServer: false,
            };
            setLeader([...leader, newLeader]);
        }
    }, [inputUser, leader, setLeader]);

    // ==========================================
    // считает очки после проигрыша
    useEffect(() => {
        const interval = setInterval(() => {
            if (newTime > 0) {
                setNewTime((prev) => prev - 1);
                setNewScore((prev) => prev + 1);
            }
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, [newScore, newTime, setNewScore, setNewTime]);
    // ==========================================
    const loadToServer = useCallback(() => {
        fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(
                leader.map((i) => {
                    delete i.fromServer;
                    return i;
                })
            ),
        });
    }, [leader]);

    const reloadPage = useCallback(() => {
        window.location.reload();
    }, []);

    const anonimus = leader.find((i) => i.nameLeader === "Аноним");

    return (
        <div className="smokeScreen">
            {ttlScore && (
                <div className="login">
                    <div>Время полета {newTime}</div>
                    <div>Ты заработал {newScore} очков</div>
                    {anonimus?.nameLeader === "Аноним" ? (
                        <button disabled>Внести себя в таблицу лидеров</button>
                    ) : newTime > 0 ? (
                        <button disabled>Внести себя в таблицу лидеров</button>
                    ) : (
                        <button onClick={loadToServer}>
                            Внести себя в таблицу лидеров
                        </button>
                    )}
                    <button onClick={reloadPage}>Начать заново</button>
                </div>
            )}
            {!ttlScore && (
                <div className="login">
                    <div>Летчик, как тебя зовут?</div>
                    <input ref={inputUser} placeholder="Аноним" />
                    <button
                        onClick={() => {
                            setScore(0);
                            setTime(0);
                            setEnemy([]);
                            setLaser([]);
                            setLogin(!login);
                            creatUser();
                        }}
                    >
                        Полетели
                    </button>
                </div>
            )}
        </div>
    );
};
