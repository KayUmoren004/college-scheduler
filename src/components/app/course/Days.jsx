import { TouchableOpacity, Text, View } from "react-native";
import Colors from "../../../utils/Colors";

const Days = ({
  onPress,
  title,
  selectedColor = Colors.lavenderBlue,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
      disabled={disabled}
    >
      <View
        style={{
          height: 60,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
          borderColor: Colors.lavenderBlue,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: disabled ? selectedColor : "#000",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "200",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Days;
