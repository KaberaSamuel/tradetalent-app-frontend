import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "@/features/routing/AppRouter";
import "@/index.css";
import { store } from "@/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
