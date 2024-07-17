import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import nodemailer from "nodemailer";
import Registration from "../models/registrationModel.js";
import crypto from "crypto";
import {
  validateDocumentSequence,
  mapDocumentType,
  validateEmail,
  validateName,
  validateUsername,
} from "../utils/validation.js";

const generateRegistrationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
// @desc    Send registration token to HR user
// @route   POST /api/hr/send-token
// @access  Private/Admin
export const sendRegistrationToken = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  // console.log(name, email);
  // 1: Check if user exists in the user table
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "Email is already registered." });
  }

  const nameError = validateName(name);
  if (nameError) {
    res.status(400);
    throw new Error(nameError);
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

// @desc    Get registration history
// @route   GET /api/hr/registration-history
// @access  Private/Admin
export const getRegistrationHistory = asyncHandler(async (req, res) => {
  const registrationHistory = await Registration.find().select(
    "email name registrationToken status"
  );
  res.json(registrationHistory);
});

// @desc    Get onboarding applications based on status
// @route   GET /api/hr/onboardings
// @access  Private
export const listOnboardings = asyncHandler(async (req, res) => {
  const sortOption = req.query.sort || "Pending";

  let applications;

  switch (sortOption) {
    case "Pending":
      applications = await User.find({
        onboardingStatus: "Pending",
        role: { $ne: "hr" },
      }).select(
        "username personalInfo.firstName personalInfo.lastName email onboardingStatus"
      );
      break;
    case "Approved":
      applications = await User.find({
        onboardingStatus: "Approved",
        role: { $ne: "hr" },
      }).select(
        "username personalInfo.firstName personalInfo.lastName email onboardingStatus"
      );
      break;
    case "Rejected":
      applications = await User.find({
        onboardingStatus: "Rejected",
        role: { $ne: "hr" },
      }).select(
        "username personalInfo.firstName personalInfo.lastName email onboardingStatus"
      );
      break;
    default:
      return res.status(400).json({ error: "Invalid sort option" });
  }

  res.json(applications);
});

// @desc    Update onboarding application status
// @route   PUT /api/hr/onboarding/:username
// @access  Private
export const updateOnboardingStatusByUsername = asyncHandler(
  async (req, res) => {
    const { username } = req.params;
    const { status, feedback } = req.body;

    const application = await User.findOne({ username });
    // console.log(application, status, feedback);
    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    if (
      application.onboardingStatus === "Approved" ||
      application.onboardingStatus === "Rejected"
    ) {
      res.status(400);
      throw new Error(
        "Cannot update application that is already approved or rejected"
      );
    }

    if (application.onboardingStatus === "Pending") {
      if (status === "Approved") {
        application.onboardingStatus = "Approved";
      } else if (status === "Rejected") {
        application.onboardingStatus = "Rejected";
        application.onboardingFeedback = feedback || "";
      } else {
        res.status(400);
        throw new Error("Invalid status");
      }
      await application.save();
      res.json({ message: `Application ${status.toLowerCase()} successfully` });
    } else {
      res.status(400);
      throw new Error("Invalid application status");
    }
  }
);

// @desc    Get all employees profile
// @route   GET /api/hr/profile
// @access  Private/Admin
export const getEmployeeProfiles = asyncHandler(async (req, res) => {
  const employees = await User.find()
    .sort({ "personalInfo.lastName": 1 })
    .select(
      "personalInfo.firstName personalInfo.lastName personalInfo.ssn citizenshipStatus.workAuthorizationType contactInfo.cellPhone email"
    );

  // Calculate total number of employees

  // Format the employee data
  const formattedEmployees = employees.map((employee) => ({
    id: employee._id,
    name: `${employee.personalInfo.lastName}, ${employee.personalInfo.firstName}`,
    ssn: employee.personalInfo.ssn,
    workAuthorizationTitle:
      employee.citizenshipStatus.workAuthorizationType || "N/A",
    phoneNumber: employee.contactInfo.cellPhone,
    email: employee.email,
  }));

  res.status(200).json({
    employees: formattedEmployees,
  });
});

// @desc    Get one employee profile
// @route   GET /api/hr/profile/:id
// @access  Private/Admin
// maybe merge with get personal information
export const getEmployeeFullProfile = asyncHandler(async (req, res) => {
  const employeeId = req.params.id;

  const employee = await User.findById(employeeId).select("-password"); // Exclude the password field

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(employee);
});

// @desc    Update visa document status (HR approve or reject visa document)
// @route   PUT /api/hr/visa-document-status/:id
// @access  Private/Admin
export const updateVisaDocumentStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Employee not found");
  }

  let { document: frontendDocumentType, status, feedback } = req.body;

  if (!frontendDocumentType || !status) {
    res.status(400);
    throw new Error("Document type and status are required");
  }

  // Map the frontend document type to the backend field name
  const documentType = mapDocumentType(frontendDocumentType);

  // Validate the document type
  const validationResult = validateDocumentSequence(user, frontendDocumentType);
  if (!validationResult.isValid) {
    return res.status(400).json({ message: validationResult.message });
  }

  // Update the document status
  const updateData = {
    [`visaStatus.documents.${documentType}.status`]: status,
    [`visaStatus.documents.${documentType}.feedback`]: feedback,
  };


  const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  res.json({
    message: "Document status updated successfully",
    visaStatus: updatedUser.visaStatus,
  });
});

// @desc    Get all users' visa status (HR view)
// @route   GET /api/hr/visa-status
// @access  Private/Admin
export const getAllVisaStatus = asyncHandler(async (req, res) => {
  const users = await User.find({}).select(
    "personalInfo.firstName personalInfo.lastName citizenshipStatus visaStatus"
  );
  res.json(users);
});

// @desc    Get all users with in-progress visa status (HR view)
// @route   GET /api/users/visa-status/in-progress
// @access  Private/Admin
export const getVisaStatusInProgress = asyncHandler(async (req, res) => {
  const users = await User.find({
    "visaStatus.currentDocument": { $ne: null },
    $or: [
      { "visaStatus.documents.optReceipt.status": { $ne: "Approved" } },
      { "visaStatus.documents.optEAD.status": { $ne: "Approved" } },
      { "visaStatus.documents.i983.status": { $ne: "Approved" } },
      { "visaStatus.documents.i20.status": { $ne: "Approved" } },
    ],
  }).select(
    "personalInfo.firstName personalInfo.lastName citizenshipStatus visaStatus"
  );
  res.json(users);
});

// @desc search employee
// @route GET /api/hr/search
// @access Private
export const searchEmployee = asyncHandler(async (req, res) => {
  const { searchTerm } = req.query;
  const users = await User.find({
    $or: [
      { "personalInfo.firstName": { $regex: searchTerm, $options: "i" } },
      { "personalInfo.lastName": { $regex: searchTerm, $options: "i" } },
      { "personalInfo.preferredName": { $regex: searchTerm, $options: "i" } },
    ],
  }).select(
    "personalInfo.firstName personalInfo.lastName personalInfo.preferredName"
  );
  res.status(200).json(users);
});


