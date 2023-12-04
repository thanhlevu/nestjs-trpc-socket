import { create } from 'zustand';
import { Euc } from '../trpc';

interface EucState {
  eucList: Euc[];
  updateEucList: (eucs: Euc[]) => void;
  addEuc: (newEuc: Euc) => void;
  updateEuc: (updatedEuc: Euc) => void;
  removeEuc: (eucId: string) => void;
  editEucId: string | null;
  updateEucId: (eucId: string | null) => void;
}

export const useEucStore = create<EucState>((set) => ({
  eucList: [],
  updateEucList: (eucList) => set(() => ({ eucList })),
  addEuc: (newEuc: Euc) =>
    set((state) => ({ eucList: [...state.eucList, newEuc] })),
  updateEuc: (updatedEuc: Euc) =>
    set((state) => ({
      eucList: state.eucList.map((euc) =>
        euc.id === updatedEuc.id ? updatedEuc : euc,
      ),
    })),
  removeEuc: (eucId: string) =>
    set((state) => ({
      eucList: state.eucList.filter((euc) => euc.id !== eucId),
    })),
  editEucId: null,
  updateEucId: (eucId: string | null) =>
    set(() => ({
      editEucId: eucId,
    })),
}));
