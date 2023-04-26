import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { dark, light } from "./colors";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...dark.colors,
  },
};

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    ...light.colors,
  },
};

export { CombinedDarkTheme, CombinedDefaultTheme };
