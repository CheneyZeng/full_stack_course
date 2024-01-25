import { NewPatientEntry, Gender, Entry, DiagnoseEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
      throw new Error('Incorrect or missing name: ' + text);
    }
    return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
}
return gender;
}

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }
  if ('diagnosisCodes' in object && !Array.isArray(object.diagnosisCodes)) {
    return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
  }
  throw new Error('Incorrect or missing diagnosisCodes: ' + object);
};

const parseEntry = (entry: unknown): Entry[] => {
  if (!entry || !Array.isArray(entry)) {
      throw new Error('Incorrect or missing entry: ' + entry);
    }
  entry.map((entry: unknown) => {
    if (!entry || typeof entry !== 'object') {
      throw new Error('Incorrect or missing entry: ' + entry);
    }
    //Todo: add type guard for entry
    if ('id' in entry && 'date' in entry && 'specialist' in entry && 'diagnosisCodes' in entry) {
      const newEntry: unknown = {
        ...entry,
        id: parseString(entry.id),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
      };
      return newEntry as Entry;
    }
    if ('id' in entry && 'date' in entry && 'specialist' in entry) {
      const newEntry: unknown = {
        ...entry,
        id: parseString(entry.id),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
      };
      return newEntry as Entry;
    }
    throw new Error('Incorrect or missing entry: ' + entry);
  });
  return entry as Entry[];
};


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing object: ' + object);
    }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntry(object.entries)
    };
    return newEntry;
  }
  throw new Error('Incorrect or missing object: ' + object);
};

export default toNewPatientEntry;