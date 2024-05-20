"use client";
import { cn } from "@/libs/helpers";
import { usePathname } from "@/navigation";
import * as RSlider from "@radix-ui/react-slider";
import { useMediaQuery } from "usehooks-ts";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const Slider = ({ onChange, value = 1 }: SliderProps) => {
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
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? (
    <RSlider.Root
      className="relative group flex items-center select-none touch-none w-[4px] h-[66px]"
      defaultValue={[value]}
      value={[value]}
      orientation="vertical"
      onValueChange={onChangeHandler}
      max={1}
      step={0.01}
      aria-label="Volume"
    >
      <RSlider.Track className="bg-neutral-600/30 relative grow rounded-full h-[66px]">
        <RSlider.Range
          className={cn("absolute bg-neutral-200 rounded-full w-full", color)}
        />
      </RSlider.Track>
      <RSlider.Thumb
        className={cn(
          "hidden w-[8px] h-[8px] group-hover:block rounded-full outline-none cursor-pointer  transform -translate-x-1/4 -translate-y-1/4",
          color
        )}
        aria-label="Volume"
      />
    </RSlider.Root>
  ) : (
    <RSlider.Root
      className="relative group flex items-center select-none touch-none w-full h-"
      defaultValue={[value]}
      value={[value]}
      onValueChange={onChangeHandler}
      max={1}
      step={0.01}
      aria-label="Volume"
    >
      <RSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RSlider.Range
          className={cn("absolute bg-neutral-300 rounded-full h-full", color)}
        />
      </RSlider.Track>
      <RSlider.Thumb
        className={cn(
          "hidden w-2 h-2 group-hover:block rounded-full outline-none cursor-pointer",
          color
        )}
        aria-label="Volume"
      />
    </RSlider.Root>
  );
};
