import * as React from "react";
import { AppSharedContext } from "../../Context/AppContext";
import { Player } from "../Player/Player";

interface IZonaDeTesteProps {}

const ZonaDeTeste: React.FunctionComponent<IZonaDeTesteProps> = (props) => {
  // const audioRef = React.useRef<HTMLAudioElement>(null!);

  // const updateSong = (source: string) => {
  // songProvider.setSongLink(source);
  // if (audioRef.current) {
  //   audioRef.current.pause();
  //   audioRef.current.load();
  //   audioRef.current.play();
  // }
  // };

  // React.useEffect(() => {
  //   updateSong(songProvider.songLink);
  // }, [songProvider.songLink]);

  const { musicProvider } = React.useContext(AppSharedContext);
  React.useEffect(() => {}, [musicProvider.currentMusic]);

  return (
    <>
      {/* <audio
        controls
        ref={audioRef}
        className="min-w-full rounded-none bg-black"
      >
        <source src={"songProvider.songLink"} type="audio/mpeg" />
      </audio> */}

      <button
        onClick={() => {
          musicProvider.playMusic("6382acb390043128b77498ee");
          console.log(musicProvider.currentMusic)
        }}
      >
        adsf
      </button>
      
      <Player />
    </>
  );
};

export default ZonaDeTeste;
