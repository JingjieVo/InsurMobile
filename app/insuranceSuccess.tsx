import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface PaymentDetails {
  refNumber: string;
  paymentTime: string;
  paymentMethod: string;
  senderName: string;
  amount: number;
  adminFee: number;
  totalPrice: number;
}

export default function InsuranceSuccessScreen() {
  const params = useLocalSearchParams();
  const paymentDetails: PaymentDetails = JSON.parse(params.paymentDetails as string);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark" size={32} color="#fff" />
          </View>
        </View>

        <Text style={styles.successText}>Payment Success!</Text>
        
        <Text style={styles.amount}>
          IDR {paymentDetails.totalPrice.toLocaleString()}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ref Number</Text>
            <Text style={styles.detailValue}>{paymentDetails.refNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Time</Text>
            <Text style={styles.detailValue}>{paymentDetails.paymentTime}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <Text style={styles.detailValue}>{paymentDetails.paymentMethod}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sender Name</Text>
            <Text style={styles.detailValue}>{paymentDetails.senderName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Insurance Amount</Text>
            <Text style={styles.detailValue}>
              IDR {paymentDetails.amount.toLocaleString()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Admin Fee</Text>
            <Text style={styles.detailValue}>
              IDR {paymentDetails.adminFee.toFixed(2)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, styles.totalLabel]}>Total Price</Text>
            <Text style={[styles.detailValue, styles.totalValue]}>
              IDR {paymentDetails.totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBackToHome}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 32,
  },
  detailsContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  backButton: {
    backgroundColor: '#FF69B4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

