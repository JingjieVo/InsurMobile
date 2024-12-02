import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InsuranceContract } from '@/type/insuraceType';

interface Props {
  contract: InsuranceContract;
  onPress: (contract: InsuranceContract) => void;
}

export const UserInsuranceCard = ({ contract, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(contract)}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>AFFINA</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Đang hiệu lực</Text>
          </View>
        </View>
        
        <Text style={styles.contractNumber}>{contract.contractNumber}</Text>
        
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <Text style={styles.label}>Người được bảo hiểm</Text>
            <Text style={styles.value}>{contract.insuredPerson}</Text>
          </View>
          
          <View style={styles.footerSection}>
            <Text style={styles.label}>Ngày hết hạn:</Text>
            <Text style={styles.value}>{contract.expiryDate}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D1FF',
    marginRight: 6,
  },
  statusText: {
    color: '#333',
    fontSize: 12,
  },
  contractNumber: {
    color: 'white',
    fontSize: 18,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerSection: {
    flex: 1,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

