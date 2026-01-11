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
  DELETE_LIBRARY: 'Delete the library.',
  EDIT_LIBRARY: 'Edit the library.',
  ADD_LIBRARY: 'Add a library.',
} as const;

export type ModalTitle = (typeof modalTitle)[keyof typeof modalTitle];

export type ModalInfo = {
  text: ModalText;
  title: ModalTitle;
};

export type AllModals = {
  [K in ModalType]: ModalInfo;
};

export const allModals: AllModals = {
  [modalTypes.ADD_LIBRARY]: {
    title: modalTitle.ADD_LIBRARY,
    text: modalText.ADD_LIBRARY,
  },
  [modalTypes.EDIT_LIBRARY]: {
    title: modalTitle.EDIT_LIBRARY,
    text: modalText.EDIT_LIBRARY,
  },
  [modalTypes.DELETE_LIBRARY]: {
    title: modalTitle.DELETE_LIBRARY,
    text: modalText.DELETE_LIBRARY,
  },
};
