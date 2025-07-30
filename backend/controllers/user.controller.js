import User from "../models/user.model.js";
import { sendOtpEmail } from "../utils/nodemailer.utils.js";
import generateOTP from "../utils/otp.util.js";

class UserControllers {
  // Функция отвечает за создания нового пользователя
  async create(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return res
          .status(409)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const otpCode = generateOTP();

      sendOtpEmail(email, otpCode); // Отправка OTP на почту

      const userFormData = {
        first_name,
        last_name,
        email,
        password,
        otp: otpCode,
      };

      const newUser = await User.create(userFormData);

      res.status(201).json({
        message: "Пользователь успешно создан",
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Ошибка в создании пользователя" });
    }
  }

  // Функция отвечает за верификацию пользователя
  async verified(req, res) {
    try {
      const { email, otp } = req.body;

      const candidate = await User.findOne({ where: { email } });

      if (!candidate || otp !== candidate.otp) {
        return res.status(409).json({ message: "OTP код не верный" });
      }

      // Обновляем статус и сохраняем
      candidate.is_verified = true;
      candidate.otp = null; // (опционально) обнуляем OTP после верификации
      await candidate.save(); // сохраняем в БД

      res.status(200).json({
        message: "Пользователь успешно верифицирован",
        user: candidate,
      });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при верификации пользователя" });
    }
  }

  // // Функция отвечает за авторизацию пользователя
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ where: { email } });

      if (!candidate) {
        return res.status(409).json({ message: "Пароль или email не верны" });
      }

      if (candidate.password !== password) {
        return res.status(409).json({ message: "Пароль или email не верны" });
      }

      if (!candidate.is_verified) {
        return res.status(409).json({
          message: "Пользователь не прошел верификацию, проверьте почту на OTP",
        });
      }

      res.status(200).json({
        message: "Пользователь успешно авторизовался",
      });
    } catch (error) {
      res.status(500).json({ message: "Ошибка в авторизации пользователя" });
    }
  }

  // Функция отвечает за получения всех пользователей
  async getAll(req, res) {
    try {
      const getAllUsers = await User.findAll();
      res.status(200).json(getAllUsers);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  }

  // Функция отвечает за получение пользователя по ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении пользователя" });
    }
  }

  // Функция отвечает за удаление пользователя по ID
  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const deletedCount = await User.destroy({ where: { user_id: id } });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.status(200).json({ message: "Пользователь успешно удалён" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при удалении пользователя" });
    }
  }

  // Функция отвечает за удаление всех пользователей
  async deleteAll(req, res) {
    try {
      await User.destroy({ where: {}, truncate: true });

      res.status(200).json({ message: "Все пользователи были удалены" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка при удалении всех пользователей" });
    }
  }
}

export default new UserControllers();
