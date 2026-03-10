import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ViewportProvider } from "@/contexts/ViewportContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <ViewportProvider>
      <App />
    </ViewportProvider>
  </ThemeProvider>
);
