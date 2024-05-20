"use client";
// import useSound from "use-sound";
import { Playlist, Song } from "@/types";
import { MediaItem } from "./MediaItem";
import { LikeBtn } from "./LikeBtn";
import { BsPlayFill, BsRepeat, BsRepeat1, BsShuffle } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Slider } from "./Slider";
import { usePlayer } from "@/hooks/usePlayer";
import { useEffect, useRef, useState } from "react";
import { DurationSlider } from "./DurationSlider";
import { RxSpeakerLoud, RxSpeakerModerate, RxSpeakerOff } from "react-icons/rx";
import { IoMdPause } from "react-icons/io";
import { PlaylistsMenu } from "./PlaylistsMenu";
import { Howl } from "howler";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/libs/helpers";
import { usePathname } from "@/navigation";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  playlists: Playlist[];
}

export const PlayerContent = ({
  playlists,
  song,
  songUrl,
}: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [repeatMode, setRepeatMode] = useState("repeatList");
  const [shuffleMode, setShuffleMode] = useState(false);
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const repeatModeRef = useRef("repeatList");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const Icon = isPlaying === true ? IoMdPause : BsPlayFill;
  const pathname = usePathname();
  const color =
    pathname == "/liked"
      ? "text-sky-500 hover:text-sky-400"
      : pathname.startsWith("/search")
      ? "text-[#d2c6b1] hover:text-stone-200/90"
      : pathname.startsWith("/playlists")
      ? "text-teal-500 hover:text-teal-400"
      : "text-cyan-500 hover:text-cyan-400";
  const VolumeIcon =
    volume === 0
      ? RxSpeakerOff
      : volume >= 0.7
      ? RxSpeakerLoud
      : RxSpeakerModerate;
  const soundRef = useRef<Howl | null>(null);

  const toggleRepeatMode = () => {
    switch (repeatModeRef.current) {
      case "repeat":
        repeatModeRef.current = "repeatList";
        break;
      case "repeatList":
        repeatModeRef.current = "repeat";
        break;
      default:
        break;
    }
    setRepeatMode(repeatModeRef.current);
  };

  const onPlayNext = () => {
    setProgress(0);
    if (player.ids.length === 0) {
      return;
    }
    if (repeatModeRef.current === "repeat") {
      soundRef.current?.stop();
      soundRef.current?.seek(0);
      soundRef.current?.play();
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    let nextSong;
    if (shuffleMode) {
      const unplayedSongs = player.ids.filter((id) => id !== player.activeId);
      const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
      nextSong = unplayedSongs[randomIndex];
    } else {
      nextSong = player.ids[currentIndex + 1];
    }
    if (!nextSong) {
      if (repeatModeRef.current === "repeatList") {
        return player.setId(player.ids[0]);
      } else {
        return;
      }
    }
    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    setProgress(0);
    if (player.ids.length === 0) {
      return;
    }
    if (repeatModeRef.current === "repeat") {
      soundRef.current?.stop();
      soundRef.current?.seek(0);
      soundRef.current?.play();
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    soundRef.current?.volume(value);
  };
  
  const handleProgressChange = (newValue: number) => {
    setProgress(newValue);
    soundRef.current?.seek(newValue);
  };

  useEffect(() => {
    soundRef.current = new Howl({
      src: [songUrl],

      volume: volume,
      onplay: () => setIsPlaying(true),
      // html5: true,
      autoplay: true,
      onend: () => {
        repeatModeRef.current !== "repeat" && setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ["mp3"],
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [songUrl]);

  useEffect(() => {
    const updateProgress = () => {
      const seek = soundRef.current?.seek() || 0;
      setProgress(seek);
      requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (!isPlaying) {
      soundRef.current?.play();
    } else {
      soundRef.current?.pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(player.volume);
      soundRef.current?.volume(player.volume);
    } else {
      player.setVolume(volume);
      setVolume(0);
      soundRef.current?.volume(0);
    }
  };

  const shuffleBtn = (
    <BsShuffle
      size={isMobile ? 14 : 16}
      className={cn(
        shuffleMode ? color : "text-neutral-400 hover:text-neutral-300",
        " cursor-pointer  transition "
      )}
      onClick={() => setShuffleMode(!shuffleMode)}
    />
  );

  const repeatBtn =
    repeatMode === "repeat" ? (
      <BsRepeat1
        onClick={toggleRepeatMode}
        size={isMobile ? 14 : 16}
        className={cn(
          "text-cyan-500 relative cursor-pointer transition",
          color
        )}
      />
    ) : (
      <BsRepeat
        onClick={toggleRepeatMode}
        size={isMobile ? 14 : 16}
        className={cn(
          "text-neutral-400 hover:text-neutral-300 cursor-pointer transition"
        )}
      />
    );

  // OLD

  const handleOpenSlider = () => {
    setIsOpenSlider(true);
  };

  const handleCloseSlider = () => {
    setIsOpenSlider(false);
  };

  const handleMouseDown = () => {
    const id = setTimeout(() => {
      setIsOpenSlider(true);
    }, 1000);
    setTimerId(id);
  };

  const handleMouseUp = () => {
    console.log("clear");
    clearTimeout(timerId);
  };

  return (
    <div className="grid grid-cols-4 h-full w-full">
      <div className=" flex col-span-1 w-full justify-start">
        <div
          className={cn(
            " max-w-[150px] flex items-center gap-x-4 ",
            isMobile ? "max-w-[100px]" : ""
          )}
        >
          <MediaItem
            isPlayer={true}
            className="cursor-default hover:from-transparent hover:to-transparent"
            data={song}
          ></MediaItem>
          <LikeBtn songId={song.id} size={20}></LikeBtn>
        </div>
      </div>

      {/* CONTROLLER*/}
      <div className="col-span-2 flex flex-col items-center justify-between p-0">
        {/*  small */}
        <div className="gap-x-2 mt-[16px] flex md:hidden col-auto w-full justify-center items-center ">
          {shuffleBtn}
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={20}
            className="text-neutral-200 ml-2 hover:text-white transition cursor-pointer"
          ></AiFillStepBackward>
          <div
            className="h-8 w-8 flex items-center justify-center bg-white cursor-pointer rounded-full"
            onClick={handlePlay}
          >
            <Icon size={16} className="text-black "></Icon>
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={16}
            className="text-neutral-200 mr-2 hover:text-white transition cursor-pointer"
          ></AiFillStepForward>
          {repeatBtn}
        </div>

        {/* MD  */}
        <div className="hidden my-1 mt-[16px] md:flex justify-center items-center w-full max-w-[720px] gap-x-4">
          {shuffleBtn}
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={20}
            className="text-neutral-200 hover:text-white transition cursor-pointer"
          ></AiFillStepBackward>
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full p-1 bg-neutral-200 hover:bg-white cursor-pointer"
          >
            <Icon size={16} className="text-neutral-900"></Icon>
          </div>
          <AiFillStepForward
            size={20}
            className="disabled text-neutral-200 cursor-pointer hover:text-white transition"
            onClick={onPlayNext}
          ></AiFillStepForward>
          {repeatBtn}
        </div>
        <div className=" pb-2 w-full px-2 md:flex">
          <DurationSlider
            value={progress}
            onChange={handleProgressChange}
            duration={soundRef.current?.duration()}
          ></DurationSlider>
        </div>
      </div>
      {/* VOLUME + PLAYLIST*/}
      <div className="flex justify-end items-center pr-2 ">
        <PlaylistsMenu
          classNameBtn="mx-4 text-neutral-300 h-[20px] outline-none hover:text-white transition"
          className={cn(isMobile ? " w-[180px] mr-[10px] " : "min-w-[180px]")}
          size={20}
          songId={song.id}
          playlists={playlists}
        ></PlaylistsMenu>
        <div className="flex relative items-center gap-x-2 text-neutral-300 hover:text-white h-[20px] ">
          <VolumeIcon
            onClick={toggleMute}
            onTouchStart={handleMouseDown}
            onMouseEnter={handleOpenSlider}
            onTouchEnd={handleMouseUp}
            className={
              (cn("group cursor-pointer transition"),
              isMobile && isOpenSlider ? "opacity-0" : "")
            }
            size={18}
          ></VolumeIcon>
          <div
            onMouseLeave={handleCloseSlider}
            className={cn(
              " flex justify-center items-center rounded-xl transition",
              isMobile
                ? cn(
                    " bg-cyan-800/20 py-2 transition absolute w-[20px] h-[80px]",
                    isOpenSlider ? "" : "hidden"
                  )
                : "w-[80px] xl:w-[120px]"
            )}
          >
            <Slider value={volume} onChange={handleVolumeChange}></Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
