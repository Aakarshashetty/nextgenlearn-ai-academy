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

const initialState: UserCoursesState = {
  enrolled: [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      duration: "65h 30m",
      students: 15420,
      rating: 4.9,
      progress: 75,
      thumbnail: "",
      level: "Beginner",
      category: "Web Development",
      videoUrl: "https://www.youtube.com/embed/ZxKM3DCV2kE",
      nextLesson: "HTML & CSS Basics"
    },
    {
      title: "Advanced React and Redux",
      instructor: "Stephen Grider",
      duration: "47h 15m",
      students: 8932,
      rating: 4.8,
      progress: 45,
      thumbnail: "",
      level: "Advanced",
      category: "Frontend",
      videoUrl: "https://www.youtube.com/embed/9D1x7-2FmTA",
      nextLesson: "Redux Middleware"
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

const userCoursesSlice = createSlice({
  name: 'userCourses',
  initialState,
  reducers: {
    enrollCourse(state, action: PayloadAction<Course>) {
      if (!state.enrolled.find(c => c.title === action.payload.title)) {
        state.enrolled.push(action.payload);
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

export const { enrollCourse, unenrollCourse, toggleLessonCompletion, toggleResourceFavorite, setSidebarBadgeCounts } = userCoursesSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['userCourses'],
};

const rootReducer = {
  userCourses: persistReducer(persistConfig, userCoursesSlice.reducer),
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 