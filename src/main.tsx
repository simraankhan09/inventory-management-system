import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/auth-context.tsx";
import { BrowserRouter } from "react-router";
import { ApolloClientProvider } from "./context/apollo-client.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloClientProvider>
    <BrowserRouter>
      <AuthProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AuthProvider>
    </BrowserRouter>
  </ApolloClientProvider>
);
