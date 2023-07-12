"use client";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false), onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  const onPlayNext = () => {
    // break if no songs to play
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const nextSong = player.ids[currentIndex + 1];
    // goto beginning of playlist if we're at the end
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    // break if no songs to play
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const prevSong = player.ids[currentIndex - 1];
    // goto end of playlist if we're at the beginning
    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(prevSong);
  };

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
          <Icon onClick={handlePlay} size={30} className="text-black" />
        </div>
      </div>

      {/** Desktop controls */}
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrev}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />

        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          onClick={() => {}}
        >
          <Icon onClick={handlePlay} className="text-black" size={30} />
        </div>

        <AiFillStepForward
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          size={30}
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2 ">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />

          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
