import { Field, Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../Button';
import ApiCaller from '@/utils/apiCaller';
import { Methods } from '@/types/methods';
import RequestBody from '@/types/body';
import Library from '@/types/library';

type FormDta = {
  id: number;
};

const DeleteLibrary = async (id: FormData) => {
  try {
    const response = await ApiCaller('libraries/add-library', Methods.DELETE);

    const library: Library = response?.data satisfies Library;

    return library;
  } catch (err) {
    console.error(err);
  }
};

type Props = {
  refreshLibraries: (data: Library) => void;
};

const DeleteLibraryForm = ({ refreshLibraries }: Props) => {
  const { handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const result = await DeleteLibrary(data);

    const library = result;

    refreshLibraries(library as Library);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <CustomButton variant={'add'} size={'md'} type="submit">
          Submit
        </CustomButton>
      </Stack>
    </form>
  );
};

export default DeleteLibraryForm;
