"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
} from "framer-motion";

export default function Home() {
    const [days, setDays] = useState("00");
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    const aboutHeadingRef = useRef(null);
    const [headingAmt, setHeadingAmt] = useState(0);
    const { scrollYProgress: scrollYHeadingProgress } = useScroll({
        target: aboutHeadingRef,
        offset: ["0 0.8", "0 0.6"],
    });

    const scaleHeadingX = useSpring(scrollYHeadingProgress, {
        stiffness: 300,
        damping: 30,
        restDelta: 0.001,
    });

    useMotionValueEvent(scaleHeadingX, "change", (latest) => {
        setHeadingAmt(latest * 100);
    });

    const [paraAmt, setParaAmt] = useState(0);
    const { scrollYProgress: scrollYParaProgress } = useScroll({
        target: aboutHeadingRef,
        offset: ["1 0.6", "1 0.2"],
    });

    const scaleParaX = useSpring(scrollYParaProgress, {
        stiffness: 300,
        damping: 30,
        restDelta: 0.001,
    });

    useMotionValueEvent(scaleParaX, "change", (latest) => {
        setParaAmt(latest * 100);
    });

    const altTextRef = useRef(null);
    const [altTextAmt, setAltTextAmt] = useState(0);
    const { scrollYProgress: scrollYAltTextProgress } = useScroll({
        target: altTextRef,
        offset: ["0 0.8", "0 0.3"],
    });

    const scaleAltTextX = useSpring(scrollYAltTextProgress, {
        stiffness: 300,
        damping: 30,
        restDelta: 0.001,
    });

    useMotionValueEvent(scaleAltTextX, "change", (latest) => {
        setAltTextAmt(latest * 100);
    });

    const targetDate = new Date("2025-05-16T00:00:00Z");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const timeDiff = targetDate - now;

            if (timeDiff <= 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setDays(String(days).padStart(2, "0"));
            setHours(String(hours).padStart(2, "0"));
            setMinutes(String(minutes).padStart(2, "0"));
            setSeconds(String(seconds).padStart(2, "0"));
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div id="homeWrapper">
                <section id={styles.hero}>
                    <video
                        autoPlay
                        muted
                        loop
                        id={styles.backgroundVideo}
                        src="/bg-video3.mp4"
                    ></video>
                    <div id={styles.heroContainer}>
                        <motion.h1
                            initial={{
                                transform: "translateY(200px) scaleX(0.5)",
                                opacity: "0.2",
                            }}
                            animate={{
                                transform: "translateY(0) scaleX(1)",
                                opacity: "1",
                                transition: { delay: 1.5, duration: 0.3 },
                            }}
                            id={styles.headerText}
                            className="pricedown"
                        >
                            National Students&apos;
                            <br /> Space Challenge
                        </motion.h1>
                        <motion.h2
                            initial={{
                                transform: "translateY(200px) scaleX(0.5)",
                                opacity: "0.2",
                            }}
                            animate={{
                                transform: "translateY(0) scaleX(1)",
                                opacity: "1",
                                transition: { delay: 1.8, duration: 0.3 },
                            }}
                            id={styles.subHeaderText}
                        >
                            May 16-18, 2025
                        </motion.h2>
                    </div>
                    <motion.div
                        id={styles.scrollDown}
                        animate={{ y: [0, 10, 0], x: ["-50%"] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeIn",
                        }}
                    >
                        <Image
                            src="/downArrow.svg"
                            alt="Scroll down"
                            width={24}
                            height={24}
                            priority
                        />
                    </motion.div>
                </section>
                <section id={styles.about}>
                    <motion.h2
                        ref={aboutHeadingRef}
                        className="pricedown"
                        style={{
                            backgroundImage: `linear-gradient(to right, var(--yellow-light), var(--yellow-light) ${headingAmt}%, #333 ${headingAmt}%, #333)`,
                        }}
                    >
                        Welcome to NSSC
                    </motion.h2>
                    <motion.p>
                        <motion.span
                            style={{ backgroundSize: `${paraAmt}% 100%` }}
                        >
                            The National Students&apos; Space Challenge (NSSC),
                            Asia&apos;s largest astro-technology fest, is the
                            flagship event of spAts, dedicated to space and
                            space tech. Since its inception in 2011, NSSC has
                            provided a national platform for aspiring engineers
                            and scientists to showcase their talent. It began
                            with Liftoff, a water rocket competition that
                            remained a centerpiece for over a decade. Over the
                            years, the fest has grown to include bot-building
                            challenges, space quizzes, case studies,
                            astrophotography, and more—alongside renowned guest
                            lectures, exhibitions, and workshops.
                        </motion.span>
                    </motion.p>
                </section>
                <section id={styles.countdown}>
                    <div id={styles.countdownTimer}>
                        <div className={styles.countdownItem}>
                            <span
                                className={`${styles.countdownNumber} pricedown`}
                            >
                                {days}
                            </span>
                            <span className={styles.countdownLabel}>Days</span>
                        </div>
                        <div className={styles.separator}>:</div>
                        <div className={styles.countdownItem}>
                            <span
                                className={`${styles.countdownNumber} pricedown`}
                            >
                                {hours}
                            </span>
                            <span className={styles.countdownLabel}>Hours</span>
                        </div>
                        <div className={styles.separator}>:</div>
                        <div className={styles.countdownItem}>
                            <span
                                className={`${styles.countdownNumber} pricedown`}
                            >
                                {minutes}
                            </span>
                            <span className={styles.countdownLabel}>
                                Minutes
                            </span>
                        </div>
                        <div className={styles.separator}>:</div>
                        <div className={styles.countdownItem}>
                            <span
                                className={`${styles.countdownNumber} pricedown`}
                            >
                                {seconds}
                            </span>
                            <span className={styles.countdownLabel}>
                                Seconds
                            </span>
                        </div>
                    </div>
                </section>
                <section id={styles.altAbout}>
                    <h2 className="pricedown">About Us</h2>
                    <div id={styles.altAboutContainer}>
                        <Image
                            src="/spAtsLogo.webp"
                            alt="spAts Logo"
                            width={500}
                            height={300}
                            style={{ objectFit: "contain" }}
                        />
                        <p>
                            <motion.span
                                ref={altTextRef}
                                style={{
                                    backgroundSize: `${altTextAmt}% 100%`,
                                }}
                            >
                                Space Technology Students&apos; Society, or spAts, is
                                the official student body under Kalpana Chawla
                                Space Technology Cell, IIT Kharagpur.
                                Established in 2008 by a small group of young
                                and ambitious undergraduate students, spAts had
                                humble beginnings. A small club founded as a
                                congregation of students with a common interest
                                called space, spAts started as an ordinary
                                student-run society with big ambitions. Since
                                its inception, the society has seen multiple
                                changes. From what used to be a regular space
                                discussion forum, spAts evolved into a
                                professionally run society that hosts many
                                events, along with the first and largest space
                                technology fest in India, the National Students&apos;
                                Space Challenge.
                            </motion.span>
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
