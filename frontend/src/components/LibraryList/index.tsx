import { Wrap } from '@chakra-ui/react';
import LibraryItem from '../LibraryItem';
import Library from '@/types/library';

type Props = {
  libraries: Array<Library>;
  toggleModal: () => void;
  chnageModalInfo: (text: string, title: string) => void;
};
const LibraryList = ({ libraries, toggleModal, chnageModalInfo }: Props) => {
  return (
    <Wrap gap={['12px', '24px']} justify={['center', 'flex-start']}>
      {libraries.map((library) => (
        <LibraryItem
          key={library.id}
          library={library}
          toggleModal={toggleModal}
          chnageModalInfo={chnageModalInfo}
        />
      ))}
    </Wrap>
  );
};

export default LibraryList;
