import Router from "next/router";
import * as React from "react";
import { AppSharedContext } from "../Context/AppContext";
import { Player } from "./Player/Player";

interface IFixedFooterProps {}

const FixedFooter: React.FunctionComponent<IFixedFooterProps> = (props) => {
  const { authProvider, userProvider } = React.useContext(AppSharedContext);

  if (authProvider.auth) {
    if (!userProvider.isPremium) {
      return (
        <FootBanner
          buttonName="Tornar-se Premium"
          onClick={() => {
            userProvider.getPremium()
          }}
        />
      );
    }
    return <Player />;
  }
  return (
    <FootBanner
      buttonName="Inscreva-se grátis"
      onClick={() => Router.push("/login")}
    />
  );
};

type FootBannerType = {
  buttonName: string;
  onClick: () => void;
};

function FootBanner({ buttonName, onClick }: FootBannerType) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex-grow bg-gradient-to-r from-pink-500 to-indigo-300 p-3 pl-8">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col items-start">
          <div className="text-sm text-white">AMOSTRA DO SPOTIFY</div>
          <div className="font-semibold text-white">
            Inscreva-se para curtir música ilimitada e podcasts só com alguns
            anúncios. Não precisa de cartão de crédito.
          </div>
        </div>
        <button
          className="rounded-full bg-white p-3 px-8 font-bold duration-150 ease-out hover:scale-105 hover:bg-gray-300"
          onClick={onClick}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
}

export default FixedFooter;
