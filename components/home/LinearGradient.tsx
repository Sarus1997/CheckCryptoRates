import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';


export default function LinearGradientScreen() {

  return (
    <LinearGradient
      colors={['#3A7BD5', '#00D2FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.balanceCard}
    >
      <ThemedView style={styles.balanceContainer}>
        <ThemedText style={styles.balanceLabel}>Total Balance</ThemedText>
        <ThemedText style={styles.balanceAmount}>₿3.24159</ThemedText>
        <ThemedText style={styles.fiatAmount}>$84,239.51</ThemedText>
      </ThemedView>
      <ThemedView style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('@/assets/images/icon/send.png')}
            style={styles.actionIcon}
            defaultSource={require('@/assets/images/icon/send.png')}
          />
          <ThemedText style={styles.actionText}>Send</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('@/assets/images/icon/receive.png')}
            style={styles.actionIcon}
            defaultSource={require('@/assets/images/icon/receive.png')}
          />
          <ThemedText style={styles.actionText}>Receive</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('@/assets/images/icon/swap.png')}
            style={styles.actionIcon}
            defaultSource={require('@/assets/images/icon/swap.png')}
          />
          <ThemedText style={styles.actionText}>Swap</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: '#3A7BD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  fiatAmount: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    width: '28%',
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
    tintColor: '#FFFFFF',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  }
});