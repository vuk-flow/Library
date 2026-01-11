import { Wrap } from '@chakra-ui/react';
import LibraryItem from '../LibraryItem';
import Library from '@/types/library';
import { ModalType } from '@/types/modals';
import Link from 'next/link';

type Props = {
  libraries: Array<Library>;
  openModal: (modalType: ModalType, id?: string) => void;
};
const LibraryList = ({ libraries, openModal }: Props) => {
  return (
    <Wrap gap={['12px', '24px']} justify={['center', 'flex-start']}>
      {libraries.map((library) => (
        <LibraryItem key={library.id} library={library} openModal={openModal} />
      ))}
    </Wrap>
  );
};

export default LibraryList;
