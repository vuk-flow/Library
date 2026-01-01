import { Box, Wrap } from '@chakra-ui/react';

const LibraryList = () => {
  return (
    <Wrap gap={['12px', '24px']} justify={['center', 'flex-start']}>
      <Box h='12' w='12' backgroundColor={'red'} />
      <Box h='12' w='12' backgroundColor={'red'} />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
      <Box h='12' w='12' />
    </Wrap>
  );
};

export default LibraryList;
