import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  contentPadding: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  termCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 5,
  },
  termCardContent: {
    padding: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 20,
  },
  bottomBuyInsur: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    maxHeight: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  bottomBuyInsurContent: {
    padding: 20,
  }
});
