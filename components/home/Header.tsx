import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HeaderScreen() {

  return (
    <ThemedView style={styles.header}>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.title_1}>CRYPTO</ThemedText>
        <ThemedText style={styles.title_2}>WATTEL</ThemedText>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <Image
          source={require('@/assets/images/icon/profile.png')}
          style={styles.profileIcon}
          defaultSource={require('@/assets/images/icon/profile.png')}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  title_1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A7BD5',
  },
  title_2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00D2FF',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileIcon: {
    width: 25,
    height: 25,
  }
});