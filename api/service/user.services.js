const { default: mongoose } = require("mongoose");
const Client = require("../model/client");
const Model = {
  client: Client,
};

class UserServices {
  static async createUser(path, user) {
    const activationCode = Math.floor(Math.random() * 99999);
    try {
      const newUser = new Model[path]({ ...user, activationCode });
      const userSaved = await newUser.save();
      return userSaved;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async getAllUsers(path) {
    try {
      return await Model[path]
        .find({})
        .select("-password -salt")
        .sort({ username: 1 });
    } catch (error) {
      console.log(error);
    }
  }
  static async getUser(path, id) {
    try {
      return await Model[path]
        .findOne({ _id: id })
        .select("-password -salt")
        .sort({ username: 1 });
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUser(path, body) {
    try {
      const { name, address, phone, position, superuser } = body.data;
      const { userId } = body;

      const user = await Model[path].findById(userId);

      user.name = name;
      user.address = address;
      user.phone = phone;
      user.position = position;
      user.superuser = superuser;

      return await user.save();
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(path, id) {
    try {
      const user = await Model[path]
        .findOne({ _id: id })
        .select("-password -salt")
        .sort({ username: 1 });
      if (user.doctor && user.doctor.length > 0) {
        const patientId = user._id;
        const doctorId = user.doctor[0];

        const doctor = await Doctor.findById(doctorId);
        if (doctor && Array.isArray(doctor.pacientes)) {
          const patientIndex = doctor.pacientes.findIndex(
            (patient) => patient.toString() === patientId.toString()
          );
          if (patientIndex !== -1) {
            doctor.pacientes.splice(patientIndex, 1);
            await doctor.save();
          }
        }
      }
      return await Model[path].deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserServices;
