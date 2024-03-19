import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
interface ScrollableTitleProps {
  title: string;
}

export const ScrollableTitle = ({ title }: ScrollableTitleProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [width, setWidth] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement && titleElement.scrollWidth > titleElement.clientWidth) {
      setWidth(titleElement.clientWidth / 5);
      setShouldScroll(true);
      setOffsetWidth(titleElement.scrollWidth);
    } else {
      setShouldScroll(false);
    }
  }, [title]);

  const divStyle = {
    marginLeft: `${width}px`,
  };
  let duration = 8;
  const secondTitle = width !== 0 ? <span style={divStyle}>{title}</span> : "";
  const moveTitleWidth = offsetWidth + width;
  if (title.length >= 25) {
    duration = 12;
  }
  return (
    <div
      ref={titleRef}
      className={`text-white flex flex-row overflow-visible  ${
        shouldScroll ? "overflow-x-visible whitespace-nowrap" : "truncate"
      }`}
    >
      {shouldScroll ? (
        <motion.h1
          className="whitespace-nowrap"
          animate={{ x: -moveTitleWidth }}
          initial={{ x: 0 }}
          transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
          ref={firstRef}
        >
          {title}
          {secondTitle}
        </motion.h1>
      ) : (
        <div>{title}</div>
      )}
    </div>
  );
};
