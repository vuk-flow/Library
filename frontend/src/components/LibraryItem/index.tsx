import { Flex, Spacer, Text } from '@chakra-ui/react';
import { CustomButton } from '../Button';
import Library from '@/types/library';
import { ModalType } from '@/types/modals';

type Props = {
  library: Library;
  openModal: (modalType: ModalType, id?: string) => void;
};

const LibraryItem = ({ library, openModal }: Props) => {
  return (
    <Flex
      flexDir={'column'}
      width={'200px'}
      height={'100px'}
      padding={'5px'}
      border={'1px solid black'}
    >
      <Text>Name: {library.name}</Text>
      <Text>Address: {library.address}</Text>
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
            openModal('EDIT_LIBRARY', library.id);
          }}
        >
          Edit
        </CustomButton>
        <CustomButton
          size={'sm'}
          variant={'delete'}
          onClick={() => {
            openModal('DELETE_LIBRARY', library.id);
          }}
        >
          Delete
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default LibraryItem;
