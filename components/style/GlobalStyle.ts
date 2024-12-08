import { ImageBackground, StyleSheet } from "react-native";

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
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 20,
  },
  bottomBuyInsur: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    maxHeight: 150,
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
  },
  accountScreenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  }
});
