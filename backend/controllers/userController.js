import User from "../models/userModel.js";
import Registration from "../models/registrationModel.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  validatePassword,
  validateEmail,
  validateUsername,
} from "../utils/validation.js";
import nodemailer from "nodemailer";

const generateRegistrationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Private/Admin
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // 1. Username & password validation
  const usernameError = validateUsername(username);
  if (usernameError) {
    res.status(400);
    throw new Error(usernameError);
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    res.status(400);
    throw new Error(passwordError);
  }
  // 2. Auth user & generate token
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    Send registration token to HR user
// @route   POST /api/users/send-token
// @access  Private/Admin
const sendRegistrationToken = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // 1: Check if user exists in the user table
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "Email is already registered." });
  }
  // 2: Create or update registration record in the register table
  let registration = await Registration.findOne({ email });

  if (registration) {
    // Update existing registration with new name, registrationToken and expiresAt
    registration.name = name;
    registration.registrationToken = generateRegistrationToken();
    registration.expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000);
  } else {
    // Create new registration record
    registration = await Registration.create({
      name,
      email,
      registrationToken: generateRegistrationToken(),
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    });
  }

  // 3. Save registration record
  await registration.save();

  // 4. Send email with registration link
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    port: 465,
    secure: true,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Registration Token",
    html: `<p>Dear ${name},</p><p>Please use the following token to register: <strong>${`http://localhost:3000/register?token=${registration.registrationToken}`}</strong></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send email." });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Token sent successfully." });
    }
  });
});

// @desc    Verify registration token
// @route   POST /api/users/verify-token
// @access  Public
const verifyRegistrationToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  // Find the registration record with the token
  const registration = await Registration.findOne({
    registrationToken: token,
    expiresAt: { $gt: Date.now() },
  });

  if (!registration) {
    res.status(400);
    throw new Error("Invalid or expired token.");
  }

  res
    .status(200)
    .json({ message: "Token verified successfully.", registration });
});

// @desc    Submit registration form
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, token } = req.body;

  // 1. Email, password and username validation
  const emailError = validateEmail(email);
  if (emailError) {
    res.status(400);
    throw new Error(emailError);
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    res.status(400);
    throw new Error(passwordError);
  }

  const usernameError = validateUsername(username);
  if (usernameError) {
    res.status(400);
    throw new Error(usernameError);
  }

  // 2. Find the registration record with the provided token
  const registration = await Registration.findOne({
    registrationToken: token,
    expiresAt: { $gt: Date.now() },
  });

  if (!registration) {
    res.status(400);
    throw new Error("Invalid or expired token.");
  }

  // 3. Check if email matches the registration email
  if (registration.email !== email) {
    res.status(400);
    throw new Error("Invalid email.");
  }

  // 4. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }
  // 5. Check if the username is already taken
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username is already taken.");
  }

  // 6. Create the new user
  const newUser = await User.create({
    username,
    email,
    password,
    registrationId: registration._id, // Link user to registration record
  });

  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send({ message: "Logged out successfully" });
});

// @desc    Get registration history
// @route   GET /api/users/registration-history
// @access  Private/Admin
const getRegistrationHistory = asyncHandler(async (req, res) => {
  const registrationHistory = await Registration.find().select(
    "email name registrationToken status createdAt"
  );
  res.json(registrationHistory);
});

export {
  authUser,
  sendRegistrationToken,
  verifyRegistrationToken,
  registerUser,
  logoutUser,
  getRegistrationHistory,
};
