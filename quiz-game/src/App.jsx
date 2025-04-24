import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useQuiz } from "./context/QuizContext";
import { lightTheme, darkTheme } from "./theme";
import StartPage from "./components/StartPage/StartPage";
import QuizPage from "./components/QuizPage/QuizPage";
import ResultPage from "./components/ResultPage/ResultPage";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

const App = () => {
  const { theme } = useQuiz();

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
