import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { ThemeContextType } from "../../types/quizcontext.types";

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const setThemeColor = () => {
    const themeColor: any = localStorage.getItem("theme");
    themeColor ? setTheme(themeColor) : setTheme("dark");
  };
  const changeTheme = () => {
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    const themeColor: any = localStorage.getItem("theme");
    setTheme(themeColor);
  };
  useEffect(() => setThemeColor(), []);
  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
