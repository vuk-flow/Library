import { Box, CloseButton, Dialog, Portal, Stack } from '@chakra-ui/react';
import { CustomButton } from '../Button';
import ApiCaller from '@/utils/apiCaller';
import { Methods } from '@/types/methods';
import Library from '@/types/library';
import { allModals, ModalType } from '@/types/modals';

const DeleteLibrary = async (id: string) => {
  try {
    const response = await ApiCaller(
      `libraries/delete-library/${id}`,
      Methods.DELETE,
    );

    const library: Library = response?.data satisfies Library;

    return library;
  } catch (err) {
    console.error(err);
  }
};

type Props = {
  isOpen: boolean;
  toggleDeleteModal: () => void;
  type: ModalType;
  id: string;
};

const DeleteLibraryModal = ({ isOpen, toggleDeleteModal, type, id }: Props) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await DeleteLibrary(id);
    toggleDeleteModal();
  };

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
              <form onSubmit={onSubmit}>
                <Stack gap="4" align="flex-start">
                  <CustomButton variant={'add'} size={'md'} type="submit">
                    Submit
                  </CustomButton>
                </Stack>
              </form>
            </Dialog.Body>
            <Dialog.Footer display={'flex'} gap={'20px'} width={'100%'}>
              <Dialog.ActionTrigger asChild>
                <CustomButton
                  variant="close"
                  onClick={() => toggleDeleteModal()}
                >
                  Cancel
                </CustomButton>
              </Dialog.ActionTrigger>
              {/* <CustomButton variant={'save'}>Save</CustomButton> */}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={() => toggleDeleteModal()} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteLibraryModal;
