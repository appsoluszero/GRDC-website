import Image from "next/image";
import React from "react";
import styles from "./GRCHeader.module.scss";
import logo from "../../public/logo.png";
import Link from "next/link";
import { navLinks } from "../../common/constants/navlinks";

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
          <img id="top-header_logo" src={logo.src} alt="Club Logo" />
        </Link>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href ?? "#"}>
                  <a>{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
