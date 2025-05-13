"use client";

import styles from "./Teams.module.css";
import team from "../../../data/team";
import TeamCard from "../../../components/TeamCard/TeamCard";

export default function Teams() {

    return (
        <div id={styles.teamsContainer}>
            <section id={styles.teamsHeader}>
                <h1 id={styles.teamsLogo} className="pricedown">
                    NSSC
                </h1>
                <h2 className="pricedown">Teams</h2>
            </section>{" "}
            <section id={styles.teams}>
                {team.map((member, index) => (
                        <TeamCard member={member} index={index} key={index}/>
                ))}
            </section>
        </div>
    );
}
