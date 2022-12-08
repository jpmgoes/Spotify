import React from "react";
import { AuthProvider, IAuthContextType } from "./Providers/AuthProvider";
import { IMusicContextType } from "./Providers/interfaces";
import { MusicProvider } from "./Providers/MusicProvider";
import { IUserProviderType, UserProvider } from "./Providers/UserProvider";

const AppSharedContext = React.createContext<IAppContextType>(null!);

interface IAppContextType {
  authProvider: IAuthContextType;
  musicProvider: IMusicContextType;
  userProvider: IUserProviderType
}

interface IAppContextProps {
  children?: JSX.Element | JSX.Element[];
}

const AppContext = ({ children }: IAppContextProps) => {
  const authProvider: IAuthContextType = AuthProvider();
  const musicProvider: IMusicContextType = MusicProvider();
  const userProvider: IUserProviderType = UserProvider();

  return (
    <AppSharedContext.Provider value={{ authProvider, musicProvider, userProvider }}>
      {children}
    </AppSharedContext.Provider>
  );
};

export { AppSharedContext, AppContext };
