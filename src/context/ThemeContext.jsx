/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { themes } from "../themes/themes";

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const loadedTheme = localStorage.getItem('selectedTheme');
  let defaultTheme = 'dark';
  if(Object.keys(themes).includes(loadedTheme)){
    defaultTheme = loadedTheme
  }
  const [themeName, setThemeName] = useState(defaultTheme);
  const themeList = [...Object.keys(themes)];
  useEffect(() => {
    const theme = themes[themeName];
    console.log("🚀 ~ useEffect ~ theme:", theme)
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
    
  }, [themeName]);

  const selectTheme = (newThemeName) => {
    setThemeName(()=> {
      localStorage.setItem('selectedTheme',newThemeName)
      return newThemeName
    });
  };

  return (
    <ThemeContext.Provider
      value={{ themeName, setThemeName, selectTheme, themeList }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
