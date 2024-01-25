import express from 'express';
import toNewPatientEntry from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSsnPatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.send(newPatient);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong';
    if (e instanceof Error) {
      errorMessage += 'Error:' + e.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = patientService.addEntry(req.body, req.params.id);
    res.send(newEntry);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong';
    if (e instanceof Error) {
      errorMessage += 'Error:' + e.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;