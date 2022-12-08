import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../Context/AppContext";
import Alert from "../Components/Alert";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Alert />
      <Component {...pageProps} />
    </AppContext>
  );
}
