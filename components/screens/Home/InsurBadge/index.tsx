import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import ShieldUserIcon from "@/components/icons/shield-user.svg";
import ShieldPlusIcon from "@/components/icons/shield-plus.svg";
export default function insurBadge() {
  return (
    <View>
      <View style={styles.insurBadge}>
        <ShieldUserIcon width={40} height={40} fill={"#A0C0FC"} />
        <Text style={styles.text}>Bạn chưa có thẻ bảo hiểm</Text>
      </View>
      <View style={styles.buyButtonContainer}>
        <TouchableOpacity style={styles.buyButton}>
          <ShieldPlusIcon color={'white'} width={25} height={25}/>
          <Text style={{ color: "white", fontWeight: "500", fontSize: 16, paddingHorizontal: 5 }}>
            Mua bảo hiểm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  insurBadge: {
    backgroundColor: "#EFE7FE",
    borderWidth: 5,
    borderColor: "white",
    margin: 10,
    minHeight: 160,
    maxHeight: 170,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "gray",
    fontWeight: "600",
  },
  buyButtonContainer: {
    padding: 10,
  },
  buyButton: {
    width: "100%",
    // justifyContent: 'center',
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#387EFA",
    borderRadius: 15,
    flexDirection: 'row',
  },
});
