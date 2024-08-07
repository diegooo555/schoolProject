import axios from "./axios.js";

export const createComputerRequest = async (computer) => axios.post("/newcomputer", computer);

export const getComputerByCodeRequest = async (code) => axios.get(`/computercode/${code}`);

export const getComputersByHallRequest = async (hall) => axios.get(`/computershall/${hall}`);

export const getAllComputersRequest = async () => axios.get("/computers");

export const updateComputerRequest = async (id, computer) => axios.put(`/computer/${id}`, computer);

export const deleteComputerRequest = async (id) => axios.delete(`/computer/${id}`);