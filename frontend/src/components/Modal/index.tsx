import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { CustomButton } from '../Button';

type Props = {
  text: string;
  isOpen: boolean;
  title: string;
  toggleModal: () => void;
};
const Modal = ({ text, isOpen, title, toggleModal }: Props) => {
  return (
    <Dialog.Root size={'md'} open={isOpen} placement={'center'} closeOnEscape>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content padding={'10px'} height={'400px'}>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{text}</p>
            </Dialog.Body>
            <Dialog.Footer display={'flex'} gap={'20px'} width={'100%'}>
              <Dialog.ActionTrigger asChild>
                <CustomButton variant="close" onClick={() => toggleModal()}>
                  Cancel
                </CustomButton>
              </Dialog.ActionTrigger>
              <CustomButton variant={'save'}>Save</CustomButton>
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
