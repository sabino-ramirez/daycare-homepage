import type { NextPage } from 'next';
import { Container, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import Model from '../components/3dModel';
import Body from '../components/body';

const Home: NextPage = () => {
  return (
    <>
      {/* <Container maxW='container.lg' justifyContent='space-between'> */}
      {/*   <Navbar /> */}
      {/*   <Model /> */}
      {/*   <Body /> */}
      {/* </Container> */}
      <VStack spacing={12} align='stretch'>
        <Navbar />
        <Model />
        <Body />
      </VStack>
    </>
  );
};

export default Home;
