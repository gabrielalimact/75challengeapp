/**
 * Day data structure for calendar
 */
export interface DayData {
  day: number;
  dayName: string;
  isToday: boolean;
  isFuture: boolean;
  isCompleted: boolean;
  date: Date;
  challengeDay: number;
  isInChallenge: boolean;
  isDisabled: boolean;
}

/**
 * Challenge data interface
 */
export interface ChallengeData {
  isActive: boolean;
  startDate?: Date | null;
  challengeDays: number;
}

/**
 * Gets all days in a month with challenge-related data
 * @param selectedDate - The selected date to get the month from
 * @param challengeData - Challenge configuration data
 * @param isDayCompleted - Function to check if a challenge day is completed
 * @returns Array of day data objects
 */
export const getAllDaysInMonth = (
  selectedDate: Date, 
  challengeData: ChallengeData, 
  isDayCompleted: (day: number) => boolean
): DayData[] => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const dayOfWeek = date.getDay();
    const isToday = i + 1 === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const isFuture = date > today && !isToday;
    
    let challengeDay = 0;
    let isInChallenge = false;
    let isCompleted = false;
    let isDisabled = false;
    
    if (challengeData.isActive && challengeData.startDate) {
      const startDate = new Date(challengeData.startDate);
      startDate.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      
      const diffTime = checkDate.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays < challengeData.challengeDays) {
        challengeDay = diffDays + 1;
        isInChallenge = true;
        
        isCompleted = isDayCompleted(challengeDay);
      } else if (diffDays < 0) {
        isDisabled = true;
      }
    }
    
    return {
      day: i + 1,
      dayName: dayNames[dayOfWeek],
      isToday: isToday,
      isFuture: isFuture,
      isCompleted: isCompleted,
      date: date,
      challengeDay: challengeDay,
      isInChallenge: isInChallenge,
      isDisabled: isDisabled,
    };
  });
};
