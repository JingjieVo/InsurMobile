import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { ContractListItem } from "@/components/ContractListItem";
import { Contract } from "@/type/contractType";
import { getUserContracts } from "@/services/contractService";
import { FontAwesome } from "@expo/vector-icons";
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from "@/components/ScreenHeader";

export default function ContractListScreen() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await getUserContracts();
      const data = response;
      if (data.status === "OK") {
        setContracts(data.data);
      } else {
        setError("Failed to fetch contracts");
      }
    } catch (err) {
      setError("An error occurred while fetching contracts");
    } finally {
      setLoading(false);
    }
  };

  const handleContractPress = (contract: Contract) => {
    router.push(`/contract/${contract.id}`);
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center" }}
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Hợp đồng"/>
      <FlatList
        data={contracts}
        renderItem={({ item }) => (
          <ContractListItem contract={item} onPress={handleContractPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    padding: 16,
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
});
