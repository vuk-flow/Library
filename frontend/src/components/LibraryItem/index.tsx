import { Flex, Spacer, Text } from '@chakra-ui/react';
import { CustomButton } from '../Button';
import Library from '@/types/library';
import { ModalTexts, ModalTitles } from '@/types/modals';

type Props = {
  library: Library;
  toggleModal: () => void;
  chnageModalInfo: (text: string, title: string) => void;
};
const LibraryItem = ({ library, toggleModal, chnageModalInfo }: Props) => {
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
            chnageModalInfo(ModalTexts.EDIT, ModalTitles.EDIT);
          }}
        >
          Edit
        </CustomButton>
        <CustomButton
          size={'sm'}
          variant={'delete'}
          onClick={() => {
            toggleModal();
            chnageModalInfo(ModalTexts.DELETE, ModalTexts.DELETE);
          }}
        >
          Delete
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default LibraryItem;
