import BookTable from '@/components/BookTable';
import { CustomButton } from '@/components/Button';
import Layout from '@/components/Layout';
import Book from '@/types/book';
import { Methods } from '@/types/methods';
import ApiCaller from '@/utils/apiCaller';
import { headerColor } from '@/utils/common';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LibraryPage = () => {
  const router = useRouter();

  const [books, setBooks] = useState<Array<Book>>([]);
  const libraryId = router.query.LibraryID;

  const libraryName = router.query.LibraryName;

  const handleClick = () => {
    router.push('/libraries');
  };

  useEffect(() => {
    const fetchBooksByLibrary = async () => {
      const result = await ApiCaller(
        `books/by-library/${libraryId}`,
        Methods.GET,
      );

      const booksByLibrary: Array<Book> = result?.data;

      setBooks(booksByLibrary);
    };
    if (libraryId) {
      fetchBooksByLibrary();
    }
  }, [libraryId]);

  return (
    <Flex width={'100%'} height={'100%'} flexDir={'column'}>
      <Flex
        padding={'0px 20px'}
        width='100%'
        height='50px'
        alignItems='center'
        position='relative'
        backgroundColor={headerColor}
      >
        {/* BACK BUTTON */}
        <CustomButton
          variant='back'
          size='sm'
          onClick={() => {
            handleClick();
          }}
        >
          Back
        </CustomButton>

        {/* TITLE */}
        <Text
          position='absolute'
          left='50%'
          transform='translateX(-50%)'
          fontWeight='bold'
          color='#ffffff'
        >
          Welcome to the library {libraryName}
        </Text>
      </Flex>

      <Flex flexDir={'row'} width={'100%'} height={'100%'}>
        <Flex width={'20%'} height={'100%'} border={'2px solid green'}>
          Sidenav
        </Flex>
        <Flex width={'80%'} height={'100%'} color={'black'}>
          <BookTable books={books}></BookTable>
        </Flex>
      </Flex>
    </Flex>
  );
};

LibraryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LibraryPage;
