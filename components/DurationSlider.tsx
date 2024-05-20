"use client";
import { cn } from "@/libs/helpers";
import { usePathname } from "@/navigation";
import * as RSlider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  duration?: number;
  volume?: number;
  onMouseMove?: (volume: number) => void;
}

export const DurationSlider = ({
  onChange,
  value = 0, //sec
  duration = 0, //sec
}: SliderProps) => {
  const onChangeHandler = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  const pathname = usePathname();
  const color =
    pathname == "/liked"
      ? "group-hover:bg-sky-500"
      : pathname.startsWith("/search")
      ? "group-hover:bg-stone-300/90"
      : pathname.startsWith("/playlists")
      ? "group-hover:bg-teal-500"
      : "group-hover:bg-cyan-500";
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    setCurrTime({
      min: Math.floor(value / 60),
      sec: Math.floor(value % 60),
    });
  }, [value]);

  const durationMin = Math.floor(duration / 60); //100s - 1 m
  const durationSec = Math.floor(duration % 60); //100s - 40s

  return (
    <div className="flex items-center select-none touch-none w-full h-[20px]">
      <div className="flex p-1 md:py-2 text-xs md:text-sm">
        {currTime.min > 9 ? (
          <span className="">{currTime.min} </span>
        ) : (
          <span className="">0{currTime.min} </span>
        )}
        :
        {currTime.sec > 9 ? (
          <span className="">{currTime.sec} </span>
        ) : (
          <span className="">0{currTime.sec} </span>
        )}
      </div>

      <RSlider.Root
        className="relative group flex items-center select-none touch-none w-full h-[20px]"
        defaultValue={[0]}
        value={[value]}
        onValueChange={onChangeHandler}
        max={duration}
        step={1}
        aria-label="Duration"
      >
        <RSlider.Track className=" bg-neutral-600 relative grow rounded-full h-[4px]">
          <RSlider.Range
            className={cn("absolute bg-neutral-300 rounded-full h-full", color)}
          ></RSlider.Range>
        </RSlider.Track>
        <RSlider.Thumb
          className={cn(
            "hidden group-hover:block w-[10px] h-[10px] rounded-full outline-none cursor-pointer",
            color
          )}
          aria-label="Volume"
        />
      </RSlider.Root>
      <div className="flex p-1 md:py-2 w-[auto]  text-xs md:text-sm">
        {durationMin > 9 ? (
          <span className="">{durationMin} </span>
        ) : (
          <span className="">0{durationMin} </span>
        )}
        :{" "}
        {durationSec > 9 ? (
          <span className="">{durationSec} </span>
        ) : (
          <span className="">0{durationSec} </span>
        )}
      </div>
    </div>
  );
};
