const Users = require("../model/user");
const bcrypt = require("bcrypt");
const {
  sendResetPassEmail,
  sendMessageSuspend,
  sendMessageActive,
} = require("../utils/emails");
const { generateToken, validateToken } = require("../middlewares/auth");

class AuthService {
  static async login({ email, password }) {
    try {
      const user = await Users.findOne({ email: email });
      // validates user exists
      if (!user) return 404; //user doesn't exist
      if (user.isActivated) {
        // Validates password
        if (!bcrypt.compareSync(String(password), user.password)) {
          return 401; //incorrect pass
        }
      }
      if (!user.isActivated && user.activationCode > 0) {
        const parsedPass = parseInt(password);
        if (parsedPass !== user.activationCode) {
          return 402; //token incorrect, returns
        }
      }
      if (!user.isActivated && user.activationCode == 0) {
        const parsedPass = parseInt(password);
        if (parsedPass !== user.activationCode) {
          return 403; //user suspend
        }
      }
      const userOk = {
        _id: user._id,
        position: user.position,
        superAdmin: user.superAdmin,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        country: user.country,
        state: user.state,
        city: user.city,
        role: user.role,
        isActivated: user.isActivated,
        activationCode: user.activationCode,
        name: user.name,
        address: user.address,
        phone: user.phone,
        gender: user.gender,
        antencedentes: user.antencedentes,
        alergias: user.alergias,
        doctores: user.doctor,
        pacientes: user.pacientes,
        superAdmin: user.superAdmin,
        horarioDisponible: user.horariosDisponible,
        profilePhoto: user.profilePhoto
      };
      return userOk;
    } catch (error) {
      console.error(error);
    }
  }

  static async newPassword({ email, token, password }) {
    try {
      const user = await Users.findOne({ email: email });
      if (!user) return "No user Found";
      if (token === user.activationCode) {
        user.isActivated = true;
        user.password = password;
        user.activationCode = 0;
        const userOk = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActivated: user.isActivated,
          activationCode: user.activationCode,
        };
        await user.save();
        return userOk;
      } else return "Wrong token";
    } catch (error) {
      console.error(error);
    }
  }

  static async forgotPassword(body) {
    try {
      const user = await Users.findOne({ email: body.email });
      if (!user) return "No existe un usuario con ese email";
      const token = generateToken(user.email);

      //Setea un token provisorio en el modelo de User y le envia un mail al usuario vinculado a ese token.

      await Users.findOneAndUpdate(
        { email: user.email },
        { $set: { resetLink: token } }
      );

      sendResetPassEmail(user.email, token);

      return "Se le ha enviado un email para recuperar su contrasena";
    } catch (error) {
      console.error(error);
    }
  }

  static async resetPassword({ resetLink, newPassword }) {
    if (resetLink) {
      try {
        //valida que el token recibido sea correcto y que no haya expirado
        const validatedUser = await validateToken(resetLink);
        if (!validatedUser) return "Su token ya expiro o es incorrecto";

        //encuentra al usuario que coincide con ese token
        const user = await Users.findOne({ email: validatedUser.user });
        if (!user) return "No existe un usuario con este token";

        //compara si el token del modelo de User coincide con el token recibido por parametro y setea contrasena
        if (resetLink === user.resetLink) {
          user.password = newPassword;
          user.resetLink = null;
          return user.save();
        } else return "Token Incorrecto";
      } catch (error) {
        console.error(error);
      }
    } else return "Usted no posee un token";
  }
  static async SuspendUser(body) {
    try {
      const user = await Users.findOne({ email: body.email })
        .select("-password -salt")
        .sort({ username: 1 });
      if (!user) return "No existe un usuario con ese email";
      user.isActivated = false;
      const userUpd = await user.save();

      if (userUpd) sendMessageSuspend(userUpd.name, userUpd.email);
      return userUpd;
    } catch (error) {
      console.error(error);
    }
  }
  static async ActiveUser(body) {
    try {
      const user = await Users.findOne({ email: body.email });
      if (!user) return "No existe un usuario con ese email";
      user.isActivated = true;
      const userUpd = await user.save();

      if (userUpd) sendMessageActive(userUpd.name, userUpd.email);

      return "User is actived";
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AuthService;
