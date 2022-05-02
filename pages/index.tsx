import type { NextPage } from 'next';
import { Container, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import Body from '../components/body';
import dynamic from 'next/dynamic';
import ModelLoader from '../components/3dModel/modelLoader';

const LazyBou = dynamic(() => import('../components/3dModel'), {
  ssr: false,
  loading: () => <ModelLoader />,
});

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <VStack pt='10' spacing={10} align='center' className='vstack-main'>
        <LazyBou />
        <Body />
      </VStack>
    </>
  );
};

export default Home;
