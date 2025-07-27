import express from "express";
import UserControllers from "../controllers/user.controller.js";
const routerUser = express.Router();

routerUser.post("/", UserControllers.create);
routerUser.post("/otp", UserControllers.verified);
routerUser.post("/login", UserControllers.login);
routerUser.get("/", UserControllers.getAll);
routerUser.get("/users/:id", UserControllers.getById);
routerUser.delete("/users/:id", UserControllers.deleteById);
routerUser.delete("/users", UserControllers.deleteAll);


export default routerUser;
