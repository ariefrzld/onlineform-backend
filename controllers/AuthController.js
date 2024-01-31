import User from "../models/User.js";
import emailExist from "../libraries/emailExist.js";
import bcrypt from "bcrypt";

class AuthController {
  async register(req, res) {
    try {
      if (!req.body.fullname) {
        throw { code: 400, message: "FULLNAME_IS_REQUIRED" };
      }
      if (!req.body.email) {
        throw { code: 400, message: "EMAIL_IS_REQUIRED" };
      }
      if (!req.body.password) {
        throw { code: 400, message: "PASSWORD_IS_REQUIRED" };
      }
      if (req.body.password.length < 6) {
        throw { code: 400, message: "PASSWORD_MINIMUM_6_CHARACTER" };
      }

      const isEmailExist = await emailExist(req.body.email);
      if (isEmailExist) {
        throw { code: 409, message: "EMAIL_ALREADY_EXIST" };
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash,
      });
      if (!user) {
        throw { code: 500, message: "USER_REGISTER_FAILED" };
      }

      return res.status(200).json({
        status: true,
        message: "USER_REGISTER_SUCCESS",
        user,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      if (!req.body.email) {
        throw { code: 400, message: "EMAIL_IS_REQUIRED" };
      }
      if (!req.body.password) {
        throw { code: 400, message: "PASSWORD_IS_REQUIRED" };
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw { code: 404, message: "USER_NOT_FOUND" };
      }

      const isPasswordValid = await bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordValid) {
        throw { code: 400, message: "INVALID_PASSWORD" };
      }

      return res.status(200).json({
        status: true,
        message: "USER_LOGIN_SUCCESS",
        fullname: user.fullname,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

export default new AuthController();
