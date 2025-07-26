import { Sequelize } from "sequelize";

const sequelize = new Sequelize("db_students", "postgres", "samir2001", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
