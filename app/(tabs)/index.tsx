import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useChallenge } from '@/contexts/ChallengeContext';
import { useHabits } from '@/contexts/HabitsContext';

const getAllDaysInMonth = (selectedDate: Date, challengeData: any, isDayCompleted: (day: number) => boolean) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
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

const DayCircle = ({ day, dayName, isDisabled, isCompleted, isSelected, isFuture, challengeDay, isInChallenge, onSelect }: { 
  day: number, 
  dayName: string, 
  isDisabled: boolean, 
  isCompleted: boolean,
  isSelected: boolean,
  isFuture: boolean,
  challengeDay?: number,
  isInChallenge?: boolean,
  onSelect: () => void
}) => {

  return (
    <TouchableOpacity 
      style={[
        styles.dayContainer,
        isCompleted && styles.dayContainerCompleted,
        isSelected && styles.dayContainerToday,
        isDisabled && styles.dayContainerDisabled,
        { opacity: isFuture ? 0.5 : isDisabled ? 0.3 : 1 }
      ]}
      onPress={isDisabled ? undefined : onSelect}
      disabled={isDisabled}
    >
      <ThemedText style={[
        styles.dayNameText,
        isCompleted && styles.dayNameTextCompleted,
        isSelected && styles.dayNameTextToday,
        isDisabled && styles.dayNameTextDisabled,
      ]}>
        {dayName}
      </ThemedText>
      
      {isInChallenge && challengeDay && (
        <View style={styles.challengeIndicatorContainer}>
          <ThemedText style={styles.challengeDayIndicator}>
            D{challengeDay}
          </ThemedText>

        </View>
      )}
      
      <ThemedText style={[
        styles.dayText,
        isCompleted && styles.dayTextCompleted,
        isSelected && styles.dayTextToday,
        isDisabled && styles.dayTextDisabled,
      ]}>
        {day}
      </ThemedText>
    </TouchableOpacity>
  );
};

