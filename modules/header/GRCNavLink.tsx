import React from "react";
import Link from "next/link";
import { navLinks } from "../../common/constants/navlinks";
import { useSession } from "next-auth/client";
import styles from "./GRCNavLink.module.scss";

export function GRCNavLink() {
  const [session] = useSession();

  return (
    <nav className={styles.navlink}>
      <ul>
        {navLinks
          .flatMap((link) => {
            // map to link() if link is a function, but get filtered out if link() return null
            // if link is object then it's mapped to link
            if (typeof link === "function") {
              const _link = link(session);
              return _link ? [_link] : [];
            }
            return [link];
          })
          .map((link) => {
            if (link.action) {
              return (
                <li>
                  {link.element || (
                    <button onClick={link.action}>{link.name}</button>
                  )}
                </li>
              );
            } else {
              return (
                <li key={link.name}>
                  {link.element || (
                    <Link href={link.href ?? "#"}>
                      <a>{link.name}</a>
                    </Link>
                  )}
                </li>
              );
            }
          })}
      </ul>
    </nav>
  );
}
