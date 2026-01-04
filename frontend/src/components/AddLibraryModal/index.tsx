import {
  Box,
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

type Props = {
  isOpen: boolean;
  type: ModalType;
  toggleModal: () => void;
};

type FormValues = {
  name: string;
  address: string;
};

const AddLibrary = async (data: RequestBody) => {
  try {
    const response = await ApiCaller(
      'libraries/add-library',
      Methods.POST,
      data,
    );

    const library: Library = response?.data satisfies Library;

    return library;
  } catch (err) {
    console.error(err);
  }
};

const AddLibraryModal = ({ isOpen, type, toggleModal }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    await AddLibrary(data);
  });

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
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input {...register('name')} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Address</Field.Label>
                    <Input {...register('address')} />
                  </Field.Root>
                  <CustomButton variant={'add'} size={'md'} type="submit">
                    Submit
                  </CustomButton>
                </Stack>
              </form>
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

export default AddLibraryModal;
