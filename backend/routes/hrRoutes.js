import express from "express";
import {
  getEmployeeProfiles,
  getEmployeeFullProfile,
  updateVisaDocumentStatus,
  getAllVisaStatus,
  getVisaStatusInProgress,
  searchEmployee,
  sendRegistrationToken,
  listOnboardings,
  updateOnboardingStatusByUsername,
  getRegistrationHistory,
  sendNotificationToEmployee,
} from "../controllers/hrController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get all employees profile
// @route   GET /api/users/profile
// @access  Private/Admin
router.get("/profile", protect, admin, getEmployeeProfiles);

// @desc    Get one employee profile
// @route   GET /api/hr/profile/:id
// @access  Private/Admin
router.get("/profile/:id", protect, admin, getEmployeeFullProfile);

// @desc    Update visa document status (HR approve or reject visa document)
// @route   PUT /api/hr/visa-document-status/:id
// @access  Private/Admin
router.put("/visa-document-status/:id", protect, updateVisaDocumentStatus);

// @desc    Get all visa status
// @route   GET /api/users/visa-status
// @access  Private/Admin
router.get("/visa-status", protect, admin, getAllVisaStatus);

// @desc    Get visa status in progress
// @route   GET /api/users/visa-status/in-progress
// @access  Private/Admin
router.get("/visa-status/in-progress", protect, admin, getVisaStatusInProgress);

// @desc search employee
// @route GET /api/hr/search
// @access Private/Admin
router.get("/search", protect, admin, searchEmployee);



router.post("/send-notification", protect, admin, sendNotificationToEmployee);
router.post("/send-token", protect, admin, sendRegistrationToken);
router.get("/registration-history", protect, admin, getRegistrationHistory);
router.get("/onboardings", protect, admin, listOnboardings);
router.put("/onboarding/:username", protect, admin, updateOnboardingStatusByUsername);

export default router;
