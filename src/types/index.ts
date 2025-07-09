export type Patient = {
    id: string,
    name: string,
    caretaker: string,
    email: string,
    date: Date,
    symptoms: string
}

//Es una copia de patient pero sin id
export type DraftPatient = Omit<Patient, 'id'>