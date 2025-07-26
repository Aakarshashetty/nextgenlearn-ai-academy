import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Trophy, 
  Clock, 
  Target, 
  CheckCircle, 
  Play, 
  RotateCcw, 
  X, 
  AlertCircle,
  Timer,
  Star,
  Zap,
  BookOpen,
  Lightbulb,
  ChevronRight,
  Check,
  XCircle,
  PlayCircle,
  BarChart3,
  Calendar,
  TrendingUp,
  Award,
  Users,
  BookOpenCheck
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';

interface Challenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  timeEstimate: string;
  completed: boolean;
  score: number;
  description: string;
  instructions: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  maxTime: number; // in minutes
  acceptanceRate?: number;
  submissions?: number;
  likes?: number;
}

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

interface ChallengeSession {
  challengeId: string;
  startTime: Date;
  endTime?: Date;
  timeSpent: number; // in seconds
  attempts: number;
  code: string;
  testResults: TestResult[];
  score: number;
  maxTime: number; // in minutes
}

interface TestResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput?: string;
  error?: string;
}

const Practice = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [currentSession, setCurrentSession] = useState<ChallengeSession | null>(null);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const dispatch = useDispatch();

  const challenges: Challenge[] = [
    {
      id: "js-array-methods",
      title: "JavaScript Array Methods",
      difficulty: "Easy",
      category: "Programming",
      timeEstimate: "15 min",
      maxTime: 15,
      completed: false,
      score: 0,
      description: "Master array manipulation with map, filter, and reduce",
      instructions: "Write a function that takes an array of numbers and returns a new array with only the even numbers doubled.",
      starterCode: `function doubleEvenNumbers(numbers) {
  // Your code here
  return [];
}

// Example usage:
// doubleEvenNumbers([1, 2, 3, 4, 5, 6]) should return [4, 8, 12]
// doubleEvenNumbers([1, 3, 5]) should return []`,
      testCases: [
        {
          input: "[1, 2, 3, 4, 5, 6]",
          expectedOutput: "[4, 8, 12]",
          description: "Basic test with mixed numbers"
        },
        {
          input: "[1, 3, 5]",
          expectedOutput: "[]",
          description: "No even numbers"
        },
        {
          input: "[2, 4, 6, 8]",
          expectedOutput: "[4, 8, 12, 16]",
          description: "All even numbers"
        }
      ],
      hints: [
        "Use the filter() method to get even numbers",
        "Use the map() method to double each number",
        "Remember: even numbers have remainder 0 when divided by 2"
      ],
      solution: `function doubleEvenNumbers(numbers) {
  return numbers
    .filter(num => num % 2 === 0)
    .map(num => num * 2);
}`,
      acceptanceRate: 85,
      submissions: 1247,
      likes: 234
    },
    {
      id: "react-component",
      title: "React Component Design",
      difficulty: "Medium",
      category: "Web Development",
      timeEstimate: "30 min",
      maxTime: 30,
      completed: false,
      score: 0,
      description: "Build reusable components following best practices",
      instructions: "Create a React component called 'UserCard' that displays user information with proper TypeScript types.",
      starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  // Your component code here
  return (
    <div>
      {/* Implement your component */}
    </div>
  );
}`,
      testCases: [
        {
          input: "User with all fields",
          expectedOutput: "Rendered component with user info",
          description: "Component renders correctly with complete user data"
        },
        {
          input: "User without avatar",
          expectedOutput: "Component with default avatar",
          description: "Handles missing avatar gracefully"
        }
      ],
      hints: [
        "Use proper TypeScript interfaces",
        "Include default avatar when none provided",
        "Add proper event handlers for edit/delete"
      ],
      solution: `function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="user-card">
      <img 
        src={user.avatar || '/default-avatar.png'} 
        alt={user.name}
        className="avatar"
      />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="actions">
        {onEdit && (
          <button onClick={() => onEdit(user)}>Edit</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(user.id)}>Delete</button>
        )}
      </div>
    </div>
  );
}`,
      acceptanceRate: 72,
      submissions: 892,
      likes: 156
    },
    {
      id: "algorithm-optimization",
      title: "Algorithm Optimization",
      difficulty: "Hard",
      category: "Computer Science",
      timeEstimate: "45 min",
      maxTime: 45,
      completed: false,
      score: 0,
      description: "Optimize time and space complexity of algorithms",
      instructions: "Implement a function to find the longest common subsequence (LCS) between two strings with optimal time complexity.",
      starterCode: `function longestCommonSubsequence(text1, text2) {
  // Your optimized solution here
  // Time complexity should be O(m*n)
  // Space complexity should be O(m*n)
  return "";
}

