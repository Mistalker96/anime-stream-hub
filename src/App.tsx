import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewportWrapper from "@/components/ViewportWrapper";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AnimeDetail from "./pages/AnimeDetail";
import Watch from "./pages/Watch";
import MyList from "./pages/MyList";
import Browse from "./pages/Browse";
import ProfileSettings from "./pages/ProfileSettings";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ViewportWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ViewportWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
