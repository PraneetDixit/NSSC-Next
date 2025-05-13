"use client";

import { useEffect, useState } from "react";
import styles from "./Edit.module.css";
import { useRouter } from "next/navigation";
import {motion} from "framer-motion";

export default function Edit() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const existingUser = JSON.parse(
            localStorage.getItem("existingUsers")
        ).find((existingUser) => existingUser.username === user.username);
        setUser(existingUser);
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const existingUsers = JSON.parse(localStorage.getItem("existingUsers"));
        const updatedUser = {
            ...user,
            college: e.target.college.value,
            city: e.target.city.value,
            email: e.target.email.value,
            mobile: e.target.mobile.value,
            gender: e.target.gender.value,
            avatar: e.target.gender.value ? `https://avatar.iran.liara.run/public/${e.target.gender.value == "Male" ? "boy" : "girl"}?username=${user.username}` : user.avatar,
        };
        const updatedUsers = existingUsers.map((existingUser) => {
            if (existingUser.username === user.username) {
                return updatedUser;
            }
            return existingUser;
        });
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        localStorage.setItem("existingUsers", JSON.stringify(updatedUsers));
        router.back();
    };

    return (
        <div id={styles.editContainer}>
            <motion.form onSubmit={(e) => handleEdit(e)} animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: "100px" }} transition={{ duration: 0.5, ease: "easeOut" }} id="editForm">
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={user?.email || ""}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
                <input
                    required
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={user?.mobile || ""}
                    onChange={(e) =>
                        setUser({ ...user, mobile: e.target.value })
                    }
                />
                <input
                    required
                    type="text"
                    name="college"
                    placeholder="College Name"
                    value={user?.college || ""}
                    onChange={(e) =>
                        setUser({ ...user, college: e.target.value })
                    }
                />
                <input
                    required
                    type="text"
                    name="city"
                    placeholder="City"
                    value={user?.city || ""}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                />
                <select 
                    name="gender" 
                    value={user?.gender || ""}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <button type="submit">Update Profile</button>
            </motion.form>
        </div>
    );
}
