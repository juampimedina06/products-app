import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync().catch(() => { });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useTheme().background


  const [fontsLoaded, fontError] = useFonts({
    MonserratBold: require("@/assets/fonts/MontserratAlternates-Bold.ttf"),
    MonserratRegular: require("@/assets/fonts/MontserratAlternates-Regular.ttf"),
    MonserratThin: require("@/assets/fonts/MontserratAlternates-Thin.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => { });
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ backgroundColor: backgroundColor, flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{
            headerShown: false,
          }}>
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>

  );
}

