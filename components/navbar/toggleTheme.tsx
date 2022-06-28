import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleTheme = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton
        size="xs"
        fontSize="15"
        aria-label="Toggle Theme"
        colorScheme={useColorModeValue("blue", "orange")}
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        onClick={toggleColorMode}
      ></IconButton>
    </>
  );
};

export default ToggleTheme;
