"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [expanded, setExpanded] = useState(false);
    const handleToggle = () => {
        setExpanded(!expanded);
    };
    const routes = [
        { url: "/", name: "Home" },
        { url: "/schedule", name: "Schedule" },
        { url: "/teams", name: "Teams" },
        { url: "/gallery", name: "Gallery" },
        { url: "/profile", name: "Profile" },
        { url: "/login", name: "Login" },
    ];
    const pathname = usePathname();
    const isActive = (route) => {
        return pathname === route.url;
    };

    return (
        <>
            <button className={styles.hamburger} onClick={handleToggle}>
                {expanded ? "✖" : "☰"}
            </button>
            <motion.div
                animate={{
                    x: expanded ? 0 : "100%",
                }}
                initial={{ x: "100%" }}
                transition={{ duration: 0.2 }}
                className={styles.navWrapper}
            >
                <nav>
                    <ul>
                        {routes.map((route) => (
                            <li key={route.name}>
                                <Link
                                    href={route.url}
                                    style={
                                        isActive(route)
                                            ? { color: "var(--yellow)" }
                                            : {}
                                    }
                                    className="pricedown"
                                    onClick={handleToggle}
                                >
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </motion.div>
        </>
    );
}
