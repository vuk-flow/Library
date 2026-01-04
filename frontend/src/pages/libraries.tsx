import { CustomButton } from '@/components/Button';
import LibraryList from '@/components/LibraryList';
import Modal from '@/components/AddLibraryModal';
import NotFoundComponent from '@/components/NotFound';
import Library from '@/types/library';
import { Methods } from '@/types/methods';
import { ModalType, modalTypes } from '@/types/modals';
import ApiCaller from '@/utils/apiCaller';
import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AddLibraryModal from '@/components/AddLibraryModal';
import { useModalStore } from '@/store/modalStore';

const Libraries = () => {
  const [libraries, setLibraries] = useState<Array<Library>>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { modalType, setModalType } = useModalStore();

  const toggleModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const changeModalType = (modalType: ModalType) => {
    setModalType(modalType);
  };

  useEffect(() => {
    const getLibraries = async () => {
      try {
        const response = await ApiCaller('libraries', Methods.GET);
        const result = response?.data;
        setLibraries(result);
      } catch (error) {
        console.error('Error ocurred: ', error);
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
            toggleModal();
            changeModalType('ADD_LIBRARY');
          }}
        >
          Add library
        </CustomButton>
      </Flex>
      {libraries.length === 0 ? (
        <NotFoundComponent />
      ) : (
        <LibraryList
          libraries={libraries}
          toggleModal={toggleModal}
          changeModalType={changeModalType}
        />
      )}
      {modalType === modalTypes.ADD_LIBRARY && (
        <AddLibraryModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          type={modalTypes.ADD_LIBRARY}
        />
      )}
      {modalType === modalTypes.EDIT_LIBRARY && (
        <AddLibraryModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          type={modalTypes.EDIT_LIBRARY}
        />
      )}
    </Flex>
  );
};

export default Libraries;
