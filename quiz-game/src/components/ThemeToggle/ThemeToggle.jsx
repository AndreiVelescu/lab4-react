import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";

const ThemeToggle = () => {
  const { setTheme } = useQuiz();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  const handleThemeChange = (event) => {
    setIsDark(event.target.checked);
    localStorage.setItem("theme", event.target.checked ? "dark" : "light");
    setTheme(event.target.checked ? "dark" : "light");
  };

  return (
    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      <label>Theme</label>
      <Switch checked={isDark} onChange={handleThemeChange} />
    </div>
  );
};

export default ThemeToggle;
