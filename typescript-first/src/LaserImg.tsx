import { Laser } from "./interface";
import { useEffect } from "react";

interface IPropsLaserImg {
    item: Laser;
    newLaserPos: (laser: Laser) => void;
    clearImgLaser: (laser: Laser) => void;
    laserEnemy: (laser: Laser) => void;
}
export const LaserImg = ({
    item,
    newLaserPos,
    clearImgLaser,
    laserEnemy,
}: IPropsLaserImg) => {
    const { laserId, position } = item;

    // Движение лазера

    useEffect(() => {
        const interval = setInterval(() => {
            const { top, left } = position;
            const laserPos = { laserId, position: { top: top - 1, left } };
            newLaserPos(laserPos);
        }, 1);

        // ===============================================

        return () => {
            clearInterval(interval);
        };
    }, [laserId, newLaserPos, position]);

    // Удаление лазера за пределами экрана

    useEffect(() => {
        // laserEnemy(item);
        if (position.top < 0) {
            clearImgLaser(item);
        }
        return laserEnemy(item);
    }, [clearImgLaser, item, laserEnemy, position.top]);

    // ===============================================
    return (
        <>
            <img
                style={item.position}
                className="laser"
                src="../image/laser.png"
                alt="laser"
            />
        </>
    );
};
