import axios from "./axios.js";

export const createStudentRequest = async (student) => axios.post('/newstudent', student);

export const getStudentRequest = async ({document}) => axios.get(`/student/${document}`);

export const getStudents = async () => axios.get('/students');

export const deleteStudentRequest = async (document) => axios.delete(`/student/${document}`);

export const updateStudentRequest = async (id, student) => axios.put(`/student/${id}`, student);