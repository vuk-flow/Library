import { footerColor } from '@/utils/common';
import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Flex width={'100%'} height={'100vh'} display={'flex'} flexDir={'column'}>
      <Flex flexDir={'row'} flex={'1'}>
        {children}
        {/* <Flex width={'20%'} height={'100%'} display={'flex'} flexDir={'column'} border={'1px solid purple'}>
                    SIDENAV
                </Flex>
                <Flex width={'60%'} height={'100%'} display={'flex'} flexDir={'column'}> 
                    {children}
                </Flex> */}
      </Flex>
      <Flex
        display={'flex'}
        flexDir={'row'}
        width={'100%'}
        height={'50px'}
        backgroundColor={footerColor}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text fontWeight={'bold'} color={'#ffffff'}>
          All rights reserved Vuk 2026
        </Text>
      </Flex>
    </Flex>
  );
};

export default Layout;
