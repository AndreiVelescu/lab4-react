import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuiz } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ResultPage = () => {
  const {
    answers,
    score,
    setScore,
    setAnswers,
    quizOptions,
    setUsername,
    username,
  } = useQuiz();
  const navigate = useNavigate();

  const [scoreboard, setScoreboard] = useState([]);

  const resetQuiz = () => {
    setAnswers([]);
    setScore(0);
    setUsername("");
    navigate("/");
  };

  useEffect(() => {
    if (username) {
      const userKey = `quiz_score_${username}`;
      const prevScore = parseInt(localStorage.getItem(userKey) || "0");
      const newScore = Math.max(prevScore, score);
      localStorage.setItem(userKey, newScore.toString());
    }

    const scores = Object.keys(localStorage)
      .filter((key) => key.startsWith("quiz_score_"))
      .map((key) => ({
        username: key.replace("quiz_score_", ""),
        score: parseInt(localStorage.getItem(key) || "0"),
      }))
      .sort((a, b) => b.score - a.score);

    setScoreboard(scores);
  }, [score, username]);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", my: 6, px: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Rezultatul final
          </Typography>
          <Typography variant="h5" align="center" color="primary" gutterBottom>
            {username && `${username},`} scorul tău este {score}/
            {answers.length}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Detalii întrebari:
          </Typography>

          <Grid container spacing={3}>
            {answers.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderLeft: `5px solid ${
                      item.selectedAnswer === item.correctAnswer
                        ? "green"
                        : "red"
                    }`,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {item.question}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        item.selectedAnswer === item.correctAnswer
                          ? "green"
                          : "red",
                    }}
                  >
                    Răspunsul tau: {item.selectedAnswer}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Corect: {item.correctAnswer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Topul:
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Scor maxim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreboard.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.username}</TableCell>
                  <TableCell align="right">{entry.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={resetQuiz}
            sx={{ mt: 4 }}
          >
            Din nou
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ResultPage;
