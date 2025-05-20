import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { ShowAccountData } from "./ShowUserData";
import { getUserData } from "@/data/callUserApi";

const Header = async () => {

  const cookie = (await cookies()).toString();
  const user = await getUserData(cookie);

  return (
    <header className={styles.header}>
      <Navbar isAdmin={user?.isAdmin} />
      <div className={styles.right}>
        {user ? (
          <ShowAccountData user={user} />
        ) : (
          <>
            <Link className={styles.btn} href="/login">
              login
            </Link>
            <Link className={styles.btn} href="/register">
              register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};


export default Header;
