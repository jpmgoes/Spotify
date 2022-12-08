import * as React from "react";
import { BiPlay } from "react-icons/bi";
import { Animations } from "../Animations/Animations";
import { AppSharedContext } from "../Context/AppContext";
import { ISong } from "./HomeContent";

export interface IPosition {
  x: Number;
  y: Number;
}

interface ISongCardProps {
  Position: IPosition;
  musicData: ISong;
}

const SongCard: React.FunctionComponent<ISongCardProps> = ({
  Position,
  musicData,
}) => {
  const { x, y } = Position;
  const { musicProvider } = React.useContext(AppSharedContext);

  React.useEffect(() => {
    Animations.songCardPlayer(Position);
  });

  return (
    <div
      className={`song-card-${x}-${y} flex w-52 min-w-[160px] cursor-pointer flex-col justify-between gap-2 rounded bg-zinc-900 p-4 duration-300 ease-out hover:bg-zinc-800`}
      onClick={() => {
        musicProvider.playMusic(musicData.id);
      }}
    >
      <Banner src={musicData.img_data} />
      <Player x={x} y={y} />

      <div className="pt-3 font-bold">{musicData.name}</div>
      <div className="text-sm font-semibold text-gray-400">
        {musicData.authors.map((author) => author.name).join(" & ")}
      </div>
    </div>
  );
};

const Player = ({ x, y }: IPosition) => {
  return (
    <>
      <div
        className={`player-div-${x}-${y} z-10 mx-2 -mt-16 self-end rounded-full bg-green-500 text-center opacity-0 shadow-xl duration-200 ease-in hover:scale-105 hover:bg-green-400`}
      >
        <BiPlay className="h-12 w-12 p-1 pl-2 text-black" />
      </div>
    </>
  );
};

const Banner = ({ src }: { src: string }) => {
  return <img className="rounded drop-shadow-2xl" src={src} alt="capa" />;
};

export default SongCard;
