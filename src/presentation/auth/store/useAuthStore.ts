import { authCheckStatus, authLogin, authRegister } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    register: (fullname: string, email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;

    changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    //Properties
    status: "checking",
    token: undefined,
    user: undefined,

    changeStatus: async (token?: string, user?: User) => {
        if (!token || !user) {
            set({
                status: "unauthenticated",
                token: undefined,
                user: undefined
            })
            await SecureStorageAdapter.deleteItem('token')
            return false;
        }

        set({
            status: "authenticated",
            token: token,
            user: user
        })

        await SecureStorageAdapter.setItem('token', token)

        return true;
    },
    //Actions
    register: async (fullname: string, email: string, password: string) => {
        const resp = await authRegister(fullname, email, password);
        if (!resp.ok) {
            return { ok: false, message: resp.message };
        }
        await get().changeStatus(resp.token, resp.user);
        return { ok: true };
    },
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        return get().changeStatus(resp?.token, resp?.user);
    },
    checkStatus: async () => {

        const resp = await authCheckStatus();
        get().changeStatus(resp?.token, resp?.user);
    },
    logout: async () => {
        SecureStorageAdapter.deleteItem('token')

        set({
            status: "unauthenticated",
            token: undefined,
            user: undefined
        })
    }
}));