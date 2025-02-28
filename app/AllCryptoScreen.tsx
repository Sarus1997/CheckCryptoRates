import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView, View, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AllCryptoScreen() {
  interface Crypto {
    id: string;
    name: string;
    symbol: string;
    value: string;
    change: string;
    changeNumeric: number;
    icon: { uri: string };
  }

  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&order=market_cap_desc&per_page=50&page=1');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid API response format');

      const formattedData = data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        value: `฿${coin.current_price.toLocaleString()}`,
        change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
        changeNumeric: coin.price_change_percentage_24h,
        icon: { uri: coin.image }
      }));

      setCryptoData(formattedData);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลคริปโตเคอเรนซีได้');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCryptoData();
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? '#00C853' : '#FF3D00';
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>คริปโตเคอเรนซีทั้งหมด</ThemedText>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchCryptoData}
          disabled={loading}
        >
          <ThemedText style={styles.refreshButtonText}>รีเฟรช</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {loading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3A7BD5" />
          <ThemedText style={styles.loadingText}>กำลังโหลดข้อมูล...</ThemedText>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#3A7BD5']} />
          }
        >
          <ThemedView style={styles.cryptoList}>
            {cryptoData.map((crypto) => (
              <TouchableOpacity
                key={crypto.id}
                style={styles.cryptoCard}
                onPress={() => Alert.alert(`${crypto.name}`, `Current price: ${crypto.value}`)}
              >
                <View style={styles.cryptoLeftSection}>
                  <Image source={crypto.icon} style={styles.cryptoIcon} />
                  <View style={styles.cryptoInfo}>
                    <ThemedText style={styles.cryptoName}>{crypto.name}</ThemedText>
                    <ThemedText style={styles.cryptoSymbol}>{crypto.symbol}</ThemedText>
                  </View>
                </View>
                <View style={styles.cryptoPriceSection}>
                  <ThemedText style={styles.cryptoValue}>{crypto.value}</ThemedText>
                  <ThemedText style={[
                    styles.cryptoChange,
                    { color: getChangeColor(crypto.changeNumeric) }
                  ]}>
                    {crypto.change}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  refreshButton: {
    backgroundColor: '#3A7BD5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888888',
  },
  scrollView: {
    flex: 1,
  },
  cryptoList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  cryptoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cryptoLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 3,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
  },
  cryptoInfo: {
    marginLeft: 12,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  cryptoSymbol: {
    fontSize: 14,
    opacity: 0.7,
    color: '#888888',
  },
  cryptoPriceSection: {
    flex: 2,
    alignItems: 'flex-end',
  },
  cryptoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  cryptoChange: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    color: '#888888',
  },
});
