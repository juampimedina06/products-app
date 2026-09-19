import { productsApi } from "@/core/api/productsApi";
import axios from "axios";
import { User } from "../interface/user";

export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

const returnUserToken = (data: AuthResponse): {
    user: User;
    token: string;
} => {

    // const { id, email, fullName, isActive, roles, token } = data;
    const { token, ...user } = data;

    // const user: User = {
    //     id,
    //     email,
    //     fullName,
    //     isActive,
    //     roles,
    // }

    return {
        user,
        token
    }
}

export const authLogin = async (email: string, password: string) => {

    email = email.toLocaleLowerCase();

    try {

        const { data } = await productsApi.post<AuthResponse>('/auth/login', {
            email,
            password
        });

        return returnUserToken(data);

    } catch (error) {
        console.error('Error en authLogin:', error);
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await productsApi.get<AuthResponse>('/auth/check-status');

        return returnUserToken(data);

    } catch (error) {
        return null;
    }
}


export const authRegister = async (fullName: string, email: string, password: string) => {
    email = email.toLocaleLowerCase();
    try {

        const { data } = await productsApi.post<AuthResponse>('/auth/register', {
            fullName,
            email,
            password
        });

        const { user, token } = returnUserToken(data);
        return { ok: true as const, user, token };

    } catch (error) {
        console.error('Error en authRegister:', error);
        let message = 'Error al crear la cuenta';

        if (axios.isAxiosError(error)) {
            const backendMessage = error.response?.data?.message;
            if (Array.isArray(backendMessage)) {
                message = backendMessage[0];
            } else if (typeof backendMessage === 'string') {
                message = backendMessage;
            }
        }

        // Mapeo amigable para el usuario
        if (message.includes('The password must have a Uppercase, lowercase letter and a number')) {
            message = 'La contraseña debe incluir al menos una mayúscula, una minúscula y un número';
        } else if (message.includes('already exists') || message.includes('ya existe')) {
            message = 'Este correo electrónico ya está registrado';
        }

        return { ok: false as const, message };
    }
}