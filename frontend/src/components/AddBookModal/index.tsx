'use client';
import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { CustomButton } from '../Button';
import { allModals, ModalType } from '@/types/modals';
import { useForm } from 'react-hook-form';
import RequestBody from '@/types/body';
import Library from '@/types/library';
import { Methods } from '@/types/methods';
import ApiCaller from '@/utils/apiCaller';
import { useRouter } from 'next/router';

type Props = {
  id?: string;
  isOpen: boolean;
  type: ModalType;
  closeModal: () => void;
};

type FormValues = {
  name: string;
  publishedDate: string;
  authorName: string;
  authorCountry: string;
  authorDateOfBirth: string;
  section: string;
};

const AddBookModal = ({ isOpen, type, closeModal }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const libraryId = router.query.LibraryID;

  const AddBook = async (data: RequestBody) => {
    try {
      const response = await ApiCaller(
        `books/add-book?libraryId=${encodeURIComponent(libraryId as string)}`,
        Methods.POST,
        data,
      );
      const AddedLibrary: Library = response?.data satisfies Library;
      closeModal();

      return AddedLibrary;
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    await AddBook(data);
  });

  return (
    <Dialog.Root size={'sm'} open={isOpen} placement={'center'} closeOnEscape>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            padding={'10px'}
            height={'600px'}
            backgroundColor={'#ffffff'}
          >
            <Dialog.Header>
              <Dialog.Title>{allModals[type].title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              overflowY={'auto'}
              display={'flex'}
              width={'100%'}
              flexDir={'column'}
              gap={'20px'}
            >
              {/* <Box>{allModals[type].text}</Box> */}
              <form onSubmit={onSubmit}>
                <Stack gap='4' align='flex-start'>
                  <Field.Root required={true}>
                    <Field.Label>Book Name</Field.Label>
                    <Input {...register('name')} />
                  </Field.Root>
                  <Field.Root required={true}>
                    <Field.Label>Author name</Field.Label>
                    <Input {...register('authorName')} />
                  </Field.Root>
                  <Field.Root required={true}>
                    <Field.Label>Published date</Field.Label>
                    <Input type='date' {...register('publishedDate')} />
                  </Field.Root>
                  <Field.Root required={true}>
                    <Field.Label>Author Country</Field.Label>
                    <Input {...register('authorCountry')} />
                  </Field.Root>
                  <Field.Root required={true}>
                    <Field.Label>Author Birth Date</Field.Label>
                    <Input type='date' {...register('authorDateOfBirth')} />
                  </Field.Root>
                  <Field.Root required={true}>
                    <Field.Label>Section</Field.Label>
                    <Input {...register('section')} />
                  </Field.Root>
                </Stack>
                <CustomButton
                  mt={'10px'}
                  variant='add'
                  size={'md'}
                  type='submit'
                >
                  Add
                </CustomButton>
              </form>
            </Dialog.Body>
            <Dialog.Footer display={'flex'} gap={'20px'} width={'100%'}>
              <Dialog.ActionTrigger asChild>
                <CustomButton
                  variant='close'
                  size={'md'}
                  onClick={() => closeModal()}
                >
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

export default AddBookModal;
