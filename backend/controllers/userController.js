import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { validateDocumentSequence, mapDocumentType } from "../utils/validation.js";
import Registration from "../models/registrationModel.js";
import crypto from "crypto";
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
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
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
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      onboardingStatus: user.onboardingStatus,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    Send registration token to HR user
// @route   POST /api/users/send-token
// @access  Private/Admin
export const sendRegistrationToken = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  // 1: Check if user exists in the user table
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "Email is already registered." });
  }

  const usernameError = validateUsername(name);
  if (usernameError) {
    res.status(400);
    console.log("usernameError");
    throw new Error(usernameError);
  }

  const emailError = validateEmail(email);
  if (emailError) {
    res.status(400);
    throw new Error(emailError);
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
export const verifyRegistrationToken = asyncHandler(async (req, res) => {
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
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, token } = req.body;
  console.log(username, email, password, token);
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
    registrationId: registration._id,
  });

  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      role: newUser.role,
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
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send({ message: "Logged out successfully" });
});

// @desc    Get registration history
// @route   GET /api/users/registration-history
// @access  Private/Admin
export const getRegistrationHistory = asyncHandler(async (req, res) => {
  const registrationHistory = await Registration.find().select(
    "email name registrationToken status"
  );
  res.json(registrationHistory);
});

// @desc    Onboarding
// @route   POST /api/users/onboarding
// @access  Public
export const postOnboarding = asyncHandler(async (req, res) => {
  const { username, formData } = req.body;

  const user = await User.findOneAndUpdate(
    { username },
    {
      $set: {
        onboardingStatus: "Pending",
        "personalInfo.firstName": formData.firstName,
        "personalInfo.lastName": formData.lastName,
        "personalInfo.middleName": formData.middleName,
        "personalInfo.preferredName": formData.preferredName,
        "personalInfo.profilePicture": formData.profilePicture,
        "personalInfo.ssn": formData.ssn,
        "personalInfo.dateOfBirth": formData.dateOfBirth,
        "personalInfo.gender": formData.gender,
        "address.building": formData.address.building,
        "address.street": formData.address.street,
        "address.city": formData.address.city,
        "address.state": formData.address.state,
        "address.zip": formData.address.zip,
        "contactInfo.cellPhone": formData.cellPhone,
        "contactInfo.workPhone": formData.workPhone,
        "citizenshipStatus.isPermanentResident": formData.permanentResident,
        "citizenshipStatus.citizenshipType": formData.citizenshipType,
        "citizenshipStatus.workAuthorizationType": formData.workAuthorization,
        "citizenshipStatus.visaTitle": formData.visaTitle,
        "citizenshipStatus.startDate": formData.startDate,
        "citizenshipStatus.endDate": formData.endDate,
        "reference.firstName": formData.reference.firstName,
        "reference.lastName": formData.reference.lastName,
        "reference.middleName": formData.reference.middleName,
        "reference.phone": formData.reference.phone,
        "reference.email": formData.reference.email,
        "reference.relationship": formData.reference.relationship,
        emergencyContacts: formData.emergencyContacts,
        "documents.profilePicture": formData.documents.profilePicture,
        "documents.driversLicense": formData.documents.driversLicense,
        "documents.workAuthorization": formData.documents.workAuthorization,
        "visaStatus.documents.optReceipt.file": formData.optReceipt,
        // 更新其它visaStatus文档
      },
    },
    { new: true } // 返回更新后的文档
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const registration = await Registration.findByIdAndUpdate(
    user.registrationId,
    { status: "Submitted" },
    { new: true }
  );

  if (!registration) {
    console.log("Something went wrong.");
  }

  res.status(200).json({
    _id: user._id,
    username: user.username,
    onboarding: user.onboardingStatus,
  });
});

// @desc    Onboarding
// @route   GET /api/users/onboarding
// @access  Public
export const getOnboarding = asyncHandler(async (req, res) => {
  const username = req.query.username;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});



// @desc    Get one user's visa status by ID (for employee)
// @route   GET /api/users/visa-status/:id
// @access  Private
export const getVisaStatusById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      visaStatus: user.visaStatus,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Upload user visa files (for employee)
// @route   PUT /api/users/visa-status/:id
// @access  Private
export const updateVisaStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const { documentType, file } = req.body; // Assuming file is a string (file path or URL)

    if (!documentType || !file) {
      res.status(400);
      throw new Error("Document type and file are required");
    }

    // Validate the document
    const validationResult = validateDocumentSequence(user, documentType);
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    // Update the document status and file path
    const document = mapDocumentType(documentType);

    const updateData = {
      [`visaStatus.documents.${document}.file`]: file,
      [`visaStatus.documents.${document}.status`]: "Pending",
      "visaStatus.currentDocument": documentType,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json({
      message: "Document uploaded successfully",
      visaStatus: updatedUser.visaStatus,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

