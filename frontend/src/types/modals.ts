import AddLibraryForm from '@/components/AddLibraryForm';
import React from 'react';

export const modalType = {
  ADD_LIBRARY: 'ADD_LIBRARY',
  DELETE_LIBRARY: 'DELETE_LIBRARY',
  EDIT_LIBRARY: 'EDIT_LIBRARY',
} as const;

export type ModalType = (typeof modalType)[keyof typeof modalType];

export const modalText = {
  DELETE_LIBRARY: 'Are you sure you want to delete data?',
  EDIT_LIBRARY: 'Are you sure you want to edit data?',
  ADD_LIBRARY: 'Add a new library.',
} as const;

export type ModalText = (typeof modalText)[keyof typeof modalText];

export const modalTitle = {
  DELETE_LIBRARY: 'Delete the library?',
  EDIT_LIBRARY: 'Edit the library?',
  ADD_LIBRARY: 'Add a library.',
} as const;

export type ModalTitle = (typeof modalTitle)[keyof typeof modalTitle];

export type ModalForm = {
  [K in ModalType]: React.FC;
};

const dummy = () => {
  return null;
};
const modalForm: ModalForm = {
  ADD_LIBRARY: AddLibraryForm,
  EDIT_LIBRARY: dummy,
  DELETE_LIBRARY: dummy,
};

export type ModalInfo = {
  text: ModalText;
  title: ModalTitle;
  form: React.FC;
};

export type AllModals = {
  [K in ModalType]: ModalInfo;
};

export const allModals: AllModals = {
  [modalType.ADD_LIBRARY]: {
    title: modalTitle.ADD_LIBRARY,
    text: modalText.ADD_LIBRARY,
    form: modalForm.ADD_LIBRARY,
  },
  [modalType.EDIT_LIBRARY]: {
    title: modalTitle.EDIT_LIBRARY,
    text: modalText.EDIT_LIBRARY,
    form: modalForm.EDIT_LIBRARY,
  },
  [modalType.DELETE_LIBRARY]: {
    title: modalTitle.DELETE_LIBRARY,
    text: modalText.DELETE_LIBRARY,
    form: modalForm.DELETE_LIBRARY,
  },
};
