import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const ProfileHeader = () => {
  return (
    <View style={styles.profileHeader}>
      <Image
        source={require('@/assets/images/avatar.jpg')}
        style={styles.profileImage}
      />
      <View>
        <ThemedText 
          type="title" 
          style={styles.userName}>
          Gabriela Cena
        </ThemedText>
        <ThemedText 
          style={styles.userEmail}>
          gabriela.cena@email.com
        </ThemedText>
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#353636' }}
      headerImage={<ProfileHeader />}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Informações Pessoais
        </ThemedText>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">Nome completo</ThemedText>
          <ThemedText>João Silva</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">Email</ThemedText>
          <ThemedText>joao.silva@email.com</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">Telefone</ThemedText>
          <ThemedText>(11) 99999-9999</ThemedText>
        </ThemedView>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Configurações
        </ThemedText>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText>Notificações</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText>Privacidade</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText>Sobre o app</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    gap: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  contentContainer: {
  },
  sectionTitle: {
    marginBottom: 8,
  },
  infoSection: {
    gap: 4,
    paddingVertical: 8,
  },
});
