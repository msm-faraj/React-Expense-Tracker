import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#FFF", // !!!
      100: "#e5e5e5", //L: (button, line)          D: (icon, )
      200: "#cacaca", //L: (input border, devider) D: (switch botton, )
      300: "#b0b0b0", //L: (switch botton, )       D: (!!!)
      400: "#959595", //L: (!!!)                   D: (Avatar, table headers, )
      500: "#7b7b7b", //L: (placeholders, )
      600: "#606060", //L: (table headers, )       D: (!!!)
      700: "#464646", //L: (!!!)                   D: (table border, )
      800: "#2b2b2b", //L: (text, )                D: (background, )
      900: "#111", // !!!
    },
  },
});

export default theme;
