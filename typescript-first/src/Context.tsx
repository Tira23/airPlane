import {
    createContext,
    Dispatch,
    FC,
    MutableRefObject,
    PropsWithChildren,
    useMemo,
    useRef,
    useState,
} from "react";
import { Enemy, Laser, Pole, ServerLeader, User } from "./interface";

export type ContextPropsInterfaceInit = {
    enemy: Array<Enemy>;
    setEnemy: Dispatch<React.SetStateAction<Enemy[]>>;
    laser: Array<Laser>;
    setLaser: Dispatch<React.SetStateAction<Laser[]>>;
    login: boolean;
    setLogin: Dispatch<React.SetStateAction<boolean>>;
    ttlScore: boolean;
    setTtlScore: Dispatch<React.SetStateAction<boolean>>;
    innerDivWidth: MutableRefObject<HTMLDivElement | null>;
    score: number;
    setScore: Dispatch<React.SetStateAction<number>>;
    time: number;
    setTime: Dispatch<React.SetStateAction<number>>;
    backGroundPole: Array<Pole>;
    setBackGroundPole: Dispatch<React.SetStateAction<Pole[]>>;
    refPole: MutableRefObject<HTMLImageElement | null>;
    leader: Array<ServerLeader>;
    setLeader: Dispatch<React.SetStateAction<ServerLeader[]>>;
    user: User | null;
    setuser: Dispatch<React.SetStateAction<User | null>>;
    newTime: number;
    setNewTime: Dispatch<React.SetStateAction<number>>;
    newScore: number;
    setNewScore: Dispatch<React.SetStateAction<number>>;
    inputUser: MutableRefObject<HTMLInputElement | null>;
    // reloadPage(): void;
};

export const Context = createContext<ContextPropsInterfaceInit>(
    {} as ContextPropsInterfaceInit
);

export const ContextFun: FC<PropsWithChildren> = ({ children }) => {
    const [enemy, setEnemy] = useState<Enemy[]>([]);
    const [laser, setLaser] = useState<Laser[]>([]);
    const [login, setLogin] = useState(false);
    const [ttlScore, setTtlScore] = useState(false);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [backGroundPole, setBackGroundPole] = useState<Pole[]>([]);
    const [leader, setLeader] = useState<ServerLeader[]>([]);
    const [user, setuser] = useState<User | null>(null);
    const [newTime, setNewTime] = useState(0);
    const [newScore, setNewScore] = useState(0);

    const innerDivWidth = useRef<HTMLDivElement | null>(null);
    const refPole = useRef<HTMLImageElement | null>(null);
    const inputUser = useRef<HTMLInputElement | null>(null);

    const value = useMemo(() => {
        return {
            enemy,
            setEnemy,
            laser,
            setLaser,
            login,
            setLogin,
            innerDivWidth,
            score,
            setScore,
            time,
            setTime,
            backGroundPole,
            setBackGroundPole,
            refPole,
            leader,
            setLeader,
            ttlScore,
            setTtlScore,
            user,
            setuser,
            newScore,
            setNewScore,
            newTime,
            setNewTime,
            inputUser,
            // reloadPage,
        };
    }, [
        backGroundPole,
        enemy,
        laser,
        leader,
        login,
        newScore,
        newTime,
        // reloadPage,
        score,
        time,
        ttlScore,
        user,
    ]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
