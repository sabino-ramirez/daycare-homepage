import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Header from '../components/header';

const Home: NextPage = () => {
  return (
    <Container maxW='container.lg' py={2}>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        {/* <Container */}
        {/*   size='lg' */}
        {/*   maxW='md' */}
        {/*   color='white' */}
        {/*   outline='solid' */}
        {/*   outlineColor='white' */}
        {/* > */}
        {/*   "md" Container */}
        {/* </Container> */}
        {/* <Container */}
        {/*   position='absolute' */}
        {/*   h='200px' */}
        {/*   top='100px' */}
        {/*   right='100px' */}
        {/*   maxW='md' */}
        {/*   color='white' */}
        {/*   outline='solid' */}
        {/*   outlineColor='white' */}
        {/* > */}
        {/*   "md" Container */}
        {/* </Container> */}
      </motion.div>
    </Container>
  );
};

export default Home;
