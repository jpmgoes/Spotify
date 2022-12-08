import { CurrentMusicType, PlayerProps } from "../../Components/Player/types";

export interface IMusicContextType {
  currentMusic: CurrentMusicType;
  setCurrentMusic: (cm: Partial<CurrentMusicType>, replace?: boolean) => void;
  playList: PlayerProps[];
  playMusic: (id: string) => void;
}

export interface IPlayMusic {
  isAllowed: boolean;
  data: IPlayMusicData;
}

interface IAuthor {
  id: string;
  name: string;
}

interface IMusicMetaData {
  id: string;
  link: string;
}

interface IPlayMusicData {
  id: string;
  name: string;
  img_data: IMusicMetaData;
  song_data: IMusicMetaData;
  authors: IAuthor[];
}
