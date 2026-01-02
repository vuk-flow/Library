import LibraryList from '@/components/LibraryList';
import NotFoundComponent from '@/components/NotFound';
import Library from '@/types/library';
import { Methods } from '@/types/methods';
import ApiCaller from '@/utils/apiCaller';
import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const Libraries = () => {
    
    const [libraries, setLibraries] = useState<Array<Library>>([]);

    const getLibraries = async () => {
        try {
        const response = await ApiCaller('libraries', Methods.GET);
        const result = response?.data;
        setLibraries(result);
        }
        catch (error){
            console.error('Error ocurred: ', error);
        }
    };

    useEffect(() => {
        getLibraries();
    },[]);

  return (
    <Flex display={'flex'} padding={'50px'} justifyContent={'center'}>
        {libraries.length === 0 ? <NotFoundComponent/> : <LibraryList libraries={libraries}/>}
    </Flex>
  );
};


export default Libraries;