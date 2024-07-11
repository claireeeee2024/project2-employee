import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get all pending onboarding applications
// @route   GET /api/onboarding/pending
// @access  Private
const listPendingApplications = asyncHandler(async (req, res) => {
  const pendingApplications = await User.find({
    onboardingStatus: "Pending",
  }).select("personalInfo.firstName personalInfo.lastName email");
  res.json(pendingApplications);
});

// @desc    Approve a pending onboarding application
// @route   PUT /api/onboarding/pending/:id/approve
// @access  Private
const approveApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const application = await User.findById(id);

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.onboardingStatus = "Approved";
  await application.save();

  res.json({ message: "Application approved successfully" });
});

// @desc    Reject a pending onboarding application
// @route   PUT /api/onboarding/pending/:id/reject
// @access  Private
const rejectApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { feedback } = req.body;

  const application = await User.findById(id);

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.onboardingStatus = "Rejected";
  application.onboardingFeedback = feedback;
  await application.save();

  res.json({ message: "Application rejected successfully" });
});

// @desc    Get all approved onboarding applications
// @route   GET /api/onboarding/approved
// @access  Private
const listApprovedApplications = asyncHandler(async (req, res) => {
  const approvedApplications = await User.find({
    onboardingStatus: "Approved",
  }).select("personalInfo.firstName personalInfo.lastName email");
  res.json(approvedApplications);
});

// @desc    Get all rejected onboarding applications
// @route   GET /api/onboarding/rejected
// @access  Private
const listRejectedApplications = asyncHandler(async (req, res) => {
  const rejectedApplications = await User.find({
    onboardingStatus: "Rejected",
  }).select("personalInfo.firstName personalInfo.lastName email");

  res.json(rejectedApplications);
});

// @desc    Get an onboarding application by Id
// @route   GET /api/onboarding/:id
// @access  Private
const getApplicationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const application = await User.findById(id).select(
    "personalInfo address contactInfo citizenshipStatus reference emergencyContacts documents onboardingStatus onboardingFeedback"
  );

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  res.json(application);
});

export {
  listPendingApplications,
  approveApplication,
  rejectApplication,
  listApprovedApplications,
  listRejectedApplications,
  getApplicationById,
};
