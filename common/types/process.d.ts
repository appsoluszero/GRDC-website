declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      DATABASE_URL: string;
      SECRET: string;
    }
  }
}

export {};
