type Result = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
};

export const exerciseCalculator = (dailyExerciseHours: Array<number>, target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription = success ? 'good' : average >= target / 2 ? 'not too bad but could be better' : 'bad';
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// interface exerciseValues {
//   numberArray: number[];
//   target: number;
// }

export const parseDailyExerciseHours = (args: string[]): number[] => {
  try {
    const dailyExerciseHours = args.slice(1).map((hours) => Number(hours));
    return dailyExerciseHours;
  } catch {
    throw new Error('Provided values were not numbers!');
  }
};

// const parseArgs = (args: string[]): exerciseValues => {
//   if (args.length < 5) throw new Error('Not enough arguments');

//   try {
//     const args = process.argv.slice(2);
//     const target = Number(args[0]);
//     const dailyExerciseHours = args.slice(1).map((hours) => Number(hours));
//     return {
//       numberArray: dailyExerciseHours,
//       target,
//     }
//   } catch {
//     throw new Error('Provided values were not numbers!');
//   }
// }

// try {
//   const { numberArray, target } = parseArgs(process.argv);
//   console.log(exerciseCalculator(numberArray, target));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

