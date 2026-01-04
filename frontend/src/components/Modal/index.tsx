import {
  Box,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Spacer,
} from '@chakra-ui/react';
import { CustomButton } from '../Button';
import { allModals, ModalType } from '@/types/modals';

type Props = {
  isOpen: boolean;
  type: ModalType;
  toggleModal: () => void;
};

const Modal = ({ isOpen, type, toggleModal }: Props) => {
  const Form = allModals[type].form;

  return (
    <Dialog.Root size={'sm'} open={isOpen} placement={'center'} closeOnEscape>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            padding={'10px'}
            height={'400px'}
            backgroundColor={'#ffffff'}
          >
            <Dialog.Header>
              <Dialog.Title>{allModals[type].title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              padding={'10px'}
              display={'flex'}
              width={'100%'}
              flexDir={'column'}
              gap={'20px'}
            >
              <Box>{allModals[type].text}</Box>
              <Form />
            </Dialog.Body>
            <Dialog.Footer display={'flex'} gap={'20px'} width={'100%'}>
              <Dialog.ActionTrigger asChild>
                <CustomButton variant="close" onClick={() => toggleModal()}>
                  Cancel
                </CustomButton>
              </Dialog.ActionTrigger>
              {/* <CustomButton variant={'save'}>Save</CustomButton> */}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={() => toggleModal()} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
