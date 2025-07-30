import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

const Student = sequelize.define("students", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Student;
