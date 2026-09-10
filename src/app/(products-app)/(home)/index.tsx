import { useTheme } from "expo-router";
import { View } from "react-native";
import { ThemedText } from "../../../presentation/theme/components/themed-text";


const HomeScreen = () => {

  const primary = useTheme().colors.primary;

  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "MonserratBold", color: primary }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "MonserratRegular" }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "MonserratThin" }}>HomeScreen</ThemedText>
      <ThemedText >HomeScreen</ThemedText>
    </View>
  );
};

export default HomeScreen;
