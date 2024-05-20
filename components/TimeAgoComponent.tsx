"use client";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { useLocale } from "next-intl";

interface TimeAgoComponentProps {
  dateStr: string | number;
  className?: string;
}

export const TimeAgoComponent = ({
  dateStr,
  className,
}: TimeAgoComponentProps) => {
  const locale = useLocale();
  const lang = locale == "en" ? "en-US" : "ru-RU";
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);
  const date = new Date(dateStr);
  return (
    <ReactTimeAgo
      date={date}
      className={className}
      locale={lang}
    ></ReactTimeAgo>
  );
};
