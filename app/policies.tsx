import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PoliciesScreen() {
  return (
    <View style={styles.container}>
      {/* Gradient Background Header */}
      <LinearGradient
        colors={['#0088cc', '#005c99']}
        style={styles.headerGradient}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.benefitsHeader}>
            <Text style={styles.benefitsTitle}>Quyền lợi</Text>
            <Ionicons name="chevron-up" size={24} color="#000" />
          </View>

          {/* Medical Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1) Hỗ trợ y tế do tai nạn</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• Chi phí y tế: </Text>
              <Text style={styles.normalText}>
                Chi trả theo chi phí thực tế hợp lý tối đa đến số tiền bảo hiểm, lên đến{' '}
                <Text style={styles.highlight}>10 triệu đồng/năm</Text>
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• Trợ cấp nằm viện (bao gồm cả khoa chăm sóc đặc biệt): </Text>
              <Text style={styles.normalText}>
                Chi trả 1 khoản cố định/ngày, không vượt quá số tiền bảo hiểm/năm, lên đến{' '}
                <Text style={styles.highlight}>250.000 VND/ngày</Text> nằm viện
              </Text>
            </View>
          </View>

          {/* Permanent Disability Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2) Thương tật vĩnh viễn do tai nạn: </Text>
            <Text style={styles.normalText}>
              Chi trả theo bảng tỷ lệ trả tiền thương tật với số tiền bảo hiểm, lên đến{' '}
              <Text style={styles.highlight}>200 triệu đồng/năm</Text>
            </Text>
          </View>

          {/* Death Benefits Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3) Tử vong do tai nạn:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• Tai nạn thông thường: </Text>
              <Text style={styles.normalText}>
                Chi trả toàn bộ số tiền bảo hiểm, lên đến{' '}
                <Text style={styles.highlight}>200 triệu đồng/năm</Text>
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• Tai nạn hành khách trên phương tiện công cộng: </Text>
              <Text style={styles.normalText}>
                Chi trả toàn bộ số tiền bảo hiểm, lên đến{' '}
                <Text style={styles.highlight}>400 triệu đồng/năm</Text>
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• Tai nạn hành khách trên phương tiện giao thông đường hàng không: </Text>
              <Text style={styles.normalText}>
                Chi trả toàn bộ số tiền bảo hiểm, lên đến{' '}
                <Text style={styles.highlight}>600 triệu đồng/năm</Text>
              </Text>
            </View>
          </View>

          {/* Note Section */}
          <View style={styles.section}>
            <Text style={styles.noteTitle}>Lưu ý trường hợp súc vật, động vật cắn: </Text>
            <Text style={styles.normalText}>
              Thanh toán các chi phí phát sinh hợp lý và cần thiết
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    height: 200,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    marginTop: 120,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  benefitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  bulletPoint: {
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 15,
    fontWeight: '500',
  },
  normalText: {
    fontSize: 15,
    lineHeight: 22,
  },
  highlight: {
    fontWeight: '600',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});