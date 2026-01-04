import { Flex, Spacer, Text } from '@chakra-ui/react';
import { CustomButton } from '../Button';
import Library from '@/types/library';
import { ModalType, modalTypes } from '@/types/modals';
import DeleteLibraryForm from '../DeleteLibraryModal';
import DeleteLibraryModal from '../DeleteLibraryModal';
import AddLibraryModal from '../AddLibraryModal';
import { useModalStore } from '@/store/modalStore';
import { useState } from 'react';

type Props = {
  library: Library;
  toggleModal: () => void;
  changeModalType: (modalType: ModalType) => void;
};

const LibraryItem = ({ library, toggleModal, changeModalType }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDeleteModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const { modalType } = useModalStore();

  return (
    <Flex
      flexDir={'column'}
      width={'200px'}
      height={'100px'}
      padding={'5px'}
      border={'1px solid black'}
    >
      <Text>{library.name}</Text>
      <Text>{library.address}</Text>
      <Spacer />
      <Flex
        flexDir={'row'}
        gap={'10px'}
        width={'100%'}
        justifyContent={'flex-end'}
      >
        <CustomButton
          size={'sm'}
          variant={'edit'}
          onClick={() => {
            toggleModal();
            changeModalType('EDIT_LIBRARY');
          }}
        >
          Edit
        </CustomButton>
        <CustomButton
          size={'sm'}
          variant={'delete'}
          onClick={() => {
            toggleDeleteModal();
            changeModalType('DELETE_LIBRARY');
          }}
        >
          Delete
        </CustomButton>
      </Flex>
      {modalType === modalTypes.DELETE_LIBRARY && (
        <DeleteLibraryForm
          id={library.id}
          isOpen={isOpen}
          toggleDeleteModal={toggleDeleteModal}
          type={modalTypes.DELETE_LIBRARY}
        />
      )}
    </Flex>
  );
};

export default LibraryItem;
