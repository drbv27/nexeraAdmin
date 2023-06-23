const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1); // Termina el proceso de Node.js con un código de error
  });
