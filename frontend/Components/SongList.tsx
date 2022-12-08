import * as React from "react";
import { IPlaylistData } from "./HomeContent";
import SongCard from "./SongCard";

interface ISongListProps {
  cardYPosition: Number;
  data: IPlaylistData;
}

const SongList: React.FunctionComponent<ISongListProps> = ({
  cardYPosition: y,
  data,
}) => {
  return (
    <div className="grid grid-cols-1 p-8 text-white">
      <div className="text-2xl font-bold hover:cursor-pointer hover:underline">
        {data.name}
      </div>
      <div className="flex flex-nowrap gap-8 overflow-hidden pt-8">
        {data.songs.map((song, index) => {
          return <SongCard key={index} Position={{ x: index, y }} musicData={song}/>;
        })}
      </div>
    </div>
  );
};

export default SongList;
