import { CustomButton } from '@/components/Button';
import LibraryList from '@/components/LibraryList';
import Modal from '@/components/Modal';
import NotFoundComponent from '@/components/NotFound';
import Library from '@/types/library';
import { Methods } from '@/types/methods';
import { ModalTexts, ModalTitles } from '@/types/modals';
import ApiCaller from '@/utils/apiCaller';
import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const Libraries = () => {
  const [libraries, setLibraries] = useState<Array<Library>>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const toggleModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const changeModalInfo = (text: string, title: string) => {
    setText(text);
    setTitle(title);
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
            changeModalInfo(ModalTitles.ADD_LIBRARY, ModalTexts.ADD_LIBRARY);
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
          chnageModalInfo={changeModalInfo}
        />
      )}
      <Modal
        text={text}
        isOpen={isOpen}
        title={title}
        toggleModal={toggleModal}
      />
    </Flex>
  );
};

export default Libraries;
