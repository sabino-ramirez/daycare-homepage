import { forwardRef } from 'react';
import { Container, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const ModelSpinner = () => (
  <Spinner
    size='lg'
    position='relative'
    left='50%'
    top='50%'
    ml='calc(0px - var(--spinner-size) / 2)'
    mt='calc(0px - var(--spinner-size))'
  />
);

export const ModelContainer = forwardRef(({ children }: any, ref: any) => (
  <Container
    ref={ref}
    position='relative'
    maxW={{ base: 'md', sm: 'lg', md: 'xl' }}
    h='md'
  >
    {children}
  </Container>
));

const ModelLoader = () => {
  return (
    <ModelContainer>
      <ModelSpinner />
    </ModelContainer>
  );
};

export default ModelLoader;
