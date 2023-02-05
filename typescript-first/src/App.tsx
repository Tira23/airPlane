import { useCallback, useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./Context";
import { BattleField } from "./BattleField";
import { LeftSide } from "./LeftSide";
import { EnterWindow } from "./EnterWindow";
const offLineLeadred = require("./backend_Json/leaderBoard.json");

function App() {
    const { login, enemy, setEnemy, innerDivWidth, setLeader } =
        useContext(Context);

    // создание врагов и позиция врага
    const getLeftPosition = useCallback((): number => {
        if (innerDivWidth.current) {
            const enemyPosWight = Math.floor(
                Math.random() * innerDivWidth.current.offsetWidth - 50
            );

            if (
                enemyPosWight < innerDivWidth.current.offsetLeft ||
                enemyPosWight > innerDivWidth.current.offsetWidth
            ) {
                return getLeftPosition();
            }
            return enemyPosWight;
        }
        return 0;
    }, [innerDivWidth]);

    // создаю врагов
    useEffect(() => {
        const interval = setInterval(() => {
            if (enemy.length < 50 && login) {
                const leftPosition = getLeftPosition();
                const newEnemy = {
                    enemyId: Date.now(),
                    position: {
                        top: 0,
                        left: leftPosition,
                    },
                };

                setEnemy((prev) => {
                    return [...prev, newEnemy];
                });
            }
        }, 450);
        return () => clearInterval(interval);
    }, [enemy.length, getLeftPosition, login, setEnemy]);

    //===================================================
    // получаю данные о лидерах с сервера
    useEffect(() => {
        setLeader(offLineLeadred);
    }, [setLeader]);

    //===================================================

    return (
        <div className="container">
            {!login && <EnterWindow />}
            <LeftSide /> <BattleField />
        </div>
    );
}

export default App;
