"use client";

import styles from "./Spotlight.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Spotlight({ items, expanded, setExpanded }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClose = () => {
        setExpanded(false);
        setCurrentIndex(0);
    };

    return (
        <motion.div
            id={styles.spotlightContainer}
            animate={{
                x: expanded ? 0 : "100%",
            }}
            initial={{ x: "100%" }}
            transition={{ duration: 0.2 }}
        >
            <div id={styles.spotlightHeader}>
                <h1 className="pricedown">
                    {items.icon} {items.category}
                </h1>
                <button id={styles.close} onClick={handleClose}>
                    ✖
                </button>
            </div>

            <div id={styles.spotlightContent}>
                <div className={styles.carouselContainer}>
                    <AnimatePresence>
                        {items.images.map((item, index) => {
                            const position = index - currentIndex;
                            const isVisible = Math.abs(position) <= 2;
                            const skewAngle = Math.min(
                                Math.max(position * 15, -25),
                                25
                            );
                            const scale =
                                index === currentIndex
                                    ? 1
                                    : Math.max(
                                          0.6,
                                          0.85 - Math.abs(position) * 0.15
                                      );

                            return (
                                <motion.div
                                    className={`${styles.spotlightItem} ${
                                        index === currentIndex
                                            ? styles.activeSpotlight
                                            : ""
                                    }`}
                                    key={index}
                                    style={{
                                        backgroundImage: `url(/Gallery/${items.category.replace(
                                            /\s+/g,
                                            "%20"
                                        )}/${item})`,
                                        transformStyle: "preserve-3d",
                                    }}
                                    initial={{
                                        opacity: 0,
                                        transform: `perspective(1000px) translateX(${
                                            position < 0 ? -150 : 150
                                        }%) translateY(-50%) scale(0.8) rotateY(${
                                            position < 0 ? -30 : 30
                                        }deg)`,
                                    }}
                                    animate={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: `perspective(1000px) translateX(${
                                            position * 110 - 50
                                        }%) translateY(-50%) scale(${scale}) rotateY(${skewAngle}deg)`,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transform: `perspective(1000px) translateX(${
                                            position < 0 ? -150 : 150
                                        }%) translateY(-50%) scale(0.8) rotateY(${
                                            position < 0 ? -30 : 30
                                        }deg)`,
                                        transition: { duration: 0.3 },
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                        mass: 1,
                                    }}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            );
                        })}
                    </AnimatePresence>
                </div>
                <div id={styles.controls}>
                    <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(currentIndex - 1)}
                    >
                        ◀
                    </button>
                    <button
                        disabled={currentIndex === items.images.length - 1}
                        onClick={() => setCurrentIndex(currentIndex + 1)}
                    >
                        ▶
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
