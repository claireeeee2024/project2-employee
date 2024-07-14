import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get onboarding applications based on status
// @route   GET /api/onboarding/applications
// @access  Private
export const listApplications = asyncHandler(async (req, res) => {
  const sortOption = req.query.sort || "Pending";
  console.log(req.query.sort);
  let applications;

  switch (sortOption) {
    case "Pending":
      applications = await User.find({
        onboardingStatus: "Pending",
        role: { $ne: "hr" },
      }).select(
        "personalInfo.firstName personalInfo.lastName email onboardingStatus"
      );
      break;
    case "Approved":
      applications = await User.find({
        onboardingStatus: "Approved",
        role: { $ne: "hr" },
      }).select(
        "personalInfo.firstName personalInfo.lastName email onboardingStatus"
      );
      break;
    case "Rejected":
      applications = await User.find({
        onboardingStatus: "Rejected",
        role: { $ne: "hr" },
      }).select(
        "personalInfo.firstName personalInfo.lastName email onboardingStatus"
      );
      break;
    default:
      return res.status(400).json({ error: "Invalid sort option" });
  }

  res.json(applications);
});

// @desc    Get an onboarding application by Id
// @route   GET /api/onboarding/:id
// @access  Private
export const getApplicationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const application = await User.findById(id).select(
    "personalInfo address contactInfo citizenshipStatus reference emergencyContacts documents onboardingStatus onboardingFeedback"
  );
  console.log(application);
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  res.json(application);
});

// @desc    Update onboarding application status
// @route   PUT /api/onboarding/:id
// @access  Private
export const updateApplicationStatusById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, feedback } = req.body;
  console.log(id);
  const application = await User.findById(id);

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
});
