import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from '@expo/vector-icons/Ionicons';
const InsuranceCardScreen = ({ }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thẻ Bảo Hiểm</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <FontAwesome name="download" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="time" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.noCardContainer}>
          <View style={styles.iconContainer}>
            <Icon name="shield-outline" size={40} color="#B0C4DE" />
          </View>
          <Text style={styles.noCardText}>Bạn Chưa Có Thẻ</Text>
          <Text style={styles.noCardText}>Bảo Hiểm Nào</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>Thông tin thẻ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Địa chỉ nộp hồ sơ</Text>
          </TouchableOpacity>
        </View>

        {/* Hospital List */}
        <View style={styles.hospitalSection}>
          <Text style={styles.hospitalTitle}>DANH SÁCH BỆNH VIỆN BẢO LÃNH</Text>
          <TouchableOpacity style={styles.hospitalItem}>
            <View style={styles.hospitalInfo}>
              <Icon name="business-outline" size={24} color="#000" />
              <View style={styles.hospitalTextContainer}>
                <Text style={styles.hospitalItemTitle}>
                  Số lượng bệnh viện bảo lãnh{'\n'}trên toàn quốc
                </Text>
                <Text style={styles.hospitalCount}>0 bệnh viện</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={24} color="#C0C0C0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity onPress={() => router.push('/claimRequest')} style={styles.bottomButton}>
        <Icon name="time" size={24} color="#fff" />
        <Text style={styles.bottomButtonText}>Yêu Cầu Bồi Thường</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  noCardContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  noCardText: {
    fontSize: 16,
    color: '#808080',
    lineHeight: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    textAlign: 'center',
    color: '#808080',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  hospitalSection: {
    backgroundColor: '#fff',
    padding: 16,
  },
  hospitalTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  hospitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
  },
  hospitalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalTextContainer: {
    marginLeft: 16,
  },
  hospitalItemTitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  hospitalCount: {
    fontSize: 14,
    color: '#000',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF69B4',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default InsuranceCardScreen;