import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
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
} from '@/store';

// User Profile Selectors
export const useUserProfile = () => {
  return useSelector((state: RootState) => state.user.profile);
};

export const useUserNotifications = () => {
  return useSelector((state: RootState) => state.user.notifications);
};

export const useUserPrivacy = () => {
  return useSelector((state: RootState) => state.user.privacy);
};

export const useUserSecurity = () => {
  return useSelector((state: RootState) => state.user.security);
};

export const useUserAppearance = () => {
  return useSelector((state: RootState) => state.user.appearance);
};

export const useUserAchievementsState = () => {
  return useSelector((state: RootState) => state.user.achievements);
};

export const useUserStudyGroupsState = () => {
  return useSelector((state: RootState) => state.user.studyGroups);
};

export const useUserAuth = () => {
  return useSelector((state: RootState) => ({
    isAuthenticated: state.user.isAuthenticated,
    isLoading: state.user.isLoading,
    error: state.user.error,
  }));
};

// Computed Selectors
export const useUserStats = () => {
  const profile = useUserProfile();
  const achievements = useUserAchievementsState();
  
  const earnedAchievements = achievements.filter(a => a.isEarned);
  const progressAchievements = achievements.filter(a => !a.isEarned && a.currentSteps > 0);
  const totalPossibleXP = achievements.reduce((sum, a) => sum + a.points, 0);
  const completionRate = achievements.length > 0 ? (earnedAchievements.length / achievements.length) * 100 : 0;
  
  return {
    totalXP: profile.totalXP,
    currentLevel: profile.currentLevel,
    globalRank: profile.globalRank,
    earnedAchievements: earnedAchievements.length,
    progressAchievements: progressAchievements.length,
    totalAchievements: achievements.length,
    totalPossibleXP,
    completionRate,
  };
};

export const useUserStudyGroupsStats = () => {
  const studyGroups = useUserStudyGroupsState();
  
  const joinedGroups = studyGroups.filter(g => g.isJoined);
  const availableGroups = studyGroups.filter(g => !g.isJoined);
  const totalMeetings = joinedGroups.reduce((sum, g) => sum + g.stats.totalMeetings, 0);
  const avgAttendance = joinedGroups.length > 0 
    ? joinedGroups.reduce((sum, g) => sum + g.stats.avgAttendance, 0) / joinedGroups.length 
    : 0;
  
  return {
    joinedGroups: joinedGroups.length,
    availableGroups: availableGroups.length,
    totalGroups: studyGroups.length,
    totalMeetings,
    avgAttendance: Math.round(avgAttendance),
  };
};

// Main User Hook
export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useUserProfile();
  const notifications = useUserNotifications();
  const privacy = useUserPrivacy();
  const security = useUserSecurity();
  const appearance = useUserAppearance();
  const achievements = useUserAchievementsState();
  const studyGroups = useUserStudyGroupsState();
  const { isAuthenticated, isLoading, error } = useUserAuth();
  const stats = useUserStats();
  const studyGroupsStats = useUserStudyGroupsStats();

  return {
    // State
    profile,
    notifications,
    privacy,
    security,
    appearance,
    achievements,
    studyGroups,
    isAuthenticated,
    isLoading,
    error,
    stats,
    studyGroupsStats,

    // Profile Actions
    updateProfile: (updates: Partial<typeof profile>) => dispatch(updateProfile(updates)),
    updateAvatar: (avatar: string) => dispatch(updateAvatar(avatar)),

    // Notification Actions
    updateNotificationSettings: (settings: Partial<typeof notifications>) => 
      dispatch(updateNotificationSettings(settings)),

    // Privacy Actions
    updatePrivacySettings: (settings: Partial<typeof privacy>) => 
      dispatch(updatePrivacySettings(settings)),

    // Security Actions
    updateSecuritySettings: (settings: Partial<typeof security>) => 
      dispatch(updateSecuritySettings(settings)),
    toggleTwoFactor: () => dispatch(toggleTwoFactor()),

    // Appearance Actions
    updateAppearanceSettings: (settings: Partial<typeof appearance>) => 
      dispatch(updateAppearanceSettings(settings)),
    setTheme: (theme: 'light' | 'dark' | 'system') => dispatch(setTheme(theme)),

    // Achievement Actions
    earnAchievement: (id: string) => dispatch(earnAchievement(id)),
    updateAchievementProgress: (id: string, currentSteps: number) => 
      dispatch(updateAchievementProgress({ id, currentSteps })),

    // Study Group Actions
    joinStudyGroup: (groupId: string) => dispatch(joinStudyGroup(groupId)),
    leaveStudyGroup: (groupId: string) => dispatch(leaveStudyGroup(groupId)),
    createStudyGroup: (group: Parameters<typeof createStudyGroup>[0]) => 
      dispatch(createStudyGroup(group)),

    // Authentication Actions
    setAuthenticated: (authenticated: boolean) => dispatch(setAuthenticated(authenticated)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    setError: (error: string | null) => dispatch(setError(error)),

    // XP and Level Actions
    addXP: (xp: number) => dispatch(addXP(xp)),

    // Reset Actions
    resetUserState: () => dispatch(resetUserState()),
  };
};

// Specific Hooks for Common Use Cases
export const useUserTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useUserAppearance().theme;
  
  return {
    theme,
    setTheme: (newTheme: 'light' | 'dark' | 'system') => dispatch(setTheme(newTheme)),
  };
};

export const useUserXP = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalXP, currentLevel } = useUserStats();
  
  return {
    totalXP,
    currentLevel,
    addXP: (xp: number) => dispatch(addXP(xp)),
  };
};

export const useUserAchievements = () => {
  const dispatch = useDispatch<AppDispatch>();
  const achievements = useUserAchievementsState();
  
  return {
    achievements,
    earnAchievement: (id: string) => dispatch(earnAchievement(id)),
    updateProgress: (id: string, currentSteps: number) => 
      dispatch(updateAchievementProgress({ id, currentSteps })),
  };
};

export const useUserStudyGroups = () => {
  const dispatch = useDispatch<AppDispatch>();
  const studyGroups = useUserStudyGroupsState();
  
  return {
    studyGroups,
    joinGroup: (groupId: string) => dispatch(joinStudyGroup(groupId)),
    leaveGroup: (groupId: string) => dispatch(leaveStudyGroup(groupId)),
    createGroup: (group: Parameters<typeof createStudyGroup>[0]) => 
      dispatch(createStudyGroup(group)),
  };
}; 