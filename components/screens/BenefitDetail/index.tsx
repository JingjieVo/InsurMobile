import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';

export default function BenefitDetailScreen() {
  const { benefitId } = useLocalSearchParams();

  const benefitDetails = [
    {
      title: 'Tử vong, thương tật do tai nạn',
      amount: 150000000,
      description: 'Chi trả tỷ lệ % của STBH theo Bảng tỷ lệ trả tiền bảo hiểm thương tật của BSH: tối đa 150,000,000 VND',
    },
    {
      title: 'Thương tật thân thể vĩnh viễn do tai nạn',
      amount: 150000000,
      description: 'Chi trả tỷ lệ % của STBH theo Bảng tỷ lệ trả tiền bảo hiểm thương tật của BSH',
    },
    {
      title: 'Phẫu thuật do ốm đau, bệnh tật, thai sản',
      amount: 150000000,
      description: 'Chi trả chi phí điều trị thực tế không quá tỷ lệ % của STBH theo Bảng tỷ lệ trả tiền bảo hiểm thương tật của BSH',
    },
    {
      title: 'Thương tật thân thể tạm thời do tai nạn',
      amount: 150000000,
      description: 'Chi trả chi phí điều trị thực tế không quá tỷ lệ % của STBH theo Bảng tỷ lệ trả tiền bảo hiểm thương tật của BSH',
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader title='Chi tiết quyền lợi'/>

      <ScrollView style={styles.content}>
        {benefitDetails.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.benefitTitle}>{benefit.title}</Text>
            <Text style={styles.benefitAmount}>
              {benefit.amount.toLocaleString('vi-VN')} VND
            </Text>
            <Text style={styles.benefitDescription}>{benefit.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  benefitItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  benefitAmount: {
    fontSize: 20,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

