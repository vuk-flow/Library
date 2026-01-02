import { Wrap } from '@chakra-ui/react';
import LibraryItem from '../LibraryItem';
import Library from '@/types/library';

type Props = {
  libraries:Array<Library>;
};
const LibraryList = ({libraries}:Props) => {

 
   
  return (
    <Wrap gap={['12px', '24px']} justify={['center', 'flex-start']}>
      {libraries.map(library => (
        <LibraryItem key={library.id} library={library}/>)
      )
    }
    </Wrap>
  );
};

export default LibraryList;
