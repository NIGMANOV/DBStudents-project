import express from "express";
import StudentControllers from "../controllers/student.controller.js";
const routerStudent = express.Router();

routerStudent.post("/", StudentControllers.create);

export default routerStudent;
