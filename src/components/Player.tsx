"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import { FC } from "react";
import PlayerContent from "./PlayerContent";

interface PlayerProps {}

const Player: FC<PlayerProps> = ({}) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  // don't load player if there's no song to play
  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      {/** using key to force player to reload on song change */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
