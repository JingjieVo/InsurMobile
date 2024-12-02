import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InsuranceBenefit } from "@/type/insuraceType";
import { router } from 'expo-router';

interface Props {
  benefit: InsuranceBenefit;
}

export const BenefitCard = ({ benefit }: Props) => {
  return (
    <TouchableOpacity onPress={() => router.push('/benefit')} style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="heart-half" size={24} color="#FF6B6B" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{benefit.name}</Text>
        <Text style={styles.description}>{benefit.description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>
          {benefit.amount.toLocaleString('vi-VN')} vnd
        </Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Đang hiệu lực</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
});

