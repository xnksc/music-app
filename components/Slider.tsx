"use client";
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
        <RSlider.Range className="absolute  group-hover:bg-cyan-600 bg-neutral-200 rounded-full w-full" />
      </RSlider.Track>
      <RSlider.Thumb
        className="hidden w-[8px] h-[8px] bg-cyan-600 group-hover:block rounded-full outline-none cursor-pointer  transform -translate-x-1/4 -translate-y-1/4"
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
        <RSlider.Range className="absolute group-hover:bg-cyan-600 bg-neutral-200 rounded-full h-full" />
      </RSlider.Track>
      <RSlider.Thumb
        className="hidden w-2 h-2 bg-cyan-600 group-hover:block rounded-full outline-none cursor-pointer"
        aria-label="Volume"
      />
    </RSlider.Root>
  );
};
