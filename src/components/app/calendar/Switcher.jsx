import React from "react";

// Dependencies
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../../utils/Colors";

const Switcher = ({ onPress, day, selected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderColor: Colors.ashGray,
          borderBottomWidth: selected ? 2 : 0,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 30, fontWeight: "200" }}>
          {day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Switcher;
