import LogoutButton from '@/presentation/auth/components/LogoutButton';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useTheme } from '@/presentation/theme/hooks/use-theme';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const CheckAuthenticationLayout = () => {

    const { status, checkStatus } = useAuthStore();
    const backgroundColor = useTheme().background

    useEffect(() => {
        checkStatus();
    }, []);

    if (status === 'checking') {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50
        }}>
            <ActivityIndicator />
        </View>
    }

    if (status === 'unauthenticated') {
        //Guardar la ruta del usuario
        return <Redirect href='/auth/login' />
    }

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: backgroundColor
                },
                contentStyle: {
                    backgroundColor: backgroundColor
                }
            }}
        >
            <Stack.Screen
                name='(home)/index'
                options={{
                    title: 'Productos',
                    headerLeft: () => <LogoutButton />
                }}
            />
            <Stack.Screen
                name='product/[id]'
                options={{
                    title: 'Producto',
                }}
            />
        </Stack>
    )


};

export default CheckAuthenticationLayout;
