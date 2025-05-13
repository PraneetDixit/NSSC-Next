"use client";

import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = () => {
            try {
                const user = JSON.parse(localStorage.getItem("currentUser"));
                if (!user) {
                    router.push("/login");
                    return;
                }

                const existingUsersData = localStorage.getItem("existingUsers");
                if (!existingUsersData) {
                    console.error("No existing users found");
                    return;
                }

                const existingUsers = JSON.parse(existingUsersData);
                const currentUser = existingUsers.find(
                    (existingUser) => existingUser.username === user.username
                );

                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        fetchUserData();
    }, [router, pathname]);

    const handleSignOut = () => {
        localStorage.removeItem("currentUser");
        router.push("/login");
    };

    return (
        <>
            {user && (
                <>
                    <div id={styles.profileContainer}>
                        <section id={styles.profileHeader}>
                            <h1 id={styles.profileLogo} className="pricedown">
                                NSSC
                            </h1>
                        </section>
                        <div id={styles.profile}>
                            <div id={styles.profileMain}>
                                <Image src={user.avatar} alt="Avatar" width={150} height={150}/>
                                <h2 className="pricedown">{user.username}</h2>
                                <p>
                                    <span className={styles.yellow}>
                                        NSSC ID:
                                    </span>{" "}
                                    {user.id}
                                </p>
                                <div className={styles.actions}>
                                    <button>
                                        <Link href="/profile/edit">
                                            Edit Profile
                                        </Link>
                                    </button>
                                    <button onClick={handleSignOut}>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                            <div id={styles.profileDetails}>
                                    <h4 className={styles.yellow}>
                                        Personal Details
                                    </h4>
                                <div id={styles.personal}>
                                    <p>
                                        <span className={styles.yellow}>
                                            Email:{" "}
                                        </span>
                                        {user.email
                                            ? user.email
                                            : "Not updated"}
                                    </p>
                                    <p>
                                        <span className={styles.yellow}>
                                            Mobile:{" "}
                                        </span>
                                        {user.mobile
                                            ? user.mobile
                                            : "Not updated"}
                                    </p>
                                    <p>
                                        <span className={styles.yellow}>
                                            Gender:{" "}
                                        </span>
                                        {user.gender
                                            ? user.gender
                                            : "Not updated"}
                                    </p>
                                    <p>
                                        <span className={styles.yellow}>
                                            College:{" "}
                                        </span>
                                        {user.college
                                            ? user.college
                                            : "Not updated"}
                                    </p>
                                    <p>
                                        <span className={styles.yellow}>
                                            City:{" "}
                                        </span>
                                        {user.city ? user.city : "Not updated"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
