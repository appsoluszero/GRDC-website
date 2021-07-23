import "../styles/globals.scss";
import type { AppProps } from "next/app";
import GRCHeader from "../modules/header/GRCHeader";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import { swrConfig } from "../common/constants/swrConfig";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={swrConfig}>
      <Provider session={pageProps.session}>
        <GRCHeader />
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}
export default MyApp;
