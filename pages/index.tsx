import type { NextPage } from 'next';
import { Container, VStack, Box, Flex } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import ModelLoader from '../components/practice/3dModel/modelLoader';
// import { MyBox } from '../components/boxTest';
// import { MyBlock } from '../components/practice/ytBoxTest';
import logo from '../lib/clLogo.svg';
// import Plane from '../components/plane';
// import Block from '../components/blocks';
import Blocks from '../components/blocks';

// const LazyBou = dynamic(() => import('../components/3dModel'), {
//   ssr: false,
//   loading: () => <ModelLoader />,
// });

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      {/* <Flex justifyContent='space-around'> */}
      {/*   <Image src={logo} height={48} width='80px' priority /> */}
      {/* </Flex> */}
      <VStack mt='15' spacing={15} align='center' className='vstack-main'>
        {/* <LazyBou /> */}
        {/* <MyBox /> */}
        <Flex h='100vh' w='100vw'>
          <Blocks />
        </Flex>
        {/* <Body /> */}
      </VStack>
    </>
  );
};

export default Home;
