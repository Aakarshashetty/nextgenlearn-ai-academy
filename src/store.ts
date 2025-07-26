import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface Course {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  videoUrl: string;
  nextLesson: string;
  enrolled: boolean;
}

interface ScheduledSession {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  course: string;
  notes: string;
  createdAt: string;
  completed: boolean;
}

interface LessonCompletion {
  [courseTitle: string]: {
    [lessonIndex: number]: boolean;
  };
}

interface ResourceFavorites {
  [courseTitle: string]: string[]; // array of resource names
}

interface SidebarBadgeCounts {
  enrolledCourses: number;
  unreadMessages: number;
  liveSessions: number;
}

interface UserCoursesState {
  enrolled: Course[];
  lessonCompletion: LessonCompletion;
  resourceFavorites: ResourceFavorites;
  sidebarBadgeCounts: SidebarBadgeCounts;
}

interface ScheduledSessionsState {
  sessions: ScheduledSession[];
}

// User Profile Interface
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  timezone: string;
  language: string;
  avatar: string;
  joinDate: string;
  lastActive: string;
  username: string;
  isVerified: boolean;
  role: 'student' | 'instructor' | 'admin';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalXP: number;
  currentLevel: number;
  globalRank: number;
}

// Notification Settings Interface
interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  courseUpdates: boolean;
  achievements: boolean;
  discussions: boolean;
  marketing: boolean;
  studyReminders: boolean;
  liveSessions: boolean;
  groupInvites: boolean;
}

// Privacy Settings Interface
interface PrivacySettings {
  profileVisible: boolean;
  progressVisible: boolean;
  achievementsVisible: boolean;
  emailVisible: boolean;
  locationVisible: boolean;
  activityVisible: boolean;
  searchable: boolean;
}

// Security Settings Interface
interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
  passwordLastChanged: string;
  lastLogin: string;
  activeSessions: number;
}

// Appearance Settings Interface
interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  soundEnabled: boolean;
  autoSave: boolean;
}

// Achievement Interface
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  points: number;
  isEarned: boolean;
  earnedDate?: string;
  totalSteps: number;
  currentSteps: number;
  timeToEarn: string;
  requirements: string[];
}

// Study Group Interface
interface StudyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  maxMembers: number;
  currentMembers: number;
  isPrivate: boolean;
  tags: string[];
  organizer: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  isJoined: boolean;
  members: Array<{
    id: string;
    name: string;
    avatar: string;
    role: 'organizer' | 'moderator' | 'member';
    isOnline: boolean;
    reputation: number;
    joinedDate: string;
  }>;
  nextMeeting?: {
    id: string;
    title: string;
    date: string;
    time: string;
    duration: string;
    attendees: number;
    maxAttendees: number;
  };
  meetingHistory: Array<{
    id: string;
    title: string;
    date: string;
    duration: string;
    attendees: number;
  }>;
  resources: Array<{
    id: string;
    name: string;
    type: 'pdf' | 'video' | 'link' | 'document';
    url: string;
    size: string;
  }>;
  stats: {
    totalMeetings: number;
    avgAttendance: number;
    completionRate: number;
  };
}

