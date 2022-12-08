import Link from "next/link";
import Router from "next/router";
import * as React from "react";
import { AppSharedContext } from "../Context/AppContext";

interface IAppProps {}

const TopBar: React.FunctionComponent<IAppProps> = () => {
  const { authProvider, userProvider } = React.useContext(AppSharedContext);

  React.useEffect(() => {
    userProvider.getInfo();
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex-grow bg-black p-3">
      <div className="flex items-center justify-between">
        <img
          className="h-[40px] cursor-pointer"
          src="/logo.png"
          alt="algo"
          onClick={() => {
            Router.push("/");
          }}
        />
        <div className="flex gap-3">
          {authProvider.auth ? <Loged /> : <NotLoged />}
        </div>
      </div>
    </div>
  );
};

const Loged = () => {
  const { userProvider } = React.useContext(AppSharedContext);

  return <div className="text-white">Olá {userProvider.userData?.name}</div>;
};

const NotLoged = () => {
  return (
    <>
      <button className="rounded-full p-3 px-8 font-bold text-white opacity-70 duration-150 ease-out hover:scale-105 hover:opacity-100">
        <Link href={"/register"}>Inscrever-se</Link>
      </button>
      <button className="rounded-full bg-white p-3 px-8 font-bold duration-150 ease-out hover:scale-105 hover:bg-gray-300">
        <Link href={"/login"}>Entrar</Link>
      </button>
    </>
  );
};

export default TopBar;
