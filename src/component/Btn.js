import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Btn({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        width: 350,
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 14,
        borderRadius: 100, 
      }}
    >
      <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", textTransform: 'uppercase' }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
