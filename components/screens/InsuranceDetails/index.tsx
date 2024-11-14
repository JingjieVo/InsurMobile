import BackButton from "@/components/Share/BackButton";
import ScreenContainer from "@/components/Share/ScreenContainer";
import ScreenHeader from "@/components/Share/ScreenHeader";

import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import insurLogo from "@/assets/images/react-logo.png";
import { useEffect, useState } from "react";
import { Product } from "@/type/productType";
import { getProductById } from "@/services/productService";

export default function InsuranceDetailsScreen(props: { id: string }) {
  const [product, setProduct] = useState<Product>()
  useEffect( () => {
    const fetch = async () => {
      try {
        const data = await getProductById(props.id);
        setProduct(data);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetch();
  },[])
  return (
    <ScreenContainer>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.insuranceCard}>
        <View>
          <Text style={styles.cardTitle}>
            {product?.name} {product?.id}
          </Text>
          <Text style={styles.cardAmount}>901.250.000 vnd</Text>
        </View>
        <Image source={insurLogo} style={styles.logo} />
      </View>
      <Text>Details of insurance {props.id} </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 18,
    left: 18,
    zIndex: 20,
  },
  insuranceCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#002850",
    paddingTop: 64,
    paddingBottom: 32,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: "#FFF",
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
