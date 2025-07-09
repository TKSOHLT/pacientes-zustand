//**
// !Zustand:
// * Es una dependencia para manejar un estado global en las aplicaciones de react.
// * Su api  es sencilla y se puede utilizar con js y ts.
// * Es una de las principales alternativas a Redux Toolkit
// */

//** Un store es como un reducer **/

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"; //Esto sirve para la depuración
import { v4 as uuidv4 } from "uuid";
import type { DraftPatient, Patient } from "../types";

type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: uuidv4() };
};

//                       Aqui se coloca el type | Siempre tiene que ser con ({}) dentro de la función lambda (callback)
export const usePatientStore = create<PatientState>()(
  devtools((set) => ({
    patients: [],
    activeId: "",
    addPatient: (data) => {
      const newPatient = createPatient(data);
      //Este es como tener un return {...state, ...} de un reducer
      set((state) => ({
        patients: [...state.patients, newPatient],
      }));
    },
    deletePatient: (id) => {
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      }));
    },
    getPatientById: (id) => {
      set(() => ({
        activeId: id,
      }));
    },
    updatePatient: (data) => {
        set((state) => ({
            patients: state.patients.map(patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
            activeId: ''
        }));
    }
  }))
);

//Eto es todo o requerido para tener un store, con contextAPI es bastante más codigo, con un customHook, con muchas acciones en el
//reducer y mucho código extra, con el codigo de este fichero se evita todo eso.

//!Nota: para activar los devtools es con la sitaxis:

// export const usePatientStore = create<PatientState>()(
//   devtools((set, get) => ({
//     *** métodos...
//   }))
// );

//!Pero si no se quiere usar los devtools es con:

// export const usePatientStore = create<PatientState>(
//   (set, get) => ({
//     *** métodos...
//   }));

