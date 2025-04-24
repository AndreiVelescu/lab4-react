import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useQuiz } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const { setQuizOptions, setUsername, username } = useQuiz();

  const [randomize, setRandomize] = useState(false);
  const [timer, setTimer] = useState(10);
  const [unlimitedTime, setUnlimitedTime] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    setQuizOptions({
      randomize,
      timer: unlimitedTime ? 0 : parseInt(timer),
    });
    navigate("/quiz");
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Quiz Master
          </Typography>

          <TextField
            fullWidth
            label="Numele tau"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ my: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={randomize}
                onChange={(e) => setRandomize(e.target.checked)}
              />
            }
            label="Random"
            sx={{ mb: 2 }}
          />

          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Timp pe întrebare
            </FormLabel>
            <RadioGroup
              row
              value={unlimitedTime ? "unlimited" : "limited"}
              onChange={(e) => setUnlimitedTime(e.target.value === "unlimited")}
            >
              <FormControlLabel
                value="limited"
                control={<Radio />}
                label="Limitat"
              />
              <FormControlLabel
                value="unlimited"
                control={<Radio />}
                label="Nelimitat"
              />
            </RadioGroup>
            {unlimitedTime ? (
              <FormHelperText>Timp nelimitat pe intrebare</FormHelperText>
            ) : (
              <TextField
                fullWidth
                sx={{ mt: 2 }}
                label="Secunde pe intrebare"
                variant="outlined"
                type="number"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                inputProps={{ min: 1 }}
              />
            )}
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
            onClick={handleStartQuiz}
            disabled={!username}
          >
            Începe Quiz-ul
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default StartPage;
