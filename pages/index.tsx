import type { NextPage } from 'next';
import { Container, VStack, Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import Body from '../components/mainContent';
import dynamic from 'next/dynamic';
import ModelLoader from '../components/3dModel/modelLoader';
import { MyBox } from '../components/boxTest';
import { MySphere } from '../components/sphereTest';

const LazyBou = dynamic(() => import('../components/3dModel'), {
  ssr: false,
  loading: () => <ModelLoader />,
});

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <VStack mt='15' spacing={15} align='center' className='vstack-main'>
        {/* <LazyBou /> */}
        {/* <MyBox /> */}
        <Flex h='80vh' w='80vw'>
          <MySphere />
        </Flex>
        {/* <Body /> */}
      </VStack>
    </>
  );
};

export default Home;
