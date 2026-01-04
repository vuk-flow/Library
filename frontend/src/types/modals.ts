import AddLibraryForm from '@/components/AddLibraryForm';
import React from 'react';
import Library from './library';
import DeleteLibraryForm from '@/components/DeleteLibraryModal';

export const modalTypes = {
  ADD_LIBRARY: 'ADD_LIBRARY',
  DELETE_LIBRARY: 'DELETE_LIBRARY',
  EDIT_LIBRARY: 'EDIT_LIBRARY',
} as const;

export type ModalType = (typeof modalTypes)[keyof typeof modalTypes];

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

type FormProps = {
  ADD_LIBRARY: { refreshLibraries: (data: Library) => void };
  EDIT_LIBRARY: {};
  DELETE_LIBRARY: { refreshLibraries: (data: Library) => void };
};

export type ModalForm = {
  [K in ModalType]: React.FC<FormProps[K]>;
};

const dummy = () => {
  return null;
};
const modalForm: ModalForm = {
  ADD_LIBRARY: AddLibraryForm,
  EDIT_LIBRARY: dummy,
  DELETE_LIBRARY: DeleteLibraryForm,
};

export type ModalInfo<K extends ModalType = ModalType> = {
  text: ModalText;
  title: ModalTitle;
  form: ModalForm[K];
};

export type AllModals = {
  [K in ModalType]: ModalInfo<K>;
};

export const allModals: AllModals = {
  [modalTypes.ADD_LIBRARY]: {
    title: modalTitle.ADD_LIBRARY,
    text: modalText.ADD_LIBRARY,
    form: modalForm.ADD_LIBRARY,
  },
  [modalTypes.EDIT_LIBRARY]: {
    title: modalTitle.EDIT_LIBRARY,
    text: modalText.EDIT_LIBRARY,
    form: modalForm.EDIT_LIBRARY,
  },
  [modalTypes.DELETE_LIBRARY]: {
    title: modalTitle.DELETE_LIBRARY,
    text: modalText.DELETE_LIBRARY,
    form: modalForm.DELETE_LIBRARY,
  },
};
