import "../styles/globals.scss";
import type { AppProps } from "next/app";
import GRCHeader from "../modules/header/GRCHeader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GRCHeader />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
