import * as React from "react";
import { BiLibrary, BiLogOut } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { TbPremiumRights } from "react-icons/tb";
import { AppSharedContext } from "../Context/AppContext";
import MenuItem from "./MenuItem";
import { defaultMusic } from "./Player/utils";

interface ISideMenuProps {}

const SideMenu: React.FunctionComponent<ISideMenuProps> = () => {
  const { userProvider, authProvider, musicProvider } =
    React.useContext(AppSharedContext);

  React.useEffect(() => {
    userProvider.verifyIsPremium();
  });

  return (
    <>
      <div className="flex min-h-screen bg-black">
        <div className="fixed top-24 left-3 flex-grow">
          <MenuItem Icon={HiHome} title="Início" />
          <MenuItem Icon={FiSearch} title="Buscar" />
          <MenuItem Icon={BiLibrary} title="Sua Biblioteca" />
          {userProvider.isPremium ? (
            <></>
          ) : authProvider.auth ? (
            <MenuItem
              Icon={TbPremiumRights}
              title="Virar Premium"
              onClick={userProvider.getPremium}
            />
          ) : (
            <></>
          )}
          {authProvider.auth ? (
            <MenuItem
              Icon={BiLogOut}
              title="Logout"
              onClick={() => {
                authProvider.signout();
                musicProvider.setCurrentMusic(defaultMusic);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