// Example:
// longestCommonSubsequence("abcde", "ace") should return "ace"
// longestCommonSubsequence("abc", "def") should return ""`,
      testCases: [
        {
          input: '"abcde", "ace"',
          expectedOutput: '"ace"',
          description: "Basic LCS test"
        },
        {
          input: '"abc", "def"',
          expectedOutput: '""',
          description: "No common subsequence"
        },
        {
          input: '"abcba", "abcbcba"',
          expectedOutput: '"abcba"',
          description: "Complex LCS test"
        }
      ],
      hints: [
        "Use dynamic programming approach",
        "Create a 2D array to store intermediate results",
        "Fill the DP table bottom-up"
      ],
      solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Reconstruct the LCS
  let result = "";
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      result = text1[i - 1] + result;
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return result;
}`,
      acceptanceRate: 45,
      submissions: 567,
      likes: 89
    }
  ];

  const stats = [
    { 
      label: "Challenges Completed", 
      value: challenges.filter(c => c.completed).length.toString(), 
      icon: CheckCircle, 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      label: "Average Score", 
      value: challenges.filter(c => c.completed).length > 0 
        ? Math.round(challenges.filter(c => c.completed).reduce((sum, c) => sum + c.score, 0) / challenges.filter(c => c.completed).length) + "%"
        : "0%", 
      icon: Trophy, 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    { 
      label: "Time Spent", 
      value: "8h", 
      icon: Clock, 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      label: "Current Streak", 
      value: "5 days", 
      icon: Target, 
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const handleTimeUp = () => {
    if (currentSession) {
      const finalSession = {
        ...currentSession,
        endTime: new Date(),
        timeSpent: currentSession.maxTime * 60 - timeRemaining
      };
      setCurrentSession(finalSession);
      setIsResultsModalOpen(true);
    }
  };

  const startChallenge = useCallback((challenge: Challenge) => {
    setActiveChallenge(challenge);
    setUserCode(challenge.starterCode);
    setTimeRemaining(challenge.maxTime * 60);
    setIsTimerRunning(true);
    setCurrentHintIndex(0);
    setShowSolution(false);
    setTestResults([]);
    setActiveTab("description");
    
    const session: ChallengeSession = {
      challengeId: challenge.id,
      startTime: new Date(),
      attempts: 0,
      code: challenge.starterCode,
      testResults: [],
      score: 0,
      timeSpent: 0,
      maxTime: challenge.maxTime
    };
    setCurrentSession(session);
    setIsChallengeModalOpen(true);
  }, []);

  const retryChallenge = useCallback((challenge: Challenge) => {
    startChallenge(challenge);
  }, [startChallenge]);

  const runTests = () => {
    if (!activeChallenge || !currentSession) return;

    const results: TestResult[] = [];
    let passedTests = 0;

    try {
      // Create a safe evaluation environment
      const evalCode = `
        ${userCode}
        // Test cases
        ${activeChallenge.testCases.map((testCase, index) => {
          try {
            // For JavaScript challenges, evaluate the function
            if (activeChallenge.category === "Programming") {
              const funcMatch = userCode.match(/function\s+(\w+)/);
              if (funcMatch) {
                const funcName = funcMatch[1];
                const result = eval(`${userCode}; ${funcName}(${testCase.input})`);
                const expected = eval(testCase.expectedOutput);
                const passed = JSON.stringify(result) === JSON.stringify(expected);
                if (passed) passedTests++;
                return { testCase, passed, actualOutput: JSON.stringify(result) };
              }
            }
            return { testCase, passed: false, error: "Function not found" };
          } catch (error) {
            return { testCase, passed: false, error: error.message };
          }
        }).join('\n')}
      `;

      // For now, simulate test results
      activeChallenge.testCases.forEach((testCase, index) => {
        const passed = Math.random() > 0.3; // Simulate 70% pass rate
        if (passed) passedTests++;
        results.push({
          testCase,
          passed,
          actualOutput: passed ? testCase.expectedOutput : "Incorrect output"
        });
      });

    } catch (error) {
      activeChallenge.testCases.forEach(testCase => {
        results.push({
          testCase,
          passed: false,
          error: error.message
        });
      });
    }

    setTestResults(results);
    
    // Update session
    const score = Math.round((passedTests / activeChallenge.testCases.length) * 100);
    setCurrentSession(prev => prev ? {
      ...prev,
      attempts: prev.attempts + 1,
      code: userCode,
      testResults: results,
      score: Math.max(prev.score, score)
    } : null);

    return { passedTests, totalTests: activeChallenge.testCases.length, score };
  };

  const submitChallenge = () => {
    const testResults = runTests();
    if (testResults && activeChallenge) {
      const finalSession = {
        ...currentSession!,
        endTime: new Date(),
        timeSpent: activeChallenge.maxTime * 60 - timeRemaining,
        score: testResults.score
      };
      setCurrentSession(finalSession);
      setIsTimerRunning(false);
      setIsResultsModalOpen(true);
    }
  };

  const closeChallenge = () => {
    setIsChallengeModalOpen(false);
    setActiveChallenge(null);
    setCurrentSession(null);
    setUserCode("");
    setTimeRemaining(0);
    setIsTimerRunning(false);
    setTestResults([]);
    setCurrentHintIndex(0);
    setShowSolution(false);
  };

  const showNextHint = () => {
    if (activeChallenge && currentHintIndex < activeChallenge.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "🟢";
      case "Medium": return "🟡";
      case "Hard": return "🔴";
      default: return "⚪";
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex h-full w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 h-full overflow-y-auto">
          <Header />
          
          <main className="container mx-auto px-6 py-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Practice Hub
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    Sharpen your skills with hands-on challenges and exercises
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending Challenges</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                          <IconComponent className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Challenges Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Challenges</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BookOpenCheck className="h-4 w-4" />
                  <span>{challenges.length} challenges available</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Challenge Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                {challenge.title}
                              </h3>
                              {challenge.completed && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{challenge.description}</p>
                          </div>
                        </div>

                        {/* Challenge Meta */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge 
                              className={`text-xs font-medium px-2 py-1 ${getDifficultyColor(challenge.difficulty)}`}
                            >
                              {getDifficultyIcon(challenge.difficulty)} {challenge.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">{challenge.category}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {challenge.timeEstimate}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {challenge.submissions?.toLocaleString() || "0"} submissions
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              {challenge.acceptanceRate}% acceptance
                            </div>
                          </div>

                          {challenge.completed && (
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                              <span className="text-sm font-medium text-green-700">Completed</span>
                              <span className="text-sm text-green-600">Score: {challenge.score}%</span>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <Button 
                          className={`w-full ${
                            challenge.completed 
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300" 
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          onClick={() => challenge.completed ? retryChallenge(challenge) : startChallenge(challenge)}
                        >
                          {challenge.completed ? (
                            <>
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Retry Challenge
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Start Challenge
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Challenge Modal - LeetCode Style */}
      <Dialog open={isChallengeModalOpen} onOpenChange={setIsChallengeModalOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 overflow-hidden">
          {activeChallenge && (
            <div className="flex h-full">
              {/* Left Panel - Problem Description */}
              <div className="w-1/2 border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-900">{activeChallenge.title}</h2>
                      <Badge className={getDifficultyColor(activeChallenge.difficulty)}>
                        {getDifficultyIcon(activeChallenge.difficulty)} {activeChallenge.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Timer className="h-4 w-4" />
                        <span className="font-mono">{formatTime(timeRemaining)}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={closeChallenge}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {activeChallenge.submissions?.toLocaleString() || "0"} submissions
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {activeChallenge.acceptanceRate}% acceptance
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {activeChallenge.likes} likes
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="examples">Examples</TabsTrigger>
                      <TabsTrigger value="hints">Hints</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="space-y-4">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 leading-relaxed">{activeChallenge.instructions}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="examples" className="space-y-4">
                      <div className="space-y-4">
                        {activeChallenge.testCases.map((testCase, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Example {index + 1}:</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Input:</span>
                                <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-gray-800">
                                  {testCase.input}
                                </code>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Output:</span>
                                <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-gray-800">
                                  {testCase.expectedOutput}
                                </code>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Explanation:</span>
                                <span className="ml-2 text-gray-600">{testCase.description}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="hints" className="space-y-4">
                      <div className="space-y-3">
                        {activeChallenge.hints.map((hint, index) => (
                          <div key={index} className={`p-3 rounded-lg border ${
                            index <= currentHintIndex 
                              ? "bg-blue-50 border-blue-200" 
                              : "bg-gray-50 border-gray-200"
                          }`}>
                            <div className="flex items-start gap-2">
                              <Lightbulb className={`h-4 w-4 mt-0.5 ${
                                index <= currentHintIndex ? "text-blue-600" : "text-gray-400"
                              }`} />
                              <div>
                                <span className="text-sm font-medium text-gray-700">Hint {index + 1}:</span>
                                <p className={`text-sm mt-1 ${
                                  index <= currentHintIndex ? "text-gray-700" : "text-gray-500"
                                }`}>
                                  {index <= currentHintIndex ? hint : "Click 'Show Next Hint' to reveal"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {currentHintIndex < activeChallenge.hints.length - 1 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={showNextHint}
                            className="w-full"
                          >
                            Show Next Hint
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Right Panel - Code Editor */}
              <div className="w-1/2 flex flex-col bg-gray-900">
                <div className="p-4 border-b border-gray-700 bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-gray-300" />
                      <span className="text-sm font-medium text-gray-300">Code Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowSolution(!showSolution)}
                        className="text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        {showSolution ? "Hide" : "Show"} Solution
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex-1 p-4">
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px] bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 resize-none"
                      placeholder="Write your code here..."
                    />
                  </div>

                  <div className="p-4 border-t border-gray-700 bg-gray-800">
                    <div className="flex items-center gap-2">
                      <Button onClick={runTests} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Target className="h-4 w-4 mr-2" />
                        Run Tests
                      </Button>
                      <Button onClick={submitChallenge} className="flex-1 bg-green-600 hover:bg-green-700">
                        <Zap className="h-4 w-4 mr-2" />
                        Submit Solution
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Solution Panel */}
                {showSolution && (
                  <div className="border-t border-gray-700 bg-gray-800 p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Solution:</h4>
                    <pre className="text-sm font-mono text-gray-100 bg-gray-900 p-3 rounded overflow-x-auto">
                      {activeChallenge.solution}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Results Modal */}
      <Dialog open={isResultsModalOpen} onOpenChange={setIsResultsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Challenge Results</DialogTitle>
          </DialogHeader>
          {currentSession && (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`text-5xl font-bold mb-2 ${
                  currentSession.score >= 80 ? "text-green-600" :
                  currentSession.score >= 60 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {currentSession.score}%
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {currentSession.score >= 80 ? "🎉 Excellent! Well done!" : 
                   currentSession.score >= 60 ? "👍 Good job! Keep practicing!" : 
                   "💪 Keep practicing! You'll get better!"}
                </div>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time Spent:</span>
                  <span className="font-medium">{formatTime(currentSession.timeSpent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Attempts:</span>
                  <span className="font-medium">{currentSession.attempts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tests Passed:</span>
                  <span className="font-medium">{testResults.filter(t => t.passed).length}/{testResults.length}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setIsResultsModalOpen(false);
                    closeChallenge();
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsResultsModalOpen(false);
                    retryChallenge(activeChallenge!);
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Practice;