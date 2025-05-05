import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import Navbar from "./Navbar";
const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
        <Link className={styles.btn} href="/login">
          login
        </Link>
        <Link className={styles.btn} href="/register">
          register
        </Link>
      </div>
    </header>
  );
};

export default Header;
