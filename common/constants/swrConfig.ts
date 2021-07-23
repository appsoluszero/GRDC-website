import type { SWRConfiguration } from "swr";
import { testDatabase } from "./testDatabase";

export const swrConfig: SWRConfiguration = {
  fetcher: async (url: string) => {
    // testing code
    const data = testDatabase[url];
    if (data !== null && data !== undefined) {
      
      /*
      // delay from 1000 ms, simulate server delay
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });*/

      return data;
    } else {
      throw `Invaild URL: ${url}`;
    }
  },
};
