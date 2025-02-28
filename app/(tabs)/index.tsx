import CryptoScreen from '@/components/home/CryptoSection';
import HeaderScreen from '@/components/home/Header';
import LinearGradientScreen from '@/components/home/LinearGradient';
import NewsScreen from '@/components/home/NewsCard';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderScreen />
        <LinearGradientScreen />
        <CryptoScreen />
        <NewsScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});