import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const useQuiz = () => {
  return useContext(QuizContext);
};

export const QuizProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizOptions, setQuizOptions] = useState({
    randomize: false,
    timer: 10,
  });
  const [theme, setTheme] = useState("light");

  return (
    <QuizContext.Provider
      value={{
        username,
        setUsername,
        questions,
        setQuestions,
        theme,
        setTheme,
        answers,
        setAnswers,
        score,
        setScore,
        quizOptions,
        setQuizOptions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
