import { Box, Container, Heading, Stack, StackDivider } from '@chakra-ui/react';
import ToggleThemeButton from './toggleThemeButton';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './logo';

const Header = () => {
  return (
    <motion.div
      initial={{ y: '-200vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <Container display='flex' p='1' maxW='container.lg' h='50px' shadow='lg'>
        <Heading size='lg'>
          <Logo />
        </Heading>
        <Stack
          display={{ base: 'none', md: 'flex' }}
          spacing='20px'
          flexGrow={2}
          direction={{ base: 'column', md: 'row' }}
          divider={<StackDivider borderColor='gray.700' />}
          alignItems='center'
          justify='left'
          pl='30px'
        >
          <Link href='/#section2' scroll={false}>
            Link 1
          </Link>
          <Link href='/#section3' scroll={false}>
            Link 2
          </Link>
          <Link href='/#section3' scroll={false}>
            Link 3
          </Link>
        </Stack>
        <Box display='flex' flexGrow={2} pt='8px' justifyContent='right'>
          <ToggleThemeButton />
        </Box>
      </Container>
    </motion.div>
  );
};

export default Header;
