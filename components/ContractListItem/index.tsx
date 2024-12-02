import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Contract } from "@/type/contractType";

interface Props {
  contract: Contract;
  onPress: (contract: Contract) => void;
}

export const ContractListItem: React.FC<Props> = ({ contract, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(contract)}>
      <View style={styles.header}>
        <Text style={styles.productName}>{contract.productName}</Text>
        <Text style={styles.status}>
          {contract.status === 1 ? 'Đang hiệu lực' : 'Hết hiệu lực'}
        </Text>
      </View>
      <Text style={styles.providerName}>{contract.providerName}</Text>
      <Text style={styles.categoryName}>{contract.categoryName}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          {contract.price.toLocaleString('vi-VN')} VND
        </Text>
        <Text style={styles.date}>
          {new Date(contract.startDate).toLocaleDateString('vi-VN')} - 
          {new Date(contract.endDate).toLocaleDateString('vi-VN')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#4CAF50',
  },
  providerName: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

