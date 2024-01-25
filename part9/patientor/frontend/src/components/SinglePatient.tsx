import {
  useParams
} from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import MedicationIcon from '@mui/icons-material/Medication';
import { Card } from '@mui/material';

import { Patient, Diagnosis, Entry } from '../types';
import AddDiagnosisForm from './AddDiagnosisForm';

interface Props {
  patients : Patient[],
  diagnosis : Diagnosis[]
}


const SinglePatient = ({ patients, diagnosis }: Props) => {
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

  const displayGenderIcon = () => {
    if (patient?.gender === "male") 
    return <MaleIcon />;
    if (patient?.gender === "female") 
    return <FemaleIcon />; 
    else return null;
};

// const displayDiagnosis = (code: string) => {
//   return diagnosis.find(diagnosis => diagnosis.code === code)?.name;
// };

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <LocalHospitalIcon /></h3>
      <p>{entry.description}</p>
      <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
    </div>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <BloodtypeIcon /> {entry.employerName}</h3>
      <p>{entry.description}</p>
      {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}
    </div>
  );
};

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <MedicationIcon /></h3>
      <p>{entry.description}</p>
      <p>Health check rating: {entry.healthCheckRating}</p>
    </div>    
  );
};

const assertNever = (): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />
    default:
      return assertNever();
  }
};

  return (
    <div>
        <h1>
          {patient?.name} {displayGenderIcon()}
        </h1>
        <p>
          ssn: {patient?.ssn} <br />
          occupation: {patient?.occupation}
        </p>
        <AddDiagnosisForm id={id} />
        <h2>entries</h2>
        {console.log(patient)}
        {patient?.entries.map((entry) => (
          <Card key={entry.id} sx={{ border: '1px solid red' }}>
            <EntryDetails key={entry.id} entry={entry} />
          </Card>
        ))}
    </div>
  )
}

export default SinglePatient;