import { Flex, Spacer, Text } from '@chakra-ui/react';
import { CustomButton } from '../Button';
import Library from '@/types/library';
import { ModalType } from '@/types/modals';

type Props = {
  library: Library;
  toggleModal: () => void;
  changeModalType: (modalType: ModalType) => void;
};
const LibraryItem = ({ library, toggleModal, changeModalType }: Props) => {
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
            toggleModal();
            changeModalType('DELETE_LIBRARY');
          }}
        >
          Delete
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default LibraryItem;
