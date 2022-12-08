import { useState } from "react";
import { CurrentMusicType, PlayerProps } from "../../Components/Player/types";
import { defaultMusic } from "../../Components/Player/utils";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IMusicContextType, IPlayMusic } from "./interfaces";

export function MusicProvider(): IMusicContextType {
  const [current, setCurrent] = useState<CurrentMusicType>(defaultMusic);
  const [musics, setMusics] = useState<PlayerProps[]>([]);
  const baseURL = process.env.API_URL;

  const setCurrentMusic = (val: Partial<CurrentMusicType>, replace = false) => {
    try {
      if (replace && val.src !== current.src) {
        setCurrent(val as CurrentMusicType);
      } else {
        setCurrent((prev) => ({ ...prev, ...val }));
      }
    } catch (error) {}
  };

  const playMusic = (music_id: string) => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    axios
      .get(`${baseURL}/music/play`, {
        params: { user_id, music_id },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data: IPlayMusic = res.data;
        const music: CurrentMusicType = {
          id: 0,
          title: data.data.name,
          src: data.data.song_data.link,
          artist: data.data.authors.map((author) => author.name).join(" & "),
          thumbnail: data.data.img_data.link,
        };
        setCurrentMusic(music, true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        if (error.response?.data) {
          const errorResponse = error.response.data as {
            isAllowed: boolean;
            error: any;
          };
          if (!errorResponse.isAllowed) toast("You can't play this music");
        }
      });
  };

  const getPlaylistByName = () => {};

  const getPlaylistById = () => {};

  const getCollection = () => {};

  return {
    playList: musics,
    currentMusic: current,
    setCurrentMusic,
    playMusic,
  };
}
