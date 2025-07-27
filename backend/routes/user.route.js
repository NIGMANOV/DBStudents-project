import express from "express";
import UserControllers from "../controllers/user.controller.js";
const routerUser = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь создан
 *       409:
 *         description: Пользователь уже существует
 */
routerUser.post("/", UserControllers.create);

/**
 * @swagger
 * /api/users/otp:
 *   post:
 *     summary: Верификация пользователя по OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Верификация успешна
 *       409:
 *         description: Неверный OTP
 */
routerUser.post("/otp", UserControllers.verified);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *       409:
 *         description: Ошибка авторизации
 */
routerUser.post("/login", UserControllers.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Успешный ответ
 */
routerUser.get("/", UserControllers.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
routerUser.get("/users/:id", UserControllers.getById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешное удаление
 *       404:
 *         description: Пользователь не найден
 */
routerUser.delete("/users/:id", UserControllers.deleteById);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Удалить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Все пользователи удалены
 */
routerUser.delete("/users", UserControllers.deleteAll);

export default routerUser;
