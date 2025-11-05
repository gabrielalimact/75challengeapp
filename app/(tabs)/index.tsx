import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChallengeModal from '@/components/challenge-modal';
import DayCircle from '@/components/day-circle';
import HabitItem from '@/components/habit-item';
import MonthSelectorModal from '@/components/month-selector-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useChallenge } from '@/contexts/ChallengeContext';
import { useHabits } from '@/contexts/HabitsContext';
import { useUser } from '@/contexts/UserContext';
import { getAllDaysInMonth } from '@/utils';
import { Image } from 'expo-image';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const daysScrollRef = useRef<ScrollView>(null);
  const updateTimeoutRef = useRef<number | null>(null);
  const lastHabitsStateRef = useRef<string>('');
  const { getCurrentDay, getDaysRemaining, getProgressPercentage, challengeData, startChallenge, resetChallenge, isDayCompleted, markDayCompleted, markDayIncomplete } = useChallenge();
  const { habits } = useHabits();
  const { user } = useUser();





  const [habitsByDay, setHabitsByDay] = useState<Record<string, typeof habits>>({});
  
  const getDayKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const createFreshHabits = () => {
    return habits.map(habit => ({ ...habit, isCompleted: false }));
  };

  const getHabitsForDay = (day: number) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    const dayKey = getDayKey(date);
    
    if (!habitsByDay[dayKey]) {
      return createFreshHabits();
    }
    return habitsByDay[dayKey];
  };

  const currentDayHabits = getHabitsForDay(selectedDay);
  
  const days = getAllDaysInMonth(selectedDate, challengeData, isDayCompleted);
  
  useEffect(() => {
    setHabitsByDay({});
  }, [habits]);

  const checkAndUpdateDayStatus = useCallback((dayHabits: typeof currentDayHabits, challengeDay: number) => {
    const allHabitsCompleted = dayHabits.length > 0 && dayHabits.every(habit => habit.isCompleted);
    const isDayCurrentlyCompleted = isDayCompleted(challengeDay);
    
    const habitsStateKey = `${challengeDay}-${JSON.stringify(dayHabits.map(h => ({ id: h.id, completed: h.isCompleted })))}`;
    
    if (lastHabitsStateRef.current !== habitsStateKey) {
      lastHabitsStateRef.current = habitsStateKey;
      
      console.log('Debug - Challenge Day:', challengeDay);
      console.log('Debug - All Habits Completed:', allHabitsCompleted);
      console.log('Debug - Is Day Currently Completed:', isDayCurrentlyCompleted);
      
      if (allHabitsCompleted && !isDayCurrentlyCompleted) {
        console.log('Debug - Marking day completed:', challengeDay);
        markDayCompleted(challengeDay);
      } else if (!allHabitsCompleted && isDayCurrentlyCompleted) {
        console.log('Debug - Marking day incomplete:', challengeDay);
        markDayIncomplete(challengeDay);
      }
    }
  }, [isDayCompleted, markDayCompleted, markDayIncomplete]);

  useEffect(() => {
    const todayIndex = days.findIndex(day => day.isToday);
    if (todayIndex !== -1 && daysScrollRef.current) {
      setTimeout(() => {
        const dayWidth = 62;
        const screenWidth = 350;
        const scrollToX = Math.max(0, (todayIndex * dayWidth) - (screenWidth / 2) + (dayWidth / 2));
        
        daysScrollRef.current?.scrollTo({
          x: scrollToX,
          animated: true
        });
      }, 100);
    }
  }, [days]);

  useEffect(() => {
    const selectedIndex = days.findIndex(day => day.day === selectedDay);
    if (selectedIndex !== -1 && daysScrollRef.current) {
      setTimeout(() => {
        const dayWidth = 62;
        const screenWidth = 350;
        const scrollToX = Math.max(0, (selectedIndex * dayWidth) - (screenWidth / 2) + (dayWidth / 2));
        
        daysScrollRef.current?.scrollTo({
          x: scrollToX,
          animated: true
        });
      }, 100);
    }
  }, [selectedDay, days]);
  
  const toggleDayHabit = (habitId: number) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDay);
    const dayKey = getDayKey(date);
    
    setHabitsByDay(prev => {
      const currentHabits = prev[dayKey] || createFreshHabits();
      const updatedHabits = currentHabits.map(habit => 
        habit.id === habitId 
          ? { ...habit, isCompleted: !habit.isCompleted }
          : habit
      );
      
      return {
        ...prev,
        [dayKey]: updatedHabits
      };
    });
  };

  useEffect(() => {
    if (!challengeData.isActive || !challengeData.startDate) return;

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = window.setTimeout(() => {
      const selectedDateObj = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDay);
      const startDate = new Date(challengeData.startDate!);
      startDate.setHours(0, 0, 0, 0);
      selectedDateObj.setHours(0, 0, 0, 0);
      
      const diffTime = selectedDateObj.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const challengeDay = diffDays + 1;
      
      if (challengeDay >= 1 && challengeDay <= challengeData.challengeDays) {
        checkAndUpdateDayStatus(currentDayHabits, challengeDay);
      }
    }, 300);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [currentDayHabits, selectedDay, selectedDate, challengeData.isActive, challengeData.startDate, challengeData.challengeDays, checkAndUpdateDayStatus]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
              />
              <View>
            <ThemedText type="default" style={styles.greetingText}>
              {getGreeting()}
            </ThemedText>
            <ThemedText type="title" style={styles.welcomeText}>
              {user.name.split(' ')[0]}
            </ThemedText>
            </View>
            </View>
            
          </View>
          {challengeData.isActive && <TouchableOpacity 
            style={styles.configButton}
            onPress={() => setShowChallengeModal(true)}
          >
            <AntDesign name="setting" size={24} color="white" />
          </TouchableOpacity>}
        </View>
{challengeData.isActive && (
              <View style={styles.challengeProgress}>
                <ThemedText style={styles.challengeText}>
                  Day {getCurrentDay()} of {challengeData.challengeDays}
                  {challengeData.completedDays.length > 0 && ` • ${challengeData.completedDays.length} completed`}
                </ThemedText>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} 
                  />
                </View>
                <ThemedText style={styles.daysRemaining}>
                  {getDaysRemaining()} days remaining
                </ThemedText>
              </View>
            )}
        <ThemedView style={styles.calendarContainer}>
          <View style={styles.monthHeader}>
            <TouchableOpacity 
              style={styles.monthSelector}
              onPress={() => setShowMonthModal(true)}
            >
            <ThemedText type="subtitle" style={styles.monthTitle}>
              {`${selectedDate.toLocaleDateString('en-US', { month: 'long' })}/${selectedDate.getFullYear()}`}
            </ThemedText>
            
              <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            ref={daysScrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysScrollContainer}
            style={styles.daysScroll}
          >
            {days.map((dayData, index) => (
              <DayCircle
                key={index}
                day={dayData.day}
                dayName={dayData.dayName}
                isCompleted={dayData.isCompleted}
                isSelected={selectedDay === dayData.day}
                isFuture={dayData.isFuture}
                challengeDay={dayData.challengeDay}
                isInChallenge={dayData.isInChallenge}
                isDisabled={dayData.isDisabled}
                onSelect={() => setSelectedDay(dayData.day)}
              />
            ))}
          </ScrollView>
        </ThemedView>

        {challengeData.isActive ? (
          <ThemedView style={styles.habitsContainer}>
            <ThemedText type="subtitle" style={styles.habitsTitle}>
              {selectedDay === new Date().getDate() ? 'Today\'s Habits' : `Day ${selectedDay} Habits`}
            </ThemedText>
            
            <ScrollView 
              style={styles.habitsList}
              contentContainerStyle={styles.habitsListContent}
            >
              {currentDayHabits.map((habit) => (
                <HabitItem
                  key={habit.id}
                  icon={habit.icon}
                  name={habit.name}
                  isCompleted={habit.isCompleted}
                  onToggle={() => toggleDayHabit(habit.id)}
                />
              ))}
            </ScrollView>
          </ThemedView>
        ) : (
          <ThemedView style={styles.habitsContainer}>
            <ScrollView style={styles.noChallengeContainer} 
            contentContainerStyle={{ paddingBottom: 100 }}
            >
              <ThemedText type="subtitle" style={styles.noChallengeTitle}>
                🎯 Ready for the challenge?
              </ThemedText>
              <ThemedText style={styles.noChallengeDescription}>
                Get ready for your 75-day transformation journey!
              </ThemedText>
              
              <View style={styles.preparationSteps}>
                <View style={styles.preparationStep}>
                  <Ionicons name="checkmark-circle" size={24} color={habits.length > 0 ? Colors.light.successColor : '#ccc'} />
                  <View style={styles.preparationStepContent}>
                    <ThemedText style={styles.preparationStepTitle}>
                      Configure Your Habits ({habits.length})
                    </ThemedText>
                    <ThemedText style={styles.preparationStepDescription}>
                      {habits.length > 0 
                        ? 'Great! You have habits configured.' 
                        : 'Set up the daily habits you want to track.'}
                    </ThemedText>
                  </View>
                </View>
                
                <View style={styles.preparationStep}>
                  <Ionicons name="play-circle" size={24} color={habits.length > 0 ? Colors.light.tint : '#ccc'} />
                  <View style={styles.preparationStepContent}>
                    <ThemedText style={styles.preparationStepTitle}>
                      Start Your Challenge
                    </ThemedText>
                    <ThemedText style={styles.preparationStepDescription}>
                      Begin your 75-day journey of consistency and growth.
                    </ThemedText>
                  </View>
                </View>
              </View>
              
              <View style={styles.ctaButtons}>
                {habits.length === 0 && (
                  <TouchableOpacity
                    style={styles.configureFirstButton}
                    onPress={() => router.push('/(tabs)/habitsconfig')}
                  >
                    <Ionicons name="settings-outline" size={20} color="white" />
                    <ThemedText style={styles.configureFirstButtonText}>
                      Configure Habits First
                    </ThemedText>
                  </TouchableOpacity>
                )}

                {habits.length >= 1 && (
                  <TouchableOpacity
                    style={[
                      styles.startChallengeCtaButton
                    ]}
                    onPress={() => setShowChallengeModal(true)}
                  >
                  <ThemedText style={[
                    styles.startChallengeCtaText
                  ]}>
                    Start Challenge
                  </ThemedText>
                </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </ThemedView>
        )}

        <MonthSelectorModal
          visible={showMonthModal}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onClose={() => setShowMonthModal(false)}
        />

        <ChallengeModal
          visible={showChallengeModal}
          challengeData={challengeData}
          habits={habits}
          onStartChallenge={startChallenge}
          onResetChallenge={resetChallenge}
          onClose={() => setShowChallengeModal(false)}
          getCurrentDay={getCurrentDay}
          getDaysRemaining={getDaysRemaining}
          getProgressPercentage={getProgressPercentage}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  greetingText: {
    color: Colors.light.gray,
  },
  welcomeText: {
    fontSize: 24,
  },
  configButton: {
    backgroundColor: Colors.light.tint,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  monthHeader: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginRight: 8,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  daysScroll: {
    marginHorizontal: -20,
  },
  daysScrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  habitsContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  habitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  habitsList: {
    flex: 1,
  },
  habitsListContent: {
    paddingBottom: 80,
  },
  headerLeft: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  challengeProgress: {
    paddingHorizontal: 20,
  },
  challengeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.tint,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 3,
  },
  daysRemaining: {
    fontSize: 12,
    color: '#666',
  },
  noChallengeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  noChallengeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.light.tint,
  },
  noChallengeDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#666',
  },
  startChallengeCtaButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  startChallengeCtaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  preparationSteps: {
    marginVertical: 20,
    gap: 16,
  },
  preparationStep: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    gap: 12,
  },
  preparationStepContent: {
    flex: 1,
  },
  preparationStepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  preparationStepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  ctaButtons: {
    gap: 12,
  },
  configureFirstButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  configureFirstButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
