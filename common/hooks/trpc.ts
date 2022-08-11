import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../Pages/api/trpc/[trpc]";

export const trpc = createReactQueryHooks<AppRouter>();
