import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ToggleThemeButton = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton
        size='sm'
        aria-label='Toggle Theme'
        colorScheme={useColorModeValue('blue', 'orange')}
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        onClick={toggleColorMode}
      ></IconButton>
    </>
  );
};

export default ToggleThemeButton;