// User State Interface
interface UserState {
  profile: UserProfile;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  security: SecuritySettings;
  appearance: AppearanceSettings;
  achievements: Achievement[];
  studyGroups: StudyGroup[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserCoursesState = {
  enrolled: [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      duration: "65h 30m",
      students: 15420,
      rating: 4.9,
      progress: 75,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=center",
      level: "Beginner",
      category: "Web Development",
      videoUrl: "https://www.youtube.com/embed/ZxKM3DCV2kE",
      nextLesson: "HTML & CSS Basics",
      enrolled: true,
    },
    {
      title: "Advanced React and Redux",
      instructor: "Stephen Grider",
      duration: "47h 15m",
      students: 8932,
      rating: 4.8,
      progress: 45,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop&crop=center",
      level: "Advanced",
      category: "Frontend",
      videoUrl: "https://www.youtube.com/embed/9D1x7-2FmTA",
      nextLesson: "Redux Middleware",
      enrolled: true,
    }
  ],
  lessonCompletion: {},
  resourceFavorites: {},
  sidebarBadgeCounts: {
    enrolledCourses: 0,
    unreadMessages: 0,
    liveSessions: 0,
  },
};

const scheduledSessionsInitialState: ScheduledSessionsState = {
  sessions: [],
};

// User State Initial State
const userInitialState: UserState = {
  profile: {
    id: "user_001",
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate learner focused on web development and data science. Always eager to explore new technologies and share knowledge with the community.",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    language: "English",
    avatar: "",
    joinDate: "2024-01-15",
    lastActive: "2024-02-14",
    username: "alexchen",
    isVerified: true,
    role: "student",
    level: "Intermediate",
    totalXP: 1250,
    currentLevel: 8,
    globalRank: 1247,
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    courseUpdates: true,
    achievements: true,
    discussions: false,
    marketing: false,
    studyReminders: true,
    liveSessions: true,
    groupInvites: true,
  },
  privacy: {
    profileVisible: true,
    progressVisible: false,
    achievementsVisible: true,
    emailVisible: false,
    locationVisible: false,
    activityVisible: true,
    searchable: true,
  },
  security: {
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30,
    passwordLastChanged: "2024-01-20",
    lastLogin: "2024-02-14 10:30 AM",
    activeSessions: 2,
  },
  appearance: {
    theme: "system",
    fontSize: "medium",
    soundEnabled: true,
    autoSave: true,
  },
  achievements: [
    {
      id: "ach_001",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      category: "Learning",
      rarity: "common",
      difficulty: "easy",
      points: 10,
      isEarned: true,
      earnedDate: "2024-01-16",
      totalSteps: 1,
      currentSteps: 1,
      timeToEarn: "1 day",
      requirements: ["Complete any lesson"],
    },
    {
      id: "ach_002",
      title: "Week Warrior",
      description: "Study for 7 consecutive days",
      icon: "🔥",
      category: "Consistency",
      rarity: "rare",
      difficulty: "medium",
      points: 50,
      isEarned: false,
      totalSteps: 7,
      currentSteps: 3,
      timeToEarn: "4 days",
      requirements: ["Study for 7 consecutive days"],
    },
    {
      id: "ach_003",
      title: "Course Master",
      description: "Complete an entire course",
      icon: "🏆",
      category: "Achievement",
      rarity: "epic",
      difficulty: "hard",
      points: 200,
      isEarned: false,
      totalSteps: 1,
      currentSteps: 0,
      timeToEarn: "2 weeks",
      requirements: ["Complete any full course"],
    },
  ],
  studyGroups: [
    {
      id: "group_001",
      name: "React Masters",
      description: "Advanced React development and best practices",
      category: "Frontend Development",
      difficulty: "Advanced",
      maxMembers: 20,
      currentMembers: 15,
      isPrivate: false,
      tags: ["React", "JavaScript", "Frontend"],
      organizer: {
        name: "Sarah Johnson",
        avatar: "SJ",
        isVerified: true,
      },
      isJoined: true,
      members: [
        {
          id: "member_001",
          name: "Sarah Johnson",
          avatar: "SJ",
          role: "organizer",
          isOnline: true,
          reputation: 95,
          joinedDate: "2024-01-10",
        },
        {
          id: "member_002",
          name: "Alex Chen",
          avatar: "AC",
          role: "member",
          isOnline: true,
          reputation: 78,
          joinedDate: "2024-01-15",
        },
      ],
      nextMeeting: {
        id: "meeting_001",
        title: "React Hooks Deep Dive",
        date: "2024-02-20",
        time: "14:00",
        duration: "90 minutes",
        attendees: 12,
        maxAttendees: 20,
      },
      meetingHistory: [
        {
          id: "meeting_001",
          title: "Introduction to React",
          date: "2024-02-13",
          duration: "60 minutes",
          attendees: 15,
        },
      ],
      resources: [
        {
          id: "resource_001",
          name: "React Best Practices Guide",
          type: "pdf",
          url: "#",
          size: "2.5 MB",
        },
      ],
      stats: {
        totalMeetings: 5,
        avgAttendance: 12,
        completionRate: 85,
      },
    },
  ],
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userCoursesSlice = createSlice({
  name: 'userCourses',
  initialState,
  reducers: {
    enrollCourse(state, action: PayloadAction<Course>) {
      if (!state.enrolled.find(c => c.title === action.payload.title)) {
        state.enrolled.push({ ...action.payload, enrolled: true });
      } else {
        // If already enrolled, ensure enrolled is true
        state.enrolled = state.enrolled.map(c =>
          c.title === action.payload.title ? { ...c, enrolled: true } : c
        );
      }
    },
    unenrollCourse(state, action: PayloadAction<string>) {
      state.enrolled = state.enrolled.filter(c => c.title !== action.payload);
    },
    toggleLessonCompletion(state, action: PayloadAction<{ courseTitle: string; lessonIndex: number }>) {
      const { courseTitle, lessonIndex } = action.payload;
      if (!state.lessonCompletion[courseTitle]) state.lessonCompletion[courseTitle] = {};
      state.lessonCompletion[courseTitle][lessonIndex] = !state.lessonCompletion[courseTitle][lessonIndex];
    },
    toggleResourceFavorite(state, action: PayloadAction<{ courseTitle: string; resourceName: string }>) {
      const { courseTitle, resourceName } = action.payload;
      if (!state.resourceFavorites[courseTitle]) state.resourceFavorites[courseTitle] = [];
      const idx = state.resourceFavorites[courseTitle].indexOf(resourceName);
      if (idx === -1) {
        state.resourceFavorites[courseTitle].push(resourceName);
      } else {
        state.resourceFavorites[courseTitle].splice(idx, 1);
      }
    },
    setSidebarBadgeCounts(state, action: PayloadAction<SidebarBadgeCounts>) {
      state.sidebarBadgeCounts = action.payload;
    },
  },
});

const scheduledSessionsSlice = createSlice({
  name: 'scheduledSessions',
  initialState: scheduledSessionsInitialState,
  reducers: {
    addScheduledSession(state, action: PayloadAction<Omit<ScheduledSession, 'id' | 'createdAt' | 'completed'>>) {
      const newSession: ScheduledSession = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completed: false,
      };
      state.sessions.push(newSession);
    },
    updateScheduledSession(state, action: PayloadAction<{ id: string; updates: Partial<ScheduledSession> }>) {
      const { id, updates } = action.payload;
      const sessionIndex = state.sessions.findIndex(session => session.id === id);
      if (sessionIndex !== -1) {
        state.sessions[sessionIndex] = { ...state.sessions[sessionIndex], ...updates };
      }
    },
    deleteScheduledSession(state, action: PayloadAction<string>) {
      state.sessions = state.sessions.filter(session => session.id !== action.payload);
    },
    toggleSessionCompletion(state, action: PayloadAction<string>) {
      const session = state.sessions.find(s => s.id === action.payload);
      if (session) {
        session.completed = !session.completed;
      }
    },
  },
});

// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    // Profile actions
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateAvatar(state, action: PayloadAction<string>) {
      state.profile.avatar = action.payload;
    },
    
