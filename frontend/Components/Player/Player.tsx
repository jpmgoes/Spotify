import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useRef, useState } from "react";
import {
  TbArrowsShuffle2,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbVolume,
  TbVolume3,
} from "react-icons/tb";
import { AppSharedContext } from "../../Context/AppContext";
import { DefaultThumbnail } from "./DefaultThumbnail";
import { secondsToMinutes } from "./utils";

export const Player = () => {
  const [isRandom, setIsRandom] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const { musicProvider } = React.useContext(AppSharedContext);
  const { currentMusic, setCurrentMusic, playList } = musicProvider;

  //volume can be a local state
  const [volume, setVolume] = useState(100);

  //   close volume on click outside
  const volumeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeVolume = (e: any) => {
      if (!volumeRef.current?.contains(e.target)) setIsVolumeOpen(false);
    };
    document.addEventListener("click", closeVolume, true);
    return () => {
      document.removeEventListener("click", closeVolume, true);
    };
  }, []);

  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    audioRef.current = new Audio(currentMusic.src);

    // volume changer
    audioRef.current.addEventListener("volumechange", (e: any) => {
      setVolume(+e.target.volume);
    });

    // play and pause
    audioRef.current.addEventListener("play", () => {
      setCurrentMusic({ isPlaying: true });
    });
    audioRef.current.addEventListener("pause", () => {
      setCurrentMusic({ isPlaying: false });
    });

    // got to the next music when current one finished
    audioRef.current.addEventListener("ended", (e: any) => {
      skipNext(new URL(e.target.src).pathname);
    });

    //lets trigger when audio is ready
    audioRef.current.addEventListener("canplay", () => {
      audioRef.current?.play();
    });

    // time and duration
    audioRef.current.addEventListener("loadedmetadata", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime,
        duration: e.target.duration,
      });
    });
    audioRef.current.addEventListener("timeupdate", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime,
      });
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [currentMusic.src]);

  const skipNext = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    // if we are in last music
    if (idx === playList.length - 1) {
      // go to first one
      setCurrentMusic(playList[0], true);
    } else {
      setCurrentMusic(playList[idx + 1], true);
    }
  };

  const skipPrev = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    if (idx === 0) {
      setCurrentMusic(playList[playList.length - 1]);
    } else {
      setCurrentMusic(playList[idx - 1]);
    }
  };

  const skipRandom = (idx: number) => {
    const randIdx = Math.floor(Math.random() * playList.length);
    if (randIdx === idx) {
      skipRandom(idx);
    } else {
      setCurrentMusic(playList[randIdx]);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 w-screen z-30">
      <div className="bg-neutral-800 py-3 text-white shadow-lg shadow-green-50 backdrop-blur-xl">
        <div className="container mx-auto flex justify-between px-3 lg:px-0">
          {/* title and thumbnail */}
          <div className="flex items-center gap-2 px-3 lg:w-3/12">
            <div className="h-14 w-14 lg:flex-shrink-0">
              {currentMusic.thumbnail ? (
                <img
                  src={currentMusic.thumbnail}
                  alt={currentMusic.title}
                  className="rounded-lg"
                />
              ) : (
                <DefaultThumbnail />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="text-sm font-semibold">{currentMusic.title}</h6>
              <span className="text-xs text-gray-400">
                {currentMusic.artist}
              </span>
            </div>
          </div>
          {/* play/pause and next/prev icons */}
          <div className="flex items-center justify-center gap-3 lg:w-2/12 pr-16">
            <button onClick={() => skipPrev(currentMusic.src)}>
              <TbPlayerSkipBack size={20} />
            </button>
            <button
              onClick={() => {
                if (currentMusic.isPlaying) {
                  audioRef.current?.pause();
                } else {
                  audioRef.current?.play();
                }
              }}
              className="rounded-full border border-white p-1 bg-white"
            >
              {currentMusic.isPlaying ? (
                <TbPlayerPause size={26} color="white" fill="black" stroke="1"/>
              ) : (
                <TbPlayerPlay size={26} color="white" fill="black" stroke="1"/>
              )}
            </button>
            <button onClick={() => skipNext(currentMusic.src)}>
              <TbPlayerSkipForward size={20} />
            </button>
          </div>
          {/* progress */}
          <div className="w-6/12 flex-col justify-center gap-1 lg:flex pr-16">
            <Slider
              trackStyle={{ background: "rgb(22, 163, 74)" }}
              handleStyle={{
                border: "2px solid rgb(255, 255, 255)",
                background: "rgb(255, 255, 255)",
                boxShadow: "none",
                opacity: 1,
              }}
              min={0}
              max={currentMusic.duration}
              value={currentMusic.curTime}
              onChange={(val) => {
                audioRef.current!.currentTime = +val;
              }}
            />
            <div className="flex justify-between text-xs">
              <span>{secondsToMinutes(currentMusic.curTime)}</span>
              <span>{secondsToMinutes(currentMusic.duration)}</span>
            </div>
          </div>
          {/* settings */}
          <div className="flex justify-end gap-3 pr-14 lg:w-1/12">
            <div className="relative flex h-full items-center" ref={volumeRef}>
              {isVolumeOpen && (
                <div className="absolute -top-1/2 left-1/2 flex h-20 w-8 -translate-y-1/2 -translate-x-1/2 justify-center overflow-hidden rounded-2xl bg-neutral-100 py-4 shadow-lg">
                  <Slider
                    vertical
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(val) => {
                      audioRef.current!.volume = +val;
                    }}
                  />
                </div>
              )}
              <button onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
                {volume === 0 ? (
                  <TbVolume3 size={20} />
                ) : (
                  <TbVolume size={20} />
                )}
              </button>
            </div>
            <button onClick={() => setIsRandom(!isRandom)}>
              <TbArrowsShuffle2
                size={20}
                color={isRandom ? "rgb(126 34 206)" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
