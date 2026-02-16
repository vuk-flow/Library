import AddBookModal from '@/components/AddBookModal';
import BookTable from '@/components/BookTable';
import { CustomButton } from '@/components/Button';
import FilterSection from '@/components/FilterSection/FilterSection';
import Layout from '@/components/Layout';
import { useModalStore } from '@/store/modalStore';
import Book from '@/types/book';
import { Methods } from '@/types/methods';
import { ModalType, modalTypes } from '@/types/modals';
import ApiCaller from '@/utils/apiCaller';
import { headerColor } from '@/utils/common';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const LibraryPage = () => {
  const router = useRouter();

  const [allBooks, setAllBooks] = useState<Array<Book>>([]);
  const libraryId = router.query.LibraryID;

  const libraryName = router.query.LibraryName;

  const [filterValue, setFilterValue] = useState('');

  const { modalType, setModalType } = useModalStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (modalType: ModalType) => {
    setIsOpen(true);
    setModalType(modalType);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    handleRefresh();
  };

  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

  const handleClick = () => {
    router.push('/libraries');
  };

  const handleSelectOption = (value: string) => {
    setFilterValue(value);
  };

  useEffect(() => {
    const fetchAllBooksByLibrary = async () => {
      const result = await ApiCaller(
        `books/by-library?id=${encodeURIComponent(libraryId as string)}&filter=`,
        Methods.GET,
      );

      const booksByLibrary: Array<Book> = result?.data;
      setAllBooks(booksByLibrary);
    };

    if (libraryId) {
      fetchAllBooksByLibrary();
    }
  }, [libraryId, refresh]);

  const filteredBooks = useMemo(() => {
    if (!filterValue) return allBooks;
    return allBooks.filter((book) => book.author === filterValue);
  }, [filterValue, allBooks]);

  let uniqueAuthors: Array<string> = [];
  if (allBooks.length > 0) {
    const authors: Array<string> = allBooks.map((book) => book.author);
    uniqueAuthors = [...new Set(authors)];
  }

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
        <Flex width={'20%'} height={'100%'}>
          <FilterSection
            authors={uniqueAuthors}
            handleSelectOption={handleSelectOption}
          />
        </Flex>
        <Flex width={'80%'} height={'100%'} color={'black'} flexDir={'column'}>
          <Box padding={'7px'} display={'flex'} width={'100%'}>
            <CustomButton
              variant={'add'}
              borderRadius={'10px'}
              onClick={() => {
                openModal(modalTypes.ADD_BOOK);
              }}
            >
              Add book
            </CustomButton>
          </Box>
          <BookTable
            books={filteredBooks}
            handleRefresh={handleRefresh}
          ></BookTable>
        </Flex>
      </Flex>
      {modalType === modalTypes.ADD_BOOK && (
        <AddBookModal
          isOpen={isOpen}
          closeModal={closeModal}
          type={modalType}
        />
      )}
    </Flex>
  );
};

LibraryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LibraryPage;
