import InsuranceDetailsScreen from '@/components/screens/InsuranceDetails';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function InsuranceDetails() {
  const { id } = useLocalSearchParams();

  return <InsuranceDetailsScreen id={id.toString()}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
