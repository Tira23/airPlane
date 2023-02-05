export interface Laser {
    laserId: number;
    position: Position;
}
export interface Position {
    top: number;
    left: number;
}

export interface Enemy {
    enemyId: number;
    position: Position;
}
export interface User {
    name: string;
    score: number;
}
export interface Pole {
    poleId: number;
    position: Position;
}
export interface ServerLeader {
    id: number;
    nameLeader: string;
    score: number;
    fromServer?: boolean;
}
