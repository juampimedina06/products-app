import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AnimatedSplashOverlay } from "../presentation/theme/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    MonserratBold: require("@/assets/fonts/MontserratAlternates-Bold.ttf"),
    MonserratRegular: require("@/assets/fonts/MontserratAlternates-Regular.ttf"),
    MonserratThin: require("@/assets/fonts/MontserratAlternates-Thin.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{
        headerShown: false,
      }}>

      </Stack>
    </ThemeProvider>
  );
}

