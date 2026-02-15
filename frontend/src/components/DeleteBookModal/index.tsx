'use client';
import { allModals, ModalType } from '@/types/modals';
import { Dialog, Portal, Box, Stack, CloseButton } from '@chakra-ui/react';
import { CustomButton } from '../Button';
import { Methods } from '@/types/methods';
import ApiCaller from '@/utils/apiCaller';
import Book from '@/types/book';

type Props = {
  isOpen: boolean;
  type: ModalType;
  id: string;
  closeModal: () => void;
};

const DeleteBookModal = ({ isOpen, type, closeModal, id }: Props) => {
  const DeleteBook = async (id: string) => {
    try {
      const response = await ApiCaller(
        `books/delete-book/${id}`,
        Methods.DELETE,
      );

      const deletedBook: Book = response?.data satisfies Book;

      return deletedBook;
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await DeleteBook(id);
    closeModal();
  };

  return (
    <Dialog.Root size={'sm'} open={isOpen} placement={'center'} closeOnEscape>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            padding={'10px'}
            height={'200px'}
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
                <Stack gap='4' align='flex-start'>
                  <CustomButton variant={'delete'} size={'sm'} type='submit'>
                    Delete
                  </CustomButton>
                </Stack>
              </form>
            </Dialog.Body>
            <Dialog.Footer display={'flex'} gap={'20px'} width={'100%'}>
              <Dialog.ActionTrigger asChild>
                <CustomButton variant='close' onClick={() => closeModal()}>
                  Cancel
                </CustomButton>
              </Dialog.ActionTrigger>
              {/* <CustomButton variant={'save'}>Save</CustomButton> */}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size='sm' onClick={() => closeModal()} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteBookModal;
