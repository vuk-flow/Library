import {Flex, Spacer, Text } from '@chakra-ui/react';
import { CustomButton } from '../Button';
import Library from '@/types/library';

type Props = {
    library:Library
}
const LibraryItem = ({library}:Props) => {

    return (
    <Flex flexDir={'column'} width={'200px'} height={'100px'} padding={'5px'} border={'1px solid black'}>
        <Text>{library.name}</Text>
        <Text>{library.address}</Text>
        <Spacer/>
        <Flex flexDir={'row'} gap={'10px'} width={'100%'} justifyContent={'flex-end'}>
            <CustomButton size={'sm'} variant={'edit'}>Edit</CustomButton>
            <CustomButton size={'sm'} variant={'delete'}>Delete</CustomButton>

        </Flex>

    </Flex>
    );
};

export default LibraryItem;