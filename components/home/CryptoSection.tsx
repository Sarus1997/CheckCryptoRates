import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CryptoScreen() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid API response format');

      const formattedData = data.map(coin => ({
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        value: `${coin.current_price.toLocaleString()}`,
        change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
        icon: { uri: coin.image }
      }));

      setCryptoData(formattedData as React.SetStateAction<never[]>);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      Alert.alert('Error', 'Failed to fetch cryptocurrency data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.assetsSection}>
      <ThemedView style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>My Assets</ThemedText>
        <TouchableOpacity onPress={fetchCryptoData}>
          <ThemedText style={styles.seeAllButton}>Refresh</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {loading ? (
        <ActivityIndicator size="large" color="#3A7BD5" />
      ) : cryptoData.length === 0 ? (
        <ThemedText style={styles.errorText}>No data available</ThemedText>
      ) : (
        <>
          {cryptoData.slice(0, 5).map((crypto: any, index) => (
            <TouchableOpacity key={index} style={styles.cryptoCard}>
              <Image source={crypto.icon} style={styles.cryptoIcon} />
              <ThemedView style={styles.cryptoInfo}>
                <ThemedText style={styles.cryptoName}>{crypto.name}</ThemedText>
                <ThemedText style={styles.cryptoSymbol}>{crypto.symbol}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.cryptoValues}>
                <ThemedText style={styles.cryptoValue}>{crypto.value}</ThemedText>
                <ThemedText style={[styles.cryptoChange, { color: parseFloat(crypto.change) >= 0 ? '#4CAF50' : '#F44336' }]}>
                  {crypto.change}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
          {/* ปุ่ม MORE */}
          <TouchableOpacity style={styles.moreButton} onPress={() => navigation.navigate('AllCryptoScreen' as never)}>
            <ThemedText style={styles.moreText}>More</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  assetsSection: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
  seeAllButton: { fontSize: 14, color: '#3A7BD5', fontWeight: '500' },
  errorText: { textAlign: 'center', color: '#F44336', fontSize: 16, marginTop: 20 },
  cryptoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 15, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  cryptoIcon: { width: 40, height: 40, borderRadius: 20 },
  cryptoInfo: { flex: 1, marginLeft: 15 },
  cryptoName: { fontSize: 16, fontWeight: '600', color: '#333333' },
  cryptoSymbol: { fontSize: 14, color: '#888888', marginTop: 2 },
  cryptoValues: { alignItems: 'flex-end' },
  cryptoValue: { fontSize: 16, fontWeight: '600', color: '#333333' },
  cryptoChange: { fontSize: 14, marginTop: 2 },
  moreButton: { marginTop: 10, padding: 10, alignItems: 'center', backgroundColor: '#3A7BD5', borderRadius: 10 },
  moreText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
