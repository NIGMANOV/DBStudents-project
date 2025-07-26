import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/sequelize.config.js";
import User from "./models/user.model.js";
import routerUser from "./routes/user.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/user", routerUser);

app.listen(process.env.PORT, async () => {
  try {
    sequelize.authenticate();
    await User.sync({ force: true });
    console.log("Таблица для модели User только что была создана заново!");
    console.log("Соединение с БД было успешно установлено");
    console.log(`Server started ${process.env.PORT}`);
  } catch (error) {
    console.log("Невозможно выполнить подключение к БД: ", error);
    console.error(`Error server ${error}`);
  }
});
