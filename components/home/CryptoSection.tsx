import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function CryptoScreen() {
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', value: '₿26,543.10', change: '+2.4%', icon: require('@/assets/images/icon/bitcoin.png') },
    { name: 'Ethereum', symbol: 'ETH', value: '₿1,695.27', change: '-0.8%', icon: require('@/assets/images/icon/ethereum.png') },
    { name: 'Cardano', symbol: 'ADA', value: '₿0.35', change: '+3.2%', icon: require('@/assets/images/icon/cardano.png') },
  ];

  return (
    <ThemedView style={styles.assetsSection}>
      <ThemedView style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>My Assets</ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.seeAllButton}>See All</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Crypto Cards */}
      {cryptoData.map((crypto, index) => (
        <TouchableOpacity key={index} style={styles.cryptoCard}>
          <Image source={crypto.icon} style={styles.cryptoIcon} defaultSource={require('@/assets/images/icon/bitcoin.png')} />
          <ThemedView style={styles.cryptoInfo}>
            <ThemedText style={styles.cryptoName}>{crypto.name}</ThemedText>
            <ThemedText style={styles.cryptoSymbol}>{crypto.symbol}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.cryptoValues}>
            <ThemedText style={styles.cryptoValue}>{crypto.value}</ThemedText>
            <ThemedText style={[
              styles.cryptoChange,
              { color: crypto.change.startsWith('+') ? '#4CAF50' : '#F44336' }
            ]}>
              {crypto.change}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  assetsSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
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
  cryptoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cryptoInfo: {
    flex: 1,
    marginLeft: 15,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  cryptoSymbol: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  cryptoValues: {
    alignItems: 'flex-end',
  },
  cryptoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  cryptoChange: {
    fontSize: 14,
    marginTop: 2,
  }
});