import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";

interface TimeCounterProps {
  from: Date;
}

export default function TimeCounter(props: TimeCounterProps) {
  const [duration, setDuration] = useState<string>();

  useEffect(() => {
    const fromDate = dayjs(props.from);
    setDuration(fromDate.toNow(true));
    const timer = window.setInterval(
      () => setDuration(fromDate.toNow(true)),
      1000
    );
    return () => {
      window.clearInterval(timer);
    };
  }, [props.from]);

  return <span>{duration && `${duration} ago`}</span>;
}
