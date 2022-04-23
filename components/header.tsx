import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import ToggleThemeButton from './toggleThemeButton';

const Header = () => {
  return (
    <>
      <Box as='nav' position='fixed' shadow='lg' w='100%' h='40px'>
        <Container
          display='flex'
          p='1'
          maxW='container.lg'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex align='center' mr='6' pr='10px'>
            <Heading size='lg'>CL CC</Heading>
          </Flex>
          <Stack
            display={{ base: 'none', md: 'flex' }}
            spacing='20px'
            flexGrow={2}
            direction={{ base: 'column', md: 'row' }}
            divider={<StackDivider borderColor='gray.700' />}
            align='center'
            justify='left'
          >
            <Text>Link 1</Text>
            <Text>Link 2</Text>
            <Text>Something else</Text>
          </Stack>
          <Box alignItems='right'>
            <ToggleThemeButton />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
