import { v1 as uuid } from 'uuid';
import diagnoses from '../../data/diagnoses';
import patients from '../../data/patients';
import { DiagnoseEntry, PatientEntry, NewPatientEntry, EntryWithoutId, Entry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

const getNonSsnPatients = (): PatientEntry[] => {
  // console.log("routes", patients)
  return patients;
}

const addPatient = (data: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...data,
  }
  patients.push(newPatientEntry)
  return newPatientEntry;
};

const addEntry = (data: EntryWithoutId, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...data,
  }
  let updatedPatiend = patients.findIndex((obj => obj.id === id));
  console.log("updatedPatiend", updatedPatiend)
  patients[updatedPatiend].entries.push(newEntry);
  console.log("patients", patients)
  return newEntry;
};

const getPatient = (id: string): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getDiagnoses,
  addPatient,
  getNonSsnPatients,
  getPatient,
  addEntry
};