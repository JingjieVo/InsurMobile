import { Product } from "@/type/productType";
import { router } from "expo-router";
import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
  LogBox,
} from "react-native";
import RenderHtml from "react-native-render-html";
import insurLogo from "@/assets/images/react-logo.png";

const source = {
  html: `
<div><ol><li>Điểm nổi bật 1</li><li>Điểm nổi bật 1</li><li>Điểm nổi bật 1</li><li>Điểm nổi bật 1</li></ol></div>`,
};

export default function InsuraceCard({ product }: { product: Product }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        <View style={styles.insuranceCard}>
          <View>
            <Text style={styles.cardTitle}>
              {product.name} {product.id}
            </Text>
            <Text style={styles.cardAmount}>901.250.000 vnd</Text>
          </View>
          <Image source={insurLogo} style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Điểm nổi bật</Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: product.highlight }}
          />
        </View>

        <View style={styles.feeSection}>
          <Text style={styles.feeTitle}>Phí bảo hiểm</Text>
          <Text style={styles.feeAmount}>{product.price} vnd</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() =>
              router.navigate({
                pathname: `/insurance/[id]`,
                params: { id: product.id.toString() },
              })
            }
          >
            <Text style={styles.buttonText}>Xem thêm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.introduceButton}>
            <Text style={styles.buttonText}>Giới Thiệu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#002850",
    borderRadius: 15,
    padding: 16,
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
