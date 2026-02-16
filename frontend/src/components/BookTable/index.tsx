'use client';
import Book from '@/types/book';
import { Table, Text, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CustomButton } from '../Button';
import { useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import { ModalType, modalTypes } from '@/types/modals';
import DeleteBookModal from '../DeleteBookModal';

type Props = {
  books: Array<Book>;
  handleRefresh: () => void;
};
// TODO: Change width od table cols!
const BookTable = ({ books, handleRefresh }: Props) => {
  const router = useRouter();
  const libraryId = router.query.LibraryID;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { modalType, setModalType } = useModalStore();

  const [bookID, setBookID] = useState<string | null>(null);

  const openModal = (modalType: ModalType, id: string) => {
    setIsOpen(true);
    setModalType(modalType);
    setBookID(id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setBookID(null);
    handleRefresh();
  };

  let headers: Array<string> = books.length > 0 ? Object.keys(books[0]) : [];
  headers = headers.filter((h) => h !== 'id');

  return headers.length === 0 ? (
    <Text>No books in the library</Text>
  ) : (
    <Box
      width='100%'
      height='500px'
      mt={'20px'}
      mb='20px'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='md'
      overflow='hidden'
    >
      <Box height='100%' overflowY='auto' overflowX='auto'>
        <Table.Root
          variant='outline'
          size='sm'
          width='100%'
          key={`table-${libraryId}`}
        >
          <Table.Header
            position='sticky'
            top={0}
            zIndex={10}
            backgroundColor='white'
          >
            <Table.Row height='35px'>
              {headers.map((h) => (
                <Table.ColumnHeader
                  key={h}
                  padding='4px 8px'
                  backgroundColor='#42aaf5'
                  border='1px solid white'
                  textAlign='center'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  color={'white'}
                >
                  {h.toUpperCase()}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {books.map((book) => (
              <Table.Row
                key={book.id}
                height='30px'
                maxHeight={'30px'}
                _hover={{ backgroundColor: '#e0f0ff' }}
              >
                <Table.Cell
                  padding='4px 8px'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  textAlign={'center'}
                >
                  {book.name}
                </Table.Cell>
                <Table.Cell
                  padding='4px 8px'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  textAlign={'center'}
                >
                  {book.date_published}
                </Table.Cell>
                <Table.Cell
                  padding='4px 8px'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  textAlign={'center'}
                >
                  {book.section}
                </Table.Cell>
                <Table.Cell
                  padding='4px 8px'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  textAlign={'center'}
                >
                  {book.author}
                </Table.Cell>
                <Table.Cell
                  padding='4px 8px'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  textAlign={'center'}
                >
                  <CustomButton
                    variant={'delete'}
                    borderRadius={'5px'}
                    onClick={() => {
                      openModal(modalTypes.DELETE_BOOK, book.id);
                    }}
                  >
                    Delete
                  </CustomButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      {modalType === 'DELETE_BOOK' && (
        <DeleteBookModal
          isOpen={isOpen}
          type={modalType}
          closeModal={closeModal}
          id={bookID as string}
        />
      )}
    </Box>
  );
};

export default BookTable;
