import BackButton from "@/components/Share/BackButton";
import ScreenContainer from "@/components/Share/ScreenContainer";

import insurLogo from "@/assets/images/react-logo.png";
import TermIcon from "@/components/icons/term.svg";
import { globalStyles } from "@/components/style/GlobalStyle";
import { getProductById } from "@/services/productService";
import { ProductDetailResponse } from "@/type/productType";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BottomBuyInsur from "./BottomBuyInsur";
import TermCard from "./TermCard";

export default function InsuranceDetailsScreen(props: { id: string }) {
  const [product, setProduct] = useState<ProductDetailResponse>();
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProductById(props.id);
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetch();
  }, []);
  return (
    <ScreenContainer>
      <View style={styles.backButton}>
        <BackButton fill="white"/>
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
      {/* <Text>Details of insurance {props.id} </Text> */}
      <ScrollView
        style={[globalStyles.contentPadding, styles.backgroundContent]}
      >
        <Text style={{ fontSize: 30, fontWeight: "800", marginVertical: 20 }}>Quyền lợi chính</Text>
        {product?.mainTerms?.length !== 0 ? (
          product?.mainTerms?.map((term, index) => (
            <TermCard
              key={term.id}
              termName={term.name}
              termAmount={term.amount.toString()}
              icon={TermIcon}
            />
          ))
        ) : (
          <View
            style={{
              minHeight: 150,
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 20,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Gói bảo hiểm hiện không có quyền lợi nào
            </Text>
          </View>
        )}
        <Text style={{ fontSize: 30, fontWeight: "800", marginVertical: 20 }}>Quyền lợi phụ</Text>
        {product?.sideTerms?.length !== 0 ? (
          product?.sideTerms?.map((term, index) => (
            <TermCard
              key={term.id}
              termName={term.name}
              termAmount={term.amount.toString()}
              icon={TermIcon}
            />
          ))
        ) : (
          <View
            style={{
              minHeight: 150,
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 20,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Gói bảo hiểm hiện không có quyền lợi nào
            </Text>
          </View>
        )}
      </ScrollView>
      <BottomBuyInsur price={product?.price.toString() || "None"}/>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backgroundContent: {
    flex: 1,
    backgroundColor: "#F2F6FF",
  },
  backButton: {
    position: "absolute",
    top: 18,
    left: 18,
    zIndex: 20,
  },
  insuranceCard: {
    // position: 'static',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#002850",
    height: 200,
    paddingTop: 64,
    // paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // marginBottom: 20,
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
