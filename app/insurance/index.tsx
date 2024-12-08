
import InsuranceList from "@/components/screens/InsuranceList";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";

export default function Insurance() {
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
      <InsuranceList />
    </Suspense>
  );
}
