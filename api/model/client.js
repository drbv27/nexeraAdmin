const mongoose = require("mongoose");
const User = require("./user");

const clientSchema = new mongoose.Schema({
  companyName: String,
  companyStatus: String,
  details: {
    industryLicenseType: String,
    corpSole: String,
    contacts: [
      {
        name: String,
        email: String,
        phone: String,
      },
    ],
    notes: [String],
  },
  statusItems: {
    workExperienceForm: Boolean,
    CSLBAppComplete: Boolean,
    OnlineCourseSetup: Boolean,
    Bond: Boolean,
    WorkersComp: Boolean,
    LiveScan: Boolean,
  },
  conversations: [
    {
      subject: String,
      message: String,
      direction: String,
      date: String,
    },
  ],
  activities: {
    list: [String],
    tasks: [String],
    appointments: [String],
    milestones: [String],
    notes: [String],
  },
});

const Client = User.discriminator("Client", clientSchema);

module.exports = Client;
