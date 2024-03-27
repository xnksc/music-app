// import React, { useState } from "react";

// interface PassedTimeProps {
//   time?: number;
// }

// export const PassedTime = ({ time }: PassedTimeProps) => {
//   const [timeStatus, setTimeStatus] = useState("loading");
//   if (!time) {
//     return "loading";
//   }

//   if (time < 61) {
//     setTimeStatus("now");
//   } else if (time < 3601) {
//     setTimeStatus(`${time / 60} minutes ago`);
//   } else if (time < 86400) {
//     setTimeStatus(`${time / 3600} hours ago`);
//   } else if (time < 604800) {
//     setTimeStatus(`${time / 86400} days ago`);
//   } else if (time < 2592000) {
//     setTimeStatus(`${time / 604800} weeks ago`);
//   } else if (time < 31536000) {
//     setTimeStatus(`${time / 2592000} months ago`);
//   } else setTimeStatus(`${time / 31536000} years ago`);

//   return <div>{timeStatus}</div>;
// };
