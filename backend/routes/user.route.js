import express from "express";
import UserControllers from "../controllers/user.controller.js";
const routerUser = express.Router();

routerUser.post("/", UserControllers.create);

export default routerUser;
