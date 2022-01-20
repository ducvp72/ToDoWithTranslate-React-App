import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Footer = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      style={{
        background: themeContext.theme,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "25px",
        gap: "2rem",
        padding: "5px",
      }}
    >
      <p className="">Made by: DucVp72</p>
      <button
        style={{
          cursor: "pointer",
          height: "50%",
          borderRadius: "20px",
          fontSize: "20px",
          color: "white",
          background: "#622179",
        }}
        onClick={() => {
          window.open(
            "https://github.com/ducvp72",
            "_blank",
            "noopener,noreferrer"
          );
        }}
      >
        View my profile github
      </button>

      <button
        style={{
          cursor: "pointer",
          height: "50%",
          borderRadius: "20px",
          fontSize: "20px",
          color: "white",
          background: "#622179",
        }}
        onClick={() => {
          window.open(
            "https://github.com/ducvp72",
            "_blank",
            "noopener,noreferrer"
          );
        }}
      >
        View source
      </button>
    </div>
  );
};

export default Footer;
