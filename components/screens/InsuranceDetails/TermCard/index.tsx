import { globalStyles } from "@/components/style/GlobalStyle";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";

interface TermCardProps {
  icon: React.FC<SvgProps>;
  termName: string;
  termAmount: string;
}

export default function TermCard(props: TermCardProps) {
  return (
    <TouchableOpacity style={globalStyles.termCard}>
      <View style={globalStyles.termCardContent}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <props.icon
          style={{ backgroundColor: '#E6EFFF', borderRadius: 40}}
            width={50}
            height={50}
          />
        </View>
        <View style={{flex: 2}}>
          <Text style={{fontWeight: 'medium', fontSize: 12}}>{props.termName}</Text>
          <Text style={{fontWeight: '900', fontSize: 20}}>{props.termAmount} VND</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
