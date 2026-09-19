import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemeButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from "react-native";
import { ThemedText } from "../../../presentation/theme/components/themed-text";

const LoginScreen = () => {

  const { login } = useAuthStore();

  const { height } = useWindowDimensions()
  const backgroundColor = useTheme().background

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onLogin = async () => {
    const { email, password } = form;
    console.log({ email, password })

    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsPosting(true)

    const wasSuccessful = await login(email, password)
    setIsPosting(false)

    if (wasSuccessful) {
      router.replace('/')
      return
    }

    Alert.alert('Error', 'Usuario o contraseña incorrectos')
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
    >
      <ScrollView style={{
        paddingHorizontal: 30,
        backgroundColor: backgroundColor
      }}>
        <View style={{
          paddingTop: height * 0.22
        }}>
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: 'grey' }}>Por favor ingrese para continuar</ThemedText>
        </View>

        {/* {Email y passwor} */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"

            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"

            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Boton */}
        <ThemeButton
          icon="arrow-forward"
          onPress={onLogin}
          disabled={isPosting}
        >
          Ingresar
        </ThemeButton>

        {/* Spacer */}
        <View style={{ marginTop: 40 }} />

        {/* Enlace a registro */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ThemedText type="small">No tienes cuenta?</ThemedText>
          <ThemedLink href='/auth/register' style={{ marginHorizontal: 10 }}>
            Crear cuenta
          </ThemedLink>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
