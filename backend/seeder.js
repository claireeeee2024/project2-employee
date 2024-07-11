import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import Registration from "./models/registrationModel.js";
import User from "./models/userModel.js";

import { connectDB } from "./config/db.js";
dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Registration.deleteMany();

    await User.insertMany(users);
    
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Registration.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
