import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import questionsData from "../../assets/questions.json";

const transition = { duration: 0.5, ease: "easeInOut" };

const QuizPage = () => {
  const { quizOptions, setAnswers, answers, score, setScore } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timerExpired, setTimerExpired] = useState(false);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const timer = useTimer(
    quizOptions.timer,
    () => setTimerExpired(true),
    currentQuestion
  );

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleAnswer = (selectedOption) => {
    const currentQ = questions[currentQuestion];
    if (!currentQ || currentQuestion >= questions.length) return;
    const isCorrect = selectedOption === currentQ.answer;

    setAnswers([
      ...answers,
      {
        question: currentQ.question,
        selectedAnswer: selectedOption,
        correctAnswer: currentQ.answer,
        isCorrect: isCorrect,
      },
    ]);

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      setCurrentAnswer("");
      setTimerExpired(false);
      setCurrentQuestion((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (questions.length > 0 && currentQuestion >= questions.length) {
      if (quizOptions.name) {
        const userScoreKey = `quiz_score_${quizOptions.name}`;
        localStorage.setItem(userScoreKey, score);
      }
      navigate("/results");
    }
  }, [currentQuestion, questions.length, navigate, score, quizOptions.name]);

  useEffect(() => {
    if (
      timerExpired &&
      quizOptions.timer > 0 &&
      currentQuestion < questions.length
    ) {
      const currentQ = questions[currentQuestion];
      if (!currentQ) return;

      if (currentAnswer === "") {
        setAnswers([
          ...answers,
          {
            question: currentQ.question,
            selectedAnswer: "Niciun răspuns",
            correctAnswer: currentQ.answer,
            isCorrect: false,
          },
        ]);
      }
      setCurrentAnswer("");
      setTimerExpired(false);
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [
    timerExpired,
    currentQuestion,
    questions,
    currentAnswer,
    setAnswers,
    setScore,
    answers,
    quizOptions.timer,
  ]);

  useEffect(() => {
    if (quizOptions.randomize) {
      setQuestions((prevQuestions) =>
        prevQuestions.sort(() => Math.random() - 0.5)
      );
    }
  }, [quizOptions.randomize]);
  const question = questions[currentQuestion];

  if (questions.length === 0 || !question) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        px: 3,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition }}
          exit={{ opacity: 0, y: -50, transition }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              {question.category} — {question.difficulty}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {question.question}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {quizOptions.timer > 0
                ? `Timp rămas: ${timer} secunde`
                : "Timp nelimitat"}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {question.options.map((option, index) => {
                const isCorrect = option === question.answer;
                const isSelected = currentAnswer === option;
                const isAnswered = timerExpired || currentAnswer !== "";

                let buttonColor = "inherit";
                if (isAnswered) {
                  if (isCorrect) {
                    buttonColor = "success";
                  } else if (isSelected && !isCorrect) {
                    buttonColor = "error";
                  }
                } else if (isSelected) {
                  buttonColor = "primary";
                }

                return (
                  <Button
                    key={index}
                    variant={
                      isSelected || (isAnswered && isCorrect)
                        ? "contained"
                        : "outlined"
                    }
                    color={buttonColor}
                    // disabled={isAnswered}
                    onClick={() => {
                      if (!isAnswered) {
                        setCurrentAnswer(option);
                        handleAnswer(option);
                      }
                    }}
                    sx={{
                      textAlign: "left",
                      justifyContent: "flex-start",
                      px: 3,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 500,
                      fontSize: "1rem",
                      boxShadow: isSelected ? 3 : 0,
                      transition: "all 0.2s ease",
                    }}
                    fullWidth
                  >
                    {option}
                  </Button>
                );
              })}
            </Box>
          </Paper>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default QuizPage;
