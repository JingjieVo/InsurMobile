import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import InsuraceCard from "@/components/InsuranceCard";
import backgroundImage from "@/assets/images/background.jpg";
import { getProducts } from "@/services/productService";
import ScreenHeader from "@/components/Share/ScreenHeader";
import ScreenContainer from "@/components/Share/ScreenContainer";
import { ProductsResponse } from "@/type/productType";

export default function InsuranceList() {
  const [products, setProducts] = useState<ProductsResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <ScreenContainer>
      {/* Header with Blur */}
      <ScreenHeader screenTitle="Bảo hiểm sức khỏe" />

      {/* Content */}
      {products?.content.length === 0 ? (
        <View>
          <Text>Không tìm thấy sản phẩm nào</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {products?.content.map((item, index) => (
            <InsuraceCard key={index} product={item} />
          ))}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    margin: 18,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  content: {
    padding: 20,
  },
  insuranceCard: {
    backgroundColor: "#002850",
    borderRadius: 15,
    padding: 20,
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
    position: "absolute",
    top: 10,
    right: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  feeSection: {
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  feeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  feeAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewMoreButton: {
    backgroundColor: "#FF7CB3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  introduceButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});
