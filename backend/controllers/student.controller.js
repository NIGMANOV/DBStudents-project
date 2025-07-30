import Student from "../models/student.model.js";

class StudentControllers {
  // Функция отвечает за создания студента
  async create(req, res) {
    try {
      const { first_name, last_name } = req.body;

      const studentForm = {
        first_name: first_name,
        last_name: last_name,
      };

      const newStudent = await Student.create(studentForm);

      res
        .status(201)
        .json({ message: "Студент успешно создан", student: newStudent });
    } catch (error) {
      res.status(500).json({ message: "Ошибка в создании студента" });
    }
  }
}

export default new StudentControllers();