    // Notification actions
    updateNotificationSettings(state, action: PayloadAction<Partial<NotificationSettings>>) {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    
    // Privacy actions
    updatePrivacySettings(state, action: PayloadAction<Partial<PrivacySettings>>) {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    
    // Security actions
    updateSecuritySettings(state, action: PayloadAction<Partial<SecuritySettings>>) {
      state.security = { ...state.security, ...action.payload };
    },
    toggleTwoFactor(state) {
      state.security.twoFactorEnabled = !state.security.twoFactorEnabled;
    },
    
    // Appearance actions
    updateAppearanceSettings(state, action: PayloadAction<Partial<AppearanceSettings>>) {
      state.appearance = { ...state.appearance, ...action.payload };
    },
    setTheme(state, action: PayloadAction<'light' | 'dark' | 'system'>) {
      state.appearance.theme = action.payload;
    },
    
    // Achievement actions
    earnAchievement(state, action: PayloadAction<string>) {
      const achievement = state.achievements.find(a => a.id === action.payload);
      if (achievement && !achievement.isEarned) {
        achievement.isEarned = true;
        achievement.earnedDate = new Date().toISOString();
        state.profile.totalXP += achievement.points;
      }
    },
    updateAchievementProgress(state, action: PayloadAction<{ id: string; currentSteps: number }>) {
      const achievement = state.achievements.find(a => a.id === action.payload.id);
      if (achievement) {
        achievement.currentSteps = action.payload.currentSteps;
        if (achievement.currentSteps >= achievement.totalSteps && !achievement.isEarned) {
          achievement.isEarned = true;
          achievement.earnedDate = new Date().toISOString();
          state.profile.totalXP += achievement.points;
        }
      }
    },
    
    // Study Group actions
    joinStudyGroup(state, action: PayloadAction<string>) {
      const group = state.studyGroups.find(g => g.id === action.payload);
      if (group && !group.isJoined) {
        group.isJoined = true;
        group.currentMembers += 1;
      }
    },
    leaveStudyGroup(state, action: PayloadAction<string>) {
      const group = state.studyGroups.find(g => g.id === action.payload);
      if (group && group.isJoined) {
        group.isJoined = false;
        group.currentMembers -= 1;
      }
    },
    createStudyGroup(state, action: PayloadAction<Omit<StudyGroup, 'id' | 'isJoined' | 'members' | 'meetingHistory' | 'stats'>>) {
      const newGroup: StudyGroup = {
        ...action.payload,
        id: `group_${Date.now()}`,
        isJoined: true,
        members: [{
          id: state.profile.id,
          name: `${state.profile.firstName} ${state.profile.lastName}`,
          avatar: state.profile.avatar || `${state.profile.firstName[0]}${state.profile.lastName[0]}`,
          role: 'organizer',
          isOnline: true,
          reputation: state.profile.totalXP,
          joinedDate: new Date().toISOString(),
        }],
        meetingHistory: [],
        stats: {
          totalMeetings: 0,
          avgAttendance: 0,
          completionRate: 0,
        },
      };
      state.studyGroups.push(newGroup);
    },
    
    // Authentication actions
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    
    // XP and Level actions
    addXP(state, action: PayloadAction<number>) {
      state.profile.totalXP += action.payload;
      // Simple level calculation (every 100 XP = 1 level)
      const newLevel = Math.floor(state.profile.totalXP / 100) + 1;
      if (newLevel > state.profile.currentLevel) {
        state.profile.currentLevel = newLevel;
      }
    },
    
    // Reset user state (for logout)
    resetUserState(state) {
      return userInitialState;
    },
  },
});

