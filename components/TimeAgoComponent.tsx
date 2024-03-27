import React from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

interface TimeAgoComponentProps {
  dateStr: string | number;
  className?: string;
}

export const TimeAgoComponent = ({
  dateStr,
  className,
}: TimeAgoComponentProps) => {
  TimeAgo.addDefaultLocale(en);
  const date = new Date(dateStr);
  return (
    <ReactTimeAgo
      date={date}
      className={className}
      locale="en-US"
    ></ReactTimeAgo>
  );
};
