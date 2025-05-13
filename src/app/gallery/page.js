"use client";

import styles from "./Gallery.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import gallery from "../../../data/gallery";
import Spotlight from "../../../components/Spotlight/Spotlight";

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);

    const handleClick = (index) => {
        if(activeIndex === index) {
            setExpanded(true);
        }
        setActiveIndex(index);
    }


    return (
        <>
        <Spotlight items={gallery[activeIndex]} expanded={expanded} setExpanded={setExpanded}/>
        <div id={styles.galleryContainer}>
            <section id={styles.galleryHeader}>
                <h1 id={styles.galleryLogo} className="pricedown">
                    NSSC
                </h1>
                <h2 className="pricedown">Gallery</h2>
            </section>
            <div id={styles.galleryContent}>
                <motion.div id={styles.carousel} initial={{ opacity: 0, y: "20px" }} whileInView={{ opacity: 1, y:0 }} transition={{ duration: 0.5 }}>
                    {gallery.map((item, index) => (
                        <motion.div
                            className={`${styles.carouselItem} ${
                                activeIndex === index ? styles.active : ""
                            } ${activeIndex === index ? "rotate" : ""}`}
                            key={index}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                width: activeIndex === index ? "600px" : "82px",
                                transition: {
                                    opacity: { duration: 0.5, delay: index * 0.1 },
                                    width: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                        duration: 0.5,
                                    },
                                },
                            }}
                            whileHover={{
                                y: -15,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.5,
                                },
                            }}
                            onClick={()=>handleClick(index)}                            style={{
                                backgroundImage: `url(/Gallery/${item.category.replace(
                                    /\s+/g,
                                    "%20"
                                )}/${item.images[0]})`,
                            }}
                        >
                            <div className={styles.carouselDescription}>
                                <div className={styles.carouselIcon}>
                                    {item.icon}
                                </div>
                                <motion.div
                                    animate={{
                                        width:
                                            activeIndex === index
                                                ? "350px"
                                                : "0px",
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                            duration: 0.5,
                                            delay: 0.2
                                        },
                                    }}
                                    className={`${styles.carouselText} pricedown`}
                                >
                                    {item.category}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
        </>
    );
}
