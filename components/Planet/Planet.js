"use client";

import styles from "./Planet.module.css";
import {
    motion,
    useMotionValue,
    useAnimationFrame,
    useTransform,
    useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Planet({
    event,
    activeIndex,
    index,
    baseAngle,
    handleEventClick,
    totatPlanets,
}) {
    const initialAngleRef = useRef(baseAngle);
    const lastTimeRef = useRef(0);
    const currentAngleRef = useRef(baseAngle);

    const [targetAngleForSelected, setTargetAngleForSelected] = useState(null);

    const angle = useSpring(baseAngle, {
        stiffness: 70,
        damping: 35,
        bounce: 0,
        mass: 1.0,
        restDelta: 0.001,
    });

    useEffect(() => {
        initialAngleRef.current = baseAngle;
        currentAngleRef.current = baseAngle;
        angle.set(baseAngle);
        setTargetAngleForSelected(null);
    }, [baseAngle]);

    useEffect(() => {
        if (activeIndex >= 0) {
            const selectedTargetAngle = findNearestTargetAngle(
                currentAngleRef.current,
                270 + (index - activeIndex) * (360 / totatPlanets)
            );

            setTargetAngleForSelected(selectedTargetAngle);
        } else {
            setTargetAngleForSelected(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, index, totatPlanets]);

    useAnimationFrame((time) => {
        const deltaTime = lastTimeRef.current
            ? (time - lastTimeRef.current) / 1000
            : 0;
        lastTimeRef.current = time;

        if (activeIndex >= 0 && targetAngleForSelected !== null) {
            angle.set(targetAngleForSelected);
            currentAngleRef.current = targetAngleForSelected;
        } else if (activeIndex < 0) {
            const rotationSpeed = 360 / 125;
            const newAngle =
                currentAngleRef.current + rotationSpeed * deltaTime;

            angle.set(newAngle);
            currentAngleRef.current = newAngle;
        }
    });

    function findNearestTargetAngle(currentAngle, targetValue) {
        const normalizedCurrent = currentAngle % 360;
        const diff = targetValue - normalizedCurrent;

        const targetAngle =
            diff > 0 ? currentAngle + diff : currentAngle + diff + 360;
        return targetAngle;
    }

    const x = useTransform(
        angle,
        (a) => Math.cos((a * Math.PI) / 180) * 250 + 250
    );
    const y = useTransform(
        angle,
        (a) => Math.sin((a * Math.PI) / 180) * 250 + 250
    );

    return (
        <motion.button
            className={`${styles.planetContainer} ${
                activeIndex === index ? styles.selected : ""
            }`}            style={{
                x,
                y,
                willChange: "transform"
            }}
            animate={{
                scale: activeIndex === index ? 1.2 : 1,
                backgroundColor:
                    activeIndex === index ? "var(--text-sec)" : "black",
                textShadow: activeIndex === index ? "0px 0px 2px black" : "",
            }}
            transition={{
                scale: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                },
            }}
            whileHover={{
                scale: 1.2,
                transition: {
                    duration: 0.2,
                    type: "spring",
                    bounce: 0.3,
                },
            }}
            onClick={() => handleEventClick(index)}
        >
            <div className={styles.buttonContainer}>{event.icon}
                <div className={`${styles.details} ${activeIndex === index ? styles.activeDetails: ""}`}>
                    <h4>{event.name}</h4>
                    <p><span>📅</span><span>{event.time}</span></p>
                    <p><span>📍</span><span>{event.venue}</span></p>
                </div>
                <div className={`${styles.connector} ${activeIndex === index ? styles.activeConnector: ""}`}></div>
            </div>
        </motion.button>
    );
}
