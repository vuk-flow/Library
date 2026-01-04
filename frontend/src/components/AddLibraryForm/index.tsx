import { Field, Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../Button';
import ApiCaller from '@/utils/apiCaller';
import { Methods } from '@/types/methods';
import RequestBody from '@/types/body';

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

    const result = response?.data;
    console.log({ result });

    return { message: 'Library added successfully!', data: result };
  } catch (err) {
    console.error(err);
  }
};

const AddLibraryForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    AddLibrary(data);
  });
  // TODO: custom form, state object za formu
  return (
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
  );
};

export default AddLibraryForm;
