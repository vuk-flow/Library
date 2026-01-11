import { CustomButton } from '@/components/Button';
import Layout from '@/components/Layout';
import { headerColor } from '@/utils/common';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const LibraryPage = () => {
  const router = useRouter();

  const libraryName = router.query.LibraryName;

  const handleClick = () => {
    router.push('/libraries');
  };

  return (
    <Flex width={'100%'} height={'100%'} flexDir={'column'}>
      <Flex
        padding={'0px 20px'}
        width="100%"
        height="50px"
        alignItems="center"
        position="relative"
        backgroundColor={headerColor}
      >
        {/* BACK BUTTON */}
        <CustomButton
          variant="back"
          size="sm"
          onClick={() => {
            handleClick();
          }}
        >
          Back
        </CustomButton>

        {/* TITLE */}
        <Text
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          fontWeight="bold"
          color="#ffffff"
        >
          Welcome to the library {libraryName}
        </Text>
      </Flex>

      <Flex flexDir={'row'} width={'100%'} height={'100%'}>
        <Flex width={'20%'} height={'100%'} border={'2px solid green'}>
          Sidenav
        </Flex>
        <Flex width={'80%'} height={'100%'} border={'5px solid purple'}>
          Main
        </Flex>
      </Flex>
    </Flex>
  );
};

LibraryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LibraryPage;
