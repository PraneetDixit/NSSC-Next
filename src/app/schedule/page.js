"use client";

import { useState } from "react";
import styles from "./Schedule.module.css";
import schedule from "../../../data/schedule.js";
import { motion, AnimatePresence } from "framer-motion";
import Planet from "../../../components/Planet/Planet.js";

export default function Schedule() {
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleEventClick = (index) => {
        console.log("Clicked event index:", index);
        setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
    };
    const [activeDate, setActiveDate] = useState(16);
    const dates = [16, 17, 18];
    return (
        <div id={styles.scheduleContainer}>
            <section id={styles.scheduleHeader}>
                <h1 id={styles.scheduleLogo} className="pricedown">
                    NSSC
                </h1>
                <h2 className="pricedown">Schedule</h2>
                <p>
                    <span className={styles.chip}>16-18</span>
                    <span className={styles.chip}>May</span>
                </p>
            </section>
            <div id={styles.schedule}>
                <div id={styles.tabs}>
                    {dates.map((date, index) => (
                        <motion.button
                            className={`${styles.tab} ${
                                activeDate == date ? styles.activeDate : ""
                            }`}
                            onClick={() => {
                                setActiveDate(date);
                                setActiveIndex(-1);
                            }}
                            key={index}
                            initial={{ opacity: 0, y: "50px" }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.2,
                                    delay: index * 0.1 + 0.5,
                                },
                            }}
                            whileHover={{
                                scale: 1.02,
                                transition: {
                                    duration: 0.2,
                                    delay: 0,
                                },
                            }}
                        >
                            <h3>{date}</h3>
                            <p>May.</p>
                        </motion.button>
                    ))}
                </div>
                <div id={styles.scheduleContent}>
                    <div id={styles.solarSystem}>
                        <div id={styles.ring}></div>
                        <motion.div
                            id={styles.sun}
                            animate={{
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.5, 1],
                                repeat: Infinity,
                                repeatDelay: 0,
                            }}
                        >
                            <div id={styles.sunCore}></div>
                        </motion.div>
                        <AnimatePresence mode="wait">
                            {schedule[activeDate].map((event, index) => (
                                <motion.div
                                    key={`${activeDate}-${index}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Planet
                                        totatPlanets={
                                            schedule[activeDate].length
                                        }
                                        event={event}
                                        activeIndex={activeIndex}
                                        index={index}
                                        baseAngle={
                                            index *
                                            (360 / schedule[activeDate].length)
                                        }
                                        handleEventClick={handleEventClick}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
