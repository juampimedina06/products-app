import { create } from "zustand";



interface TemporalCameraStore {
    selectedImagens: string[]; //se guarda la imagen temporalmente

    AddSelectedImage: (image: string) => void;
    clearImages: () => void;
}


export const useCameraStore = create<TemporalCameraStore>((set) => ({
    selectedImagens: [],
    AddSelectedImage: (image: string) => {
        set((state) => ({
            selectedImagens: [...state.selectedImagens, image]
        }))
    },
    clearImages: () => {
        set(() => ({
            selectedImagens: []
        }))
    }
}))