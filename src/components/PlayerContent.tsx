"use client";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types/types";
import { FC, useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);

  const Icon = false ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/** Mobile controls */}
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          className="h-10 w-10 flex items-center justify-self-center rounded-full bg-white p-1 cursor-pointer"
          onClick={() => {}}
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/** Desktop controls */}
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={() => {}}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          onClick={() => {}}
        >
          <Icon className="text-black" size={30} />
        </div>
        <AiFillStepForward
          onClick={() => {}}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          size={30}
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2 ">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={() => {}} className="cursor-pointer" size={34} />

          <Slider />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
