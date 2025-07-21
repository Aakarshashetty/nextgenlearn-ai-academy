import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import AITutor from "./pages/AITutor";
import Sessions from "./pages/Sessions";
import Explore from "./pages/Explore";
import Practice from "./pages/Practice";
import Resources from "./pages/Resources";
import Discussion from "./pages/Discussion";
import Groups from "./pages/Groups";
import Achievements from "./pages/Achievements";
import Progress from "./pages/Progress";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
