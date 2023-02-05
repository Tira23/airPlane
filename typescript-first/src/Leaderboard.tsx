import React, { useContext } from "react";
import { ServerLeader } from "./interface";
import { Context } from "./Context";
// import { useEffect } from "react";

interface IPropsLeaderboard {
    item: ServerLeader;
}
export const Leaderboard = ({ item }: IPropsLeaderboard) => {
    const { newScore, score, leader } = useContext(Context);
    const player = leader.find((i) => i.fromServer === false);
    if (player) {
        player.score = score > newScore ? score : newScore;
    }

    return (
        <div>
            <p>{item.nameLeader}</p>
            <p> -</p>
            <p>{item.score}</p>
        </div>
    );
};
