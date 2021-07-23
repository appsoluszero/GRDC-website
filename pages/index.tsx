import Head from "next/head";
import GRCHeader from "../modules/header/GRCHeader";
import styles from "../styles/Home.module.scss";
import ReactCompareImage from "react-compare-image";
import ImageWithFocus from "../modules/ImageWithFocus";
import thisPic from "../public/p5wallpaper.png";

export default function Home() {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <ImageWithFocus
          imageData={thisPic}
          normalRes={[960, 540]}
          focusRes={[1280, 720]}
        />
      </div>

      <div className={styles.motto_container}>
        {new Array(5).fill(0).map((_, i) => (
          <div key={i}>
            <h1>{i + 1}. Game Research and Development Club</h1>
            <h2>Join us and discover your passion together!</h2>
          </div>
        ))}
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
}
