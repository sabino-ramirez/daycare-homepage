import { Box, Container, Heading, Stack, StackDivider } from '@chakra-ui/react';
import ToggleThemeButton from './toggleThemeButton';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './logo';
import {
  navThemeButtonVariants,
  navParentVariants,
  navLinkVariants,
} from '../components/fmVariants';

const Header = () => {
  return (
    <motion.nav variants={navParentVariants} initial='before' animate='after'>
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
          <motion.div variants={navLinkVariants}>
            <Link href='/#section2' scroll={false}>
              Link 1
            </Link>
          </motion.div>
          <motion.div variants={navLinkVariants}>
            <Link href='/#section2' scroll={false}>
              Link 2
            </Link>
          </motion.div>
          <motion.div variants={navLinkVariants}>
            <Link href='/#section3' scroll={false}>
              Link 3
            </Link>
          </motion.div>
        </Stack>
        <motion.div variants={navThemeButtonVariants}>
          <Box display='flex' flexGrow={2} pt='8px' justifyContent='right'>
            <ToggleThemeButton />
          </Box>
        </motion.div>
      </Container>
    </motion.nav>
  );
};

export default Header;
