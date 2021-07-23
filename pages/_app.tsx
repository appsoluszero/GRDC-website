import "../styles/globals.scss";
import type { AppProps } from "next/app";
import GRCHeader from "../modules/header/GRCHeader";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <GRCHeader />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
