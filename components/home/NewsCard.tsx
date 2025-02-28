import { StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NewsScreen() {
  return (
    <ThemedView style={styles.newsSection}>
      <ThemedView style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Market News</ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.seeAllButton}>More</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity>
        <ImageBackground
          source={require('@/assets/images/icon/bitcoin.png')}
          style={styles.newsCard}
          imageStyle={styles.newsBackgroundImage}
        >
          <ThemedView style={styles.newsContent}>
            <ThemedText style={styles.newsTitle}>Bitcoin Reaches New Heights</ThemedText>
            <ThemedText style={styles.newsDescription}>
              The world's leading cryptocurrency continues to show strength in the market...
            </ThemedText>
            <ThemedText style={styles.newsTime}>2 hours ago</ThemedText>
          </ThemedView>
        </ImageBackground>
      </TouchableOpacity>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#3A7BD5',
    fontWeight: '500',
  },
  newsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  newsCard: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: 150,
  },
  newsBackgroundImage: {
    width: 120,
    height: 120,
    opacity: 0.1,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  newsContent: {
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    width: '80%',
  },
  newsDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
    width: '90%',
  },
  newsTime: {
    fontSize: 12,
    color: '#888888',
    marginTop: 10,
  },
});