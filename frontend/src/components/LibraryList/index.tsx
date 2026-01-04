import { Wrap } from '@chakra-ui/react';
import LibraryItem from '../LibraryItem';
import Library from '@/types/library';
import { ModalType } from '@/types/modals';

type Props = {
  libraries: Array<Library>;
  toggleModal: () => void;
  changeModalType: (modalType: ModalType) => void;
};
const LibraryList = ({ libraries, toggleModal, changeModalType }: Props) => {
  return (
    <Wrap gap={['12px', '24px']} justify={['center', 'flex-start']}>
      {libraries.map((library) => (
        <LibraryItem
          key={library.id}
          library={library}
          toggleModal={toggleModal}
          changeModalType={changeModalType}
        />
      ))}
    </Wrap>
  );
};

export default LibraryList;
