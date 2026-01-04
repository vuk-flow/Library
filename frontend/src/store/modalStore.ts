import { ModalType } from '@/types/modals';
import { create } from 'zustand';

type ModalStore = {
  modalType: ModalType | null;
  setModalType: (type: ModalType | null) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,

  setModalType: (type) => set({ modalType: type }),
}));