const HabitItem = ({ icon, name, isCompleted, onToggle }: { icon: string, name: string, isCompleted: boolean, onToggle: () => void }) => {
  return (
    <TouchableOpacity style={styles.habitCard} onPress={onToggle}>
      <View style={styles.habitContent}>
        <View style={styles.habitIconContainer}>
          <Ionicons name={icon as any} size={24} color={Colors.light.tint} />
        </View>
        
        <ThemedText style={[
          styles.habitName,
          isCompleted && styles.habitNameCompleted
        ]}>
          {name}
        </ThemedText>
      </View>
      
      <TouchableOpacity style={[
        styles.habitCheckbox,
        isCompleted && styles.habitCheckboxCompleted
      ]} onPress={onToggle}>
        {isCompleted && (
          <Ionicons name="checkmark" size={16} color="white" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const daysScrollRef = useRef<ScrollView>(null);
  const { getCurrentDay, getDaysRemaining, getProgressPercentage, challengeData, startChallenge, resetChallenge, isDayCompleted, markDayCompleted, markDayIncomplete } = useChallenge();
  const { habits } = useHabits();

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
  const userName = "Gabriela";
  
  useEffect(() => {
    setHabitsByDay({});
  }, [habits]);

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

    const selectedDateObj = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDay);
    const startDate = new Date(challengeData.startDate);
    startDate.setHours(0, 0, 0, 0);
    selectedDateObj.setHours(0, 0, 0, 0);
    
    const diffTime = selectedDateObj.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const challengeDay = diffDays + 1;
    
    if (challengeDay >= 1 && challengeDay <= challengeData.challengeDays) {
      const dayHabits = currentDayHabits;
      const allHabitsCompleted = dayHabits.length > 0 && dayHabits.every(habit => habit.isCompleted);
      const isDayCurrentlyCompleted = isDayCompleted(challengeDay);
      
      if (allHabitsCompleted && !isDayCurrentlyCompleted) {
        markDayCompleted(challengeDay);
      } else if (!allHabitsCompleted && isDayCurrentlyCompleted) {
        markDayIncomplete(challengeDay);
      }
    }
  }, [currentDayHabits, challengeData.isActive, challengeData.startDate, selectedDay, selectedDate, isDayCompleted, markDayCompleted, markDayIncomplete, challengeData.challengeDays]);
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText type="title" style={styles.welcomeText}>
              Welcome back, {userName}
            </ThemedText>
            {challengeData.isActive && (
              <View style={styles.challengeProgress}>
                <ThemedText style={styles.challengeText}>
                  Dia {getCurrentDay()} de {challengeData.challengeDays}
                  {challengeData.completedDays.length > 0 && ` • ${challengeData.completedDays.length} completos`}
                </ThemedText>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} 
                  />
                </View>
                <ThemedText style={styles.daysRemaining}>
                  {getDaysRemaining()} dias restantes
                </ThemedText>
              </View>
            )}
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowChallengeModal(true)}
          >
            <AntDesign name={challengeData.isActive ? "setting" : "plus"} size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ThemedView style={styles.calendarContainer}>
          <View style={styles.monthHeader}>
            <TouchableOpacity 
              style={styles.monthSelector}
              onPress={() => setShowMonthModal(true)}
            >
            <ThemedText type="subtitle" style={styles.monthTitle}>
              {`${selectedDate.toLocaleDateString('pt-BR', { month: 'long' })}/${selectedDate.getFullYear()}`}
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
              {selectedDay === new Date().getDate() ? 'Hábitos de Hoje' : `Hábitos do dia ${selectedDay}`}
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
            <View style={styles.noChallengeContainer}>
              <ThemedText type="subtitle" style={styles.noChallengeTitle}>
                🎯 Pronto para o desafio?
              </ThemedText>
              <ThemedText style={styles.noChallengeDescription}>
                Inicie seu desafio de 75 dias e acompanhe seus hábitos diários. 
                Transforme sua rotina e alcance seus objetivos!
              </ThemedText>
              <TouchableOpacity
                style={styles.startChallengeCtaButton}
                onPress={() => setShowChallengeModal(true)}
              >
                <ThemedText style={styles.startChallengeCtaText}>
                  Começar Desafio
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        )}

        <Modal
          visible={showMonthModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowMonthModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText type="subtitle" style={styles.modalTitle}>
                Selecionar Mês
              </ThemedText>
              
              <ScrollView style={styles.monthList}>
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(selectedDate.getFullYear(), i, 1);
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.monthItem}
                      onPress={() => {
                        setSelectedDate(new Date(selectedDate.getFullYear(), i, 1));
                        setShowMonthModal(false);
                      }}
                    >
                      <ThemedText style={styles.monthItemText}>
                        {`${date.toLocaleDateString('pt-BR', { month: 'long' })}/${date.getFullYear()}`}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowMonthModal(false)}
              >
                <ThemedText style={styles.modalCloseText}>Fechar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showChallengeModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowChallengeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText type="subtitle" style={styles.modalTitle}>
                {challengeData.isActive ? 'Configurar Desafio' : 'Iniciar Desafio'}
              </ThemedText>
              
              {!challengeData.isActive ? (
                <View>
                  <ThemedText style={styles.challengeDescription}>
                    Inicie seu desafio de {challengeData.challengeDays} dias! 
                    Você pode acompanhar seu progresso e manter seus hábitos consistentemente.
                  </ThemedText>
                  
                  <TouchableOpacity
                    style={styles.startChallengeButton}
                    onPress={() => {
                      startChallenge(new Date());
                      setShowChallengeModal(false);
                    }}
                  >
                    <ThemedText style={styles.startChallengeButtonText}>
                      Começar Hoje
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <ThemedText style={styles.challengeDescription}>
                    Desafio em andamento desde {challengeData.startDate?.toLocaleDateString('pt-BR')}
                  </ThemedText>
                  
                  <View style={styles.challengeStats}>
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>{getCurrentDay()}</ThemedText>
                      <ThemedText style={styles.statLabel}>Dia Atual</ThemedText>
                    </View>
                    
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>{getDaysRemaining()}</ThemedText>
                      <ThemedText style={styles.statLabel}>Restantes</ThemedText>
                    </View>
                    
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>{Math.round(getProgressPercentage())}%</ThemedText>
                      <ThemedText style={styles.statLabel}>Completo</ThemedText>
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.resetChallengeButton}
                    onPress={() => {
                      resetChallenge();
                      setShowChallengeModal(false);
                    }}
                  >
                    <ThemedText style={styles.resetChallengeButtonText}>
                      Finalizar Desafio
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              )}
              
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowChallengeModal(false)}
              >
                <ThemedText style={styles.modalCloseText}>Fechar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
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
  dayContainer: {
    width: 50,
    height: 110,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderColor: Colors.light.lightGray,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 8,

  },
  dayContainerCompleted: {
    backgroundColor: Colors.light.successColor,
    borderColor: Colors.light.successColor,
  },
  dayContainerToday: {
    borderColor: Colors.light.tint,
    borderWidth: 3,
  },
  dayContainerDisabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#c0c0c0',
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  dayNameTextCompleted: {
    color: 'white',
  },
  dayNameTextToday: {
    fontWeight: '700',
  },
  dayNameTextDisabled: {
    color: '#999',
  },
  dayDotCompleted: {
    backgroundColor: '#ffffff',
  },
  dayText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  dayTextCompleted: {
    color: 'white',
  },
  dayTextToday: {
    fontWeight: 'bold',
  },
  dayTextDisabled: {
    color: '#999',
  },
  challengeIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  challengeDayIndicator: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.light.tint,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  canCompleteIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#edece4',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  monthList: {
    maxHeight: 300,
  },
  monthItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  monthItemText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  modalCloseButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
  },
  modalCloseText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  habitsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
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
  habitCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  habitNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  habitCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitCheckboxCompleted: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  headerLeft: {
    flex: 1,
  },
  challengeProgress: {
    marginTop: 8,
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
  challengeDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  startChallengeButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  startChallengeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  resetChallengeButton: {
    backgroundColor: '#ff4757',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  resetChallengeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  noChallengeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
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
    marginBottom: 30,
  },
  startChallengeCtaButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  startChallengeCtaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
