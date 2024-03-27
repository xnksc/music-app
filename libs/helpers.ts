import { Price } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface postDataProps {
  url: string;
  data?: { price: Price };
}

export const getUrl = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateDiff = (dateStrings: string[], dateNow: number) => {
  const dateDiff = [];
  for (const dateStr of dateStrings) {
    const date = new Date(dateStr).getTime();
    dateDiff.push((dateNow - date) / 1000); // sec
  }

  return dateDiff;
};

export const postData = async ({ url, data }: postDataProps) => {
  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in postData", { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (sec: number) => {
  var t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(sec);
  return t;
};
