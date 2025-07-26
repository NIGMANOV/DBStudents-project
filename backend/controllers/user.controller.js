import User from "../models/user.model.js";
import generateOTP from "../utils/otp.util.js";

class UserControllers {
  async create(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const candidate = await User.findOne({ where: { email } });
      const otpCode = generateOTP();
      if (candidate) {
        res
          .status(404)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const userFormData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        otp: otpCode,
      };

      const newUser = await User.create(userFormData);

      res.status(201).json({ message: "Пользователь успешно создан", newUser });
    } catch (error) {
      res.status(404).json({ message: "Ошибка в создании пользователя" });
    }
  }
}

export default new UserControllers();
