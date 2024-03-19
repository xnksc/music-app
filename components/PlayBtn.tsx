import { FaPlay } from "react-icons/fa6";

export const PlayBtn = () => {
  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-cyan-600 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 ">
      <FaPlay></FaPlay>
    </button>
  );
};
