import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Index from "./pages/Index";
import Login from "./pages/Login";
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
import CourseDetail from "./pages/CourseDetail";
import AuthWrapper from "./components/auth/AuthWrapper";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <AuthWrapper>
                  <Index />
                </AuthWrapper>
              } />
              <Route path="/courses" element={
                <AuthWrapper>
                  <Courses />
                </AuthWrapper>
              } />
              <Route path="/courses/:title" element={
                <AuthWrapper>
                  <CourseDetail />
                </AuthWrapper>
              } />
              <Route path="/sessions" element={
                <AuthWrapper>
                  <Sessions />
                </AuthWrapper>
              } />
              <Route path="/explore" element={
                <AuthWrapper>
                  <Explore />
                </AuthWrapper>
              } />
              <Route path="/ai-tutor" element={
                <AuthWrapper>
                  <AITutor />
                </AuthWrapper>
              } />
              <Route path="/practice" element={
                <AuthWrapper>
                  <Practice />
                </AuthWrapper>
              } />
              <Route path="/resources" element={
                <AuthWrapper>
                  <Resources />
                </AuthWrapper>
              } />
              <Route path="/discussion" element={
                <AuthWrapper>
                  <Discussion />
                </AuthWrapper>
              } />
              <Route path="/groups" element={
                <AuthWrapper>
                  <Groups />
                </AuthWrapper>
              } />
              <Route path="/achievements" element={
                <AuthWrapper>
                  <Achievements />
                </AuthWrapper>
              } />
              <Route path="/progress" element={
                <AuthWrapper>
                  <Progress />
                </AuthWrapper>
              } />
              <Route path="/performance" element={
                <AuthWrapper>
                  <Performance />
                </AuthWrapper>
              } />
              <Route path="/settings" element={
                <AuthWrapper>
                  <Settings />
                </AuthWrapper>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
