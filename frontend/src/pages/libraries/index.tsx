import { CustomButton } from '@/components/Button';
import LibraryList from '@/components/LibraryList';
import NotFoundComponent from '@/components/NotFound';
import { Methods } from '@/types/methods';
import { ModalType, modalTypes } from '@/types/modals';
import ApiCaller from '@/utils/apiCaller';
import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AddLibraryModal from '@/components/AddLibraryModal';
import { useModalStore } from '@/store/modalStore';
import DeleteLibraryModal from '@/components/DeleteLibraryModal';
import Library from '@/types/library';

const Libraries = () => {
  const [libraries, setLibraries] = useState<Array<Library>>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { modalType, setModalType } = useModalStore();

  const [libraryId, setLibraryId] = useState<string | null>(null);

  const openModal = (modalType: ModalType, id?: string) => {
    setIsOpen(true);
    setModalType(modalType);
    setLibraryId(id ?? null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setLibraryId(null);
  };

  const updateLibraries = (data: Library | Array<Library>) => {
    if (!Array.isArray(data)) {
      setLibraries((prevLibraries) => [...prevLibraries, data]);
    } else {
      setLibraries(data);
    }
  };

  useEffect(() => {
    const getLibraries = async () => {
      try {
        const response = await ApiCaller('libraries', Methods.GET);
        const result = response?.data;
        setLibraries(result);
      } catch (error) {
        console.error('Error ocurred while fetching all libraries: ', error);
      }
    };
    getLibraries();
  }, []);

  return (
    <Flex
      display={'flex'}
      flexDir={'column'}
      padding={'30px'}
      justifyContent={'center'}
    >
      <Flex width={'100%'} justify={'end'}>
        <CustomButton
          size={'md'}
          variant={'add'}
          fontSize={'14px'}
          onClick={() => {
            openModal('ADD_LIBRARY');
          }}
        >
          Add library
        </CustomButton>
      </Flex>
      {libraries.length === 0 ? (
        <NotFoundComponent />
      ) : (
        <LibraryList libraries={libraries} openModal={openModal} />
      )}
      {modalType === modalTypes.ADD_LIBRARY && (
        <AddLibraryModal
          isOpen={isOpen}
          closeModal={closeModal}
          updateLibraries={updateLibraries}
          type={modalType}
        />
      )}
      {modalType === modalTypes.DELETE_LIBRARY && libraryId && (
        <DeleteLibraryModal
          id={libraryId}
          isOpen={isOpen}
          closeModal={closeModal}
          updateLibraries={updateLibraries}
          type={modalType}
        />
      )}
      {modalType === modalTypes.EDIT_LIBRARY && libraryId && (
        <AddLibraryModal
          updateLibraries={updateLibraries}
          id={libraryId}
          isOpen={isOpen}
          closeModal={closeModal}
          type={modalType}
        />
      )}
    </Flex>
  );
};

export default Libraries;
