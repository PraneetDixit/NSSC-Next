"use client";

import { useState, useEffect } from "react";
import styles from "./Cursor.module.css";
import CursorIcon from "./cursorIcon";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isRotating, setIsRotating] = useState(false);
    const [shouldStop, setShouldStop] = useState(false);
    const [rotationCount, setRotationCount] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(0);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const isClickable = e.target.closest("a, button, .rotate");
            if (isClickable) {
                setIsRotating(true);
                setShouldStop(false);
                setRotationCount(0);
            }
        };

        const handleMouseOut = (e) => {
            const isClickable = e.target.closest("a, button, .rotate");
            if (isClickable) {
                setShouldStop(true);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseover", handleMouseOver);
        document.body.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseover", handleMouseOver);
            document.body.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);    useEffect(() => {
        if (isRotating) {
            setRotationAngle(rotationAngle + 180);
        }
    }, [isRotating]);

    const handleRotationComplete = () => {
        setRotationCount((prev) => prev + 1);

        if (shouldStop && rotationCount >= 0) {
            setIsRotating(false);
            setShouldStop(false);
            setRotationCount(0);
        } else if (isRotating) {
            setRotationAngle(rotationAngle + 180);
        }
    };

    return (
        <motion.div
            id={styles.cursorWrapper}
            style={{
                x: mouseX,
                y: mouseY,
            }}
        >
            <motion.div
                animate={{
                    rotate: rotationAngle,
                }}
                transition={{
                    rotate: {
                        duration: 0.8,
                        ease: "linear",
                    },
                }}
                onAnimationComplete={handleRotationComplete}
            >
                <CursorIcon />
            </motion.div>
        </motion.div>
    );
}
