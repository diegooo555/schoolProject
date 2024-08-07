import axios from "./axios.js";

export const createAbsenceRequest = async (absence) => axios.post('/newabsence', absence);

export const getAbsencesByCourseRequest = async (course) => axios.get(`/absencescurse/${course}`);

export const getAbsencesByDocumentRequest = async (document) => axios.get(`/absencesdocument/${document}`);

export const deleteAbsenceRequest = async (id) => axios.delete(`/absence/${id}`);