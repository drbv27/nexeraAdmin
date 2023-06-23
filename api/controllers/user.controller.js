const errorHandler = require("../utils/errorHandler.utils");
const UserServices = require("../service/user.services");

class UserController {
  static async createUser(req, res) {
    try {
      const user = await UserServices.createUser(req.params.type, req.body);
      return user.email
        ? res.status(201).send(user)
        : res.status(404).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const user = await UserServices.getAllUsers(req.params.type);
      return user
        ? res.status(200).send(user)
        : res.status(404).send(errorHandler(0, user));
    } catch (error) {
      console.log(error);
    }
  }
  static async getUser(req, res) {
    try {
      const user = await UserServices.getUser(req.params.type, req.params.id);
      return user
        ? res.status(200).send(user)
        : res.status(404).send(errorHandler(0, user));
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUser(req, res) {
    try {
      const user = await UserServices.updateUser(req.params.type, req.body);
      return user.length === 0
        ? res.status(404).send(errorHandler(0, user))
        : res.status(202).send(user);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const user = await UserServices.deleteUser(
        req.params.type,
        req.params.id
      );
      return user.length === 0
        ? res.status(404).send(errorHandler(0, user))
        : res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
