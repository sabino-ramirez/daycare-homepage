import type { NextPage } from 'next';
import { Container, VStack, Box, Flex } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import ModelLoader from '../components/practice/3dModel/modelLoader';
import { MyBox } from '../components/practice/boxTest';
// import { MyBlock } from '../components/practice/ytBoxTest';
import logo from '../lib/clLogo.svg';
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
      <Flex maxW={{ base: '100vw' }} h='100vh' w='100vw'>
        {/* <LazyBou /> */}
        <Blocks />
      </Flex>
      {/* <Flex h='100vh' w='100vw'> */}
      {/*   <MyBox /> */}
      {/* </Flex> */}
    </>
  );
};

export default Home;
