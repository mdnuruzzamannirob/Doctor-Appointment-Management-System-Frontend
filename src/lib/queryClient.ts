'use client';
import { QueryClient } from "@tanstack/react-query";

export const makeQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60_000
    }
  }
});
