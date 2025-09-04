"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { newQueryClient } from "@/lib/queryClient";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={newQueryClient()}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
