import Image from "next/image";
import React from "react";
import { useState, useMemo, useCallback } from "react";
import styles from "./ImageWithFocus.module.scss";

export interface ImageWithFocusProps {
  normalRes: [number, number];
  focusRes: [number, number];
  imageData: StaticImageData;
}

type ImageArgument = {
  res: {
    imageData: StaticImageData;
    width: number;
    height: number;
  };
};

const GetImage = (props: ImageArgument) => {
  return (
    <Image
      src={props.res.imageData}
      alt="Test Pic Zoom"
      width={props.res.width}
      height={props.res.height}
    />
  );
};

export default function ImageWithFocus(props: ImageWithFocusProps) {
  const [displaying, setDisplaying] = useState(false);

  const handleClick = useCallback(() => {
    setDisplaying((displaying) => !displaying);
  }, [setDisplaying]);

  const { normalRes, focusRes, imageData: link } = props;

  const focusElem = useMemo(
    () => (
      <div className={styles.image_focus}>
        <a href="#image-focus" onClick={handleClick}>
          <GetImage
            res={{
              imageData: link,
              width: focusRes[0],
              height: focusRes[1],
            }}
          />
        </a>
      </div>
    ),
    [handleClick, link, focusRes]
  );

  return (
    <div>
      <a href="#image-focus" onClick={handleClick}>
        <GetImage
          res={{
            imageData: link,
            width: normalRes[0],
            height: normalRes[1],
          }}
        />
      </a>
      {displaying && focusElem}
    </div>
  );
}
