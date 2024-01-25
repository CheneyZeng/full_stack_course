import express = require("express");
import { calculateBmi } from "./bmiCalculator"; 
import { exerciseCalculator, parseDailyExerciseHours } from "./exerciseCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight,
      height,
      bmi,
    });
  }
});

app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.query;
  if (!dailyExercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } else {
    try {
      const dailyExercisesHours = parseDailyExerciseHours(dailyExercises as string[]);
      res.json(exerciseCalculator(dailyExercisesHours, Number(target)));
    } catch {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});