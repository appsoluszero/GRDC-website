import "../styles/globals.scss";
import type { AppProps } from "next/app";
import GRCHeader from "../modules/header/GRCHeader";
import { Provider } from "next-auth/client";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";
import { sessionSetting } from "../common/constants/session_setting";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: sessionSetting.clientMaxAge,
        keepAlive: sessionSetting.keepAlive,
      }}
    >
      <GRCHeader />
      <Component {...pageProps} />
    </Provider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    // during SSR rendering
    if (typeof window === "undefined") {
      return {
        url: "/api/trpc",
      };
    }

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  ssr: true,
})(MyApp);
