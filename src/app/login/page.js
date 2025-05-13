"use client"

import styles from "./Login.module.css";
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    
    const handleLogin = (e) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("existingUsers")) || [];
        console.log(existingUsers, "initial all users");

        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
            avatar: `https://avatar.iran.liara.run/public/${Math.ceil(Math.random()*100)}`,
            id: `NSSC25PA${String(existingUsers.length + 1).padStart(4, "0")}`,
        };

        console.log(user, "user to be pushed");

        if (
            !existingUsers.some(
                (existingUser) => {
                  if(existingUser.username === user.username){
                    console.log("user already exists")
                    localStorage.setItem("currentUser", JSON.stringify(existingUser));
                    return true;
                  }}
                )
        ) {
          console.log("user not found, pushing new user")
            existingUsers.push(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
        }

        console.log(existingUsers, "before final pushing in allusers");

        localStorage.setItem("existingUsers", JSON.stringify(existingUsers));
        router.push("/profile");
    };

    return (
        <div id={styles.loginContainer}>
            <section id={styles.loginHeader}>
                <h1 id={styles.loginLogo} className="pricedown">
                    NSSC
                </h1>
                <h2 className="pricedown">Login</h2>
                <form onSubmit={(e) => handleLogin(e)}>
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}
