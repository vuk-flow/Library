export const Modals = {
  SUBMIT: 'SUBMIT',
  DELETE: 'DELETE',
  EDIT: 'EDIT',
} as const;

export type Modal = (typeof Modals)[keyof typeof Modals];

export const ModalTexts = {
  DELETE: 'Are you sure you want to delete data?',
  EDIT: 'Are you sure you want edit data?',
  ADD_LIBRARY: 'Add a new library.',
};
export const ModalTitles = {
  DELETE: 'Delete the library?',
  EDIT: 'Edit the library?',
  ADD_LIBRARY: 'Add a library.',
};
export type ModalText = (typeof ModalTexts)[keyof typeof ModalTexts];
export type ModalTitle = (typeof ModalTitles)[keyof typeof ModalTitles];
