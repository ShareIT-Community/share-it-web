import { create } from 'zustand';

interface UIState {
    showForm: boolean;
    openForm: () => void;
    closeForm: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    showForm: false,
    openForm: () => set({ showForm: true }),
    closeForm: () => set({ showForm: false }),
}));
