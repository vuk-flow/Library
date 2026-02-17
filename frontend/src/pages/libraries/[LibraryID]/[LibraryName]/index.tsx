import AddBookModal from '@/components/AddBookModal';
import BookTable from '@/components/BookTable';
import { CustomButton } from '@/components/Button';
import FilterSection from '@/components/FilterSection/FilterSection';
import Layout from '@/components/Layout';
import { useModalStore } from '@/store/modalStore';
import Book, { ResponsePaginationSchema } from '@/types/book';
import { Methods } from '@/types/methods';
import { ModalType, modalTypes } from '@/types/modals';
import ApiCaller from '@/utils/apiCaller';
import { headerColor } from '@/utils/common';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
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

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const limit = 20;

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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchAllBooksByLibrary = async () => {
      const result = (await ApiCaller(
        `books/by-library?id=${encodeURIComponent(libraryId as string)}&page=${currentPage}&limit=${limit}`,
        Methods.GET,
      )) as AxiosResponse<ResponsePaginationSchema>;

      if (result.data !== null) {
        const data = result.data;
        const booksByLibrary: Array<Book> = data.books;
        const totalPages: number = data.totalPages;
        setAllBooks(booksByLibrary);
        setTotalPages(totalPages);
      }
    };

    if (libraryId) {
      fetchAllBooksByLibrary();
    }
  }, [libraryId, refresh, currentPage]);

  const filteredBooks = useMemo(() => {
    if (!filterValue) return allBooks;
    return allBooks.filter((book) => book.author === filterValue);
  }, [filterValue, allBooks]);

  let uniqueAuthors: Array<string> = [];
  if (allBooks.length > 0) {
    const authors: Array<string> = allBooks.map((book) => book.author);
    uniqueAuthors = [...new Set(authors)];
  }

  const prevIsDisabled = currentPage === 1;
  const nextIsDisabled = currentPage === totalPages;

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
      <HStack spaceX={5} justify='center' mt={6} mb={'10px'}>
        <CustomButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={prevIsDisabled}
          variant={prevIsDisabled ? 'disabled' : 'add'}
          borderRadius={'10px'}
        >
          Previous
        </CustomButton>

        <HStack>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
            ) {
              return (
                <Button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  colorScheme={currentPage === pageNumber ? 'blue' : 'gray'}
                  variant={currentPage === pageNumber ? 'solid' : 'ghost'}
                  size='sm'
                >
                  {pageNumber}
                </Button>
              );
            } else if (
              pageNumber === currentPage - 3 ||
              pageNumber === currentPage + 3
            ) {
              return <Text key={pageNumber}>...</Text>;
            }
            return null;
          })}
        </HStack>

        <CustomButton
          borderRadius={'10px'}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={nextIsDisabled}
          variant={nextIsDisabled ? 'disabled' : 'add'}
        >
          Next
        </CustomButton>
      </HStack>
    </Flex>
  );
};

LibraryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LibraryPage;
