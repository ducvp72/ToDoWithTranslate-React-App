import { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("#00c5f6");

  const toggleTheme = () => {
    setTheme(theme === "black" ? "#00c5f6" : "black");
    console.log("ok");
  };

  //Create value to pass all component
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
