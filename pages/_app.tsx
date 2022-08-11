import "../styles/globals.scss";
import type { AppProps } from "next/app";
import superjson from "superjson";
import GRCHeader from "../modules/header/GRCHeader";
import { SessionProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../Pages/api/trpc/[trpc]";
import { sessionSetting } from "../common/constants/session_setting";

import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
dayjs.extend(calendar);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={sessionSetting.refetchInterval}
    >
      <GRCHeader />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    // during SSR rendering
    /*
    if (typeof window === "undefined") {
      return {
        url: "/api/trpc",
      };
    }*/

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      transformer: superjson,
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
