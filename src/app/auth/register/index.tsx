import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemeButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from "react-native";

const RegisterScreen = () => {

  const { register } = useAuthStore();

  const { height } = useWindowDimensions()
  const backgroundColor = useTheme().background

  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const onRegister = async () => {
    const { fullName, email, password } = form;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }

    setErrorMessage(null);
    setIsPosting(true)

    const resp = await register(fullName, email, password)
    setIsPosting(false)

    if (resp.ok) {
      router.replace('/')
      return
    }

    setErrorMessage(resp.message || 'No se pudo crear la cuenta.');
  }


  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor
        }}
      >
        <View style={{
          paddingTop: height * 0.22
        }}>
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey' }}>Por favor crea una cuenta para continuar</ThemedText>
        </View>

        {/* Inputs */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre Completo"
            autoCapitalize="words"
            icon="person-outline"
            value={form.fullName}
            onChangeText={(value) => {
              setErrorMessage(null);
              setForm({ ...form, fullName: value });
            }}
          />
          <ThemedTextInput
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => {
              setErrorMessage(null);
              setForm({ ...form, email: value });
            }}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => {
              setErrorMessage(null);
              setForm({ ...form, password: value });
            }}
          />
        </View>

        {/* Mensaje de error debajo del form */}
        {errorMessage && (
          <ThemedText
            type="small"
            style={{
              color: '#dc2626',
              marginTop: 10,
              textAlign: 'center',
              fontWeight: '600'
            }}
          >
            {errorMessage}
          </ThemedText>
        )}

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Boton */}
        <ThemeButton
          icon="arrow-forward"
          onPress={onRegister}
          disabled={isPosting}
        >
          Crear cuenta
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
          <ThemedText type="small">Ya tienes cuenta?</ThemedText>
          <ThemedLink href='/auth/login' style={{ marginHorizontal: 10 }}>
            Ingresar
          </ThemedLink>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
