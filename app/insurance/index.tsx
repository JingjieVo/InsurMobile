import InsuranceList from "@/components/screens/InsuranceList";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";

export default function Insurance() {
  const { providerIds, productName } = useLocalSearchParams();
  // console.log(providerIds)
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
      <InsuranceList providerIds={providerIds} productName={productName}/>
    </Suspense>
  );
}