export const { 
  enrollCourse, 
  unenrollCourse, 
  toggleLessonCompletion, 
  toggleResourceFavorite, 
  setSidebarBadgeCounts 
} = userCoursesSlice.actions;

export const {
  addScheduledSession,
  updateScheduledSession,
  deleteScheduledSession,
  toggleSessionCompletion,
} = scheduledSessionsSlice.actions;

export const {
  updateProfile,
  updateAvatar,
  updateNotificationSettings,
  updatePrivacySettings,
  updateSecuritySettings,
  toggleTwoFactor,
  updateAppearanceSettings,
  setTheme,
  earnAchievement,
  updateAchievementProgress,
  joinStudyGroup,
  leaveStudyGroup,
  createStudyGroup,
  setAuthenticated,
  setLoading,
  setError,
  addXP,
  resetUserState,
} = userSlice.actions;

const userCoursesPersistConfig = {
  key: 'userCourses',
  storage,
  whitelist: ['enrolled', 'lessonCompletion', 'resourceFavorites', 'sidebarBadgeCounts'],
};

const scheduledSessionsPersistConfig = {
  key: 'scheduledSessions',
  storage,
  whitelist: ['sessions'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['profile', 'achievements', 'studyGroups', 'isAuthenticated'],
};

const rootReducer = {
  userCourses: persistReducer(userCoursesPersistConfig, userCoursesSlice.reducer),
  scheduledSessions: persistReducer(scheduledSessionsPersistConfig, scheduledSessionsSlice.reducer),
  user: persistReducer(userPersistConfig, userSlice.reducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 