"use client";

import styles from "./TeamCard.module.css";
import { motion, useSpring, useTransform } from "framer-motion";

export default function TeamCard({ member, index }) {
    const xRot = useSpring(0, { bounce: 0 });
    const yRot = useSpring(0, { bounce: 0 });
    const rotateY = useTransform(xRot, [-0.5, 0.5], ["-15deg", "15deg"]);
    const rotateX = useTransform(yRot, [-0.5, 0.5], ["-15deg", "15deg"]);
    const sheenX = useSpring(0, { bounce: 0 });
    const sheenY = useSpring(0, { bounce: 0 });
    const scale = useSpring(1, { bounce: 0 });

    const handleMouseMove = (e) => {
        const { width, height, left, top } =
            e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        xRot.set(x / width - 0.5);
        yRot.set(y / height - 0.5);
        sheenX.set(x - 125);
        sheenY.set(y - 125);
    };
    const handleMouseEnter = () => {
        scale.set(1.05);
    };

    const handleMouseLeave = () => {
        scale.set(1);
        xRot.set(0);
        yRot.set(0);
    };

    const colors = [
        "rgb(8 29 46)",
        "rgb(42 30 26)",
        "rgb(58 13 44)",
        "rgb(14 40 31)",
    ];

    const textColors = [
        "rgb(8 251 251)",
        "rgb(233 174 70)",
        "rgb(210 16 90)",
        "rgb(55 177 78)"
    ]

    return (
        <>
            <motion.div
                className={styles.memberWrapper}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    transformStyle: "preserve-3d",
                    backgroundImage: `url(/bg/bg${(index % 4) + 1}.jpg)`,
                }}
            >
                <div
                    className={styles.picContainer}
                    style={{
                        backgroundImage: `url("/Team/${member.name}.png")`,
                    }}
                ></div>
                <div
                    className={styles.gradient}
                    style={{ backgroundColor: colors[index % 4] }}
                >
                </div>
                <div className={styles.data}>
                    <h2 className="pricedown" style={{color: textColors[index%4]}}>{member.name}</h2>
                    <h3 style={{color: textColors[index%4]}}>{member.team} Head</h3>
                </div>
                <motion.div
                    className={styles.sheen}
                    style={{ left: sheenX, top: sheenY }}
                ></motion.div>
            </motion.div>
        </>
    );
}
