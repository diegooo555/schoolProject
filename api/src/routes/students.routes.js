import {Router} from 'express';
import { createStudent, getStudent, deleteStudentByDocument, updateStudent, getStudents } from '../controllers/students.controller.js';

const router = Router();

router.post('/newstudent', createStudent);

router.get(`/student/:document`, getStudent);

router.get('/students', getStudents);

router.delete('/student/:document', deleteStudentByDocument);

router.put('/student/:id', updateStudent);

export default router;