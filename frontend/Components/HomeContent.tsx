import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import BaseBackground from "./BaseBackground";
import SideMenu from "./SideMenu";
import SongList from "./SongList";

interface IHomeContentProps {}

export interface IPlaylistData {
  id: string;
  name: string;
  songs: ISong[];
}

export interface ISong {
  id: string;
  name: string;
  img_data: string;
  authors: IAuthor[];
}

export interface IAuthor {
  name: string
}

const HomeContent: React.FunctionComponent<IHomeContentProps> = () => {
  const [playlistsData, setPlaylistsData] = React.useState<IPlaylistData[]>([]);

  React.useEffect(() => {
    const homePageCollectionId = process.env.PUBLIC_ID_COLLECTION;
    axios
      .get(process.env.API_URL + "/collection/page/home", {
        params: {
          collection_id: homePageCollectionId,
          realdata: true,
        },
      })
      .then((res: AxiosResponse) => {
        const playlists: IPlaylistData[] = [];
        res.data.playlist.map((playlist: any) => {
          playlist.id;
          playlist.name;
          playlists.push({
            id: playlist.id,
            name: playlist.name,
            songs: playlist.songs.map((song: any) => {
              return {
                id: song.id,
                img_data: song.img_data.link,
                name: song.name,
                authors: song.authors
              };
            }),
          });
        });
        if (playlistsData.length === 0) setPlaylistsData(playlists);
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
      });
  });

  return (
    <div className="grid auto-cols-auto grid-cols-sidbar">
      <SideMenu />
      <BaseBackground>
        {playlistsData.map((playlistData, index) => {
          return (
            <SongList key={index} cardYPosition={index} data={playlistData} />
          );
        })}
      </BaseBackground>
    </div>
  );
};

export default HomeContent;
