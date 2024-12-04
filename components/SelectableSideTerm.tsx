import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface SelectableSideTermProps {
  id: number;
  name: string;
  amount: string;
  price: number;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

export const SelectableSideTerm: React.FC<SelectableSideTermProps> = ({
  id,
  name,
  amount,
  price,
  isSelected,
  onToggle,
}) => {
  return (
    <TouchableOpacity onPress={() => onToggle(id)} style={styles.container}>
      <View style={styles.benefitIcon}>
        <FontAwesome6 name="feather" size={24} color="#000" />
      </View>
      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>{name}</Text>
        <Text style={styles.benefitAmount}>{amount}</Text>
        <Text style={styles.benefitPrice}>+{price.toLocaleString('vi-VN')} VND</Text>
      </View>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <FontAwesome6 name="check" size={16} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  benefitAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  benefitPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#002D84',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#002D84',
  },
});

