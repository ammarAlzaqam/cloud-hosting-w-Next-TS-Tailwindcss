import { TiTick } from "react-icons/ti";
import styles from "./style.module.css";
import Image from "next/image";
import CloudImage from "../../../../../public/cloud-hosting.png";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.title}>Cloud Hosting</h1>
        <p className={styles.desc}>
          The best web hosting solution for your online success
        </p>
        <div className={styles.services}>
          <div className={styles.serviceItem}>
            <TiTick />
            Easy to use control panel
          </div>
          <div className={styles.serviceItem}>
            <TiTick />
            Secure hosting
          </div>
          <div className={styles.serviceItem}>
            <TiTick />
            Website maintenance
          </div>
        </div>
      </div>

      <div className={styles.image}>
        <Image src={CloudImage} width={500} height={500} alt="cloud-image" />
      </div>
    </div>
  );
}
