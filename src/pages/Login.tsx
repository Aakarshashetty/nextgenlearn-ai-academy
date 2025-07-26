import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  UserCheck,
  Sparkles,
  GraduationCap,
  Target,
  Trophy
} from "lucide-react";
import { setAuthenticated, setLoading } from "@/store";
import heroImg from "@/assets/hero-dashboard.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    setIsLoading(true);
    dispatch(setLoading(true));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Set authenticated state
    dispatch(setAuthenticated(true));
    dispatch(setLoading(false));
    setIsLoading(false);

    // Navigate to dashboard
    navigate("/");
  };

  const handleRegularLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setLoading(true));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, accept any email/password
    if (email && password) {
      dispatch(setAuthenticated(true));
      dispatch(setLoading(false));
      setIsLoading(false);
      navigate("/");
    } else {
      dispatch(setLoading(false));
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setLoading(true));

    // Validate form
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      dispatch(setLoading(false));
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      dispatch(setLoading(false));
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      dispatch(setLoading(false));
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, create account and log in
    dispatch(setAuthenticated(true));
    dispatch(setLoading(false));
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-white"
    >
      <div className="w-full max-w-4xl bg-white/80 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
        {/* Branding/Illustration Side */}
        <div className="hidden md:flex flex-col justify-between items-center bg-gradient-to-br from-blue-600 to-purple-600 text-white p-10 w-1/2 relative">
          {/* Branding Content (no <img> tag) */}
          <div className="flex flex-col items-center w-full">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6 shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">NextGenLearn</h1>
            <p className="text-lg text-white/90 mb-8 text-center max-w-xs">AI-Powered E-Learning Platform for the Next Generation of Learners</p>
            <Separator className="bg-white/30 my-4" />
            <div className="grid grid-cols-1 gap-6 w-full mt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <span className="text-base font-medium">Personalized Learning</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <span className="text-base font-medium">Achievements</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-base font-medium">AI-Powered</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-white/60 mt-10">&copy; {new Date().getFullYear()} NextGenLearn</div>
        </div>

        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 bg-white/90">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? "Create your account" : "Welcome back!"}
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              {isSignUp
                ? "Sign up to start your personalized learning journey."
                : "Sign in to continue to your dashboard."}
            </p>
          </div>

          <Card className="shadow-none border-0 bg-transparent">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold">
                {isSignUp ? (
                  <>
                    <UserCheck className="h-5 w-5" />
                    Sign Up
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={isSignUp ? handleSignUp : handleRegularLogin} className="space-y-5">
                {isSignUp && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {isSignUp && (
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full py-3 text-base font-semibold rounded-xl shadow-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition disabled:opacity-60"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {isSignUp ? "Creating account..." : "Signing in..."}
                    </div>
                  ) : (
                    isSignUp ? "Create Account" : "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-3 text-base font-semibold rounded-xl border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      <User className="h-5 w-5" />
                      Sign in as Guest
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isSignUp ? "Already have an account? " : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setEmail("");
                      setPassword("");
                      setConfirmPassword("");
                      setFirstName("");
                      setLastName("");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium ml-1"
                  >
                    {isSignUp ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login; 