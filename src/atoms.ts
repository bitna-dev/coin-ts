import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

// export const toggleTheme = atom({
//      const toggleDark = () => setIsDark((current) => !current);
// })
