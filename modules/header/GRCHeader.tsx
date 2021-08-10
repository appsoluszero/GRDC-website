import Image from "next/image";
import React from "react";
import styles from "./GRCHeader.module.scss";
import logo from "../../public/logo.png";
import Link from "next/link";
import { GRCNavLink } from "./GRCNavLink";

export default function GRCHeader() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.background_image}>
          <div />
        </div>

        <div className={styles.image_holder}>
          <Image src={logo} alt="G.R.D.C" width={200} height={200} />
        </div>
        <div>
          <h1>ชมรมวิจัยและพัฒนาเกม</h1>
          <h2>Game Research and Development Club</h2>
        </div>
      </header>
      <header className={styles.header_nav}>
        <Link href="/">
          <a>
            <img id="top-header_logo" src={logo.src} alt="Club Logo" />
          </a>
        </Link>
        <GRCNavLink />
      </header>
    </>
  );
}
