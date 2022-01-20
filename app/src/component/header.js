import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
const Header = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      style={{
        background: themeContext.theme,
        display: "flex",
        justifyContent: "center",
        color: `${themeContext.theme === "#00c5f6" ? "white" : "#f7ec00"}`,
        fontSize: "25px",
        padding: "5px",
        position: "fixed",
        width: "100%",
        top: "0",
      }}
    >
      FREE DICTIONARY
      <button
        onClick={themeContext.toggleTheme}
        style={{
          cursor: "pointer",
          borderRadius: "20px",
          fontSize: "20px",
          color: "white",
          background: `${
            themeContext.theme === "#00c5f6" ? "black" : "#f7ec00"
          }`,
          position: "fixed",
          right: "0",
          marginRight: "10px",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <div className=""></div> */}
        <img
          style={{
            width: "28px",
            height: "28px",
          }}
          src={`${
            themeContext.theme === "#00c5f6"
              ? "/assets/moon.png"
              : "/assets/light.png"
          }`}
          alt="theme"
        />
      </button>
    </div>
  );
};

export default Header;
