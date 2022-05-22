import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, fonts });

export default theme;
