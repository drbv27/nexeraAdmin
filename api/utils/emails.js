require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendAccesCode = (email, token) => {
  const msg = {
    to: email,
    from: "hebreoxs@gmail.com", //no cambiar
    templateId: "d-6831854fd89d4a2e8f0d6496f6175e48",
    dynamic_template_data: {
      link: `${process.env.CLIENT_URL}/createPassword`,
      token: token,
      email: email,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email enviado");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendResetPassEmail = (email, token) => {
  const msg = {
    to: email,
    from: "hebreoxs@gmail.com", //no cambiar
    templateId: "d-36241582b28045da81de4e14bde88999",
    dynamic_template_data: {
      link: `${process.env.CLIENT_URL}/passReset/${token}`,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("email enviado");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendMessageSuspend = (name, email) => {
  const msg = {
    to: email,
    from: "hebreoxs@gmail.com", //no cambiar
    templateId: "d-92f73e6b256b431ab2c1d8fc40319b46",
    dynamic_template_data: {
      fullname: name,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email enviado");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendMessageActive = (name, email) => {
  const msg = {
    to: email,
    from: "hebreoxs@gmail.com", //no cambiar
    templateId: "d-bfd22511c6204ccb84d5ad158f76e793",
    dynamic_template_data: {
      link: `${process.env.CLIENT_URL}`,
      fullname: name,
      email: email,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email enviado");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendResetPassEmail,
  sendAccesCode,
  sendMessageSuspend,
  sendMessageActive,
};
