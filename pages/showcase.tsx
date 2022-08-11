import React from "react";
import styles from "../styles/Showcase.module.scss";
import Image from "next/image";
import { trpc } from "../common/hooks/trpc";

export default function Showcase() {
  const { data: games } = trpc.useQuery(["game.all"]);

  return (
    <ul className={styles.page}>
      {games?.map((game) => (
        <li className={styles.card} key={game.id}>
          <Image
            src={game.images[0]}
            alt="Minecraft Cover"
            width={400}
            height={400}
            layout="intrinsic"
          />
          <div className={styles.information}>
            <h1>{game.name}</h1>
            <div className={styles.tags}>
              {game.tags.map((tag) => (
                <span key={tag.id}>{tag.name}</span>
              ))}
            </div>
            <p>{game.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
