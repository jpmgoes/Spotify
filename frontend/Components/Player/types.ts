export type PlayerProps = {
  id: number;
  title: string;
  src: string;
  artist?: string;
  thumbnail?: string;
};

export interface CurrentMusicType extends PlayerProps {
  duration?: number;
  curTime?: number;
  isPlaying?: boolean;
}
