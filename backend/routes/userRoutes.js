import express from "express";
import {
  getEmployeeProfiles,
  getEmployeeFullProfile,
  getVisaStatusById,
  updateVisaStatus,
  updateVisaDocumentStatus,
  getAllVisaStatus,
  getVisaStatusInProgress,
  searchEmployee,
  authUser,
  sendRegistrationToken,
  verifyRegistrationToken,
  registerUser,
  logoutUser,
  getRegistrationHistory,
  getOnboarding,
  postOnboarding,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();

// @desc    Get all employees profile
// @route   GET /api/users/profile
// @access  Private/Admin
router.get("/profile", protect, getEmployeeProfiles);

// @desc    Get one employee profile
// @route   GET /api/users/profile/:id
// @access  Private/Admin
router.get("/profile/:id", protect, getEmployeeFullProfile);

// @desc    Get one user's visa status by ID (for employee)
// @route   GET /api/users/visa-status/:id
// @access  Private
router.get("/visa-status/:id", protect, getVisaStatusById);

// @desc    Update one user's visa status by ID (for employee)
// @route   PUT /api/users/visa-status/:id
// @access  Private
router.put("/visa-status/:id", protect, updateVisaStatus);

// @desc    Update visa document status (HR approve or reject visa document)
// @route   PUT /api/users/visa-document-status/:id
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
// @route GET /api/users/search
// @access Private/Admin
router.get("/search", protect, admin, searchEmployee);

// @desc    Get all employees profile
// @route   GET /api/users/profile
// @access  Private/Admin
router.get("/profile", protect, getEmployeeProfiles);

// @desc    Get one employee profile
// @route   GET /api/users/profile/:id
// @access  Private/Admin
router.get("/profile/:id", protect, getEmployeeFullProfile);

// @desc    Get one user's visa status by ID (for employee)
// @route   GET /api/users/visa-status/:id
// @access  Private
router.get("/visa-status/:id", protect, getVisaStatusById);

// @desc    Update one user's visa status by ID (for employee)
// @route   PUT /api/users/visa-status/:id
// @access  Private
router.put("/visa-status/:id", protect, updateVisaStatus);

// @desc    Update visa document status (HR approve or reject visa document)
// @route   PUT /api/users/visa-document-status/:id
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
// @route GET /api/users/search
// @access Private/Admin
router.get("/search", protect, admin, searchEmployee);


router.post("/send-token", protect, admin, sendRegistrationToken);
router.post("/verify-token", verifyRegistrationToken);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/registration-history", protect, admin, getRegistrationHistory);
// router.get("/onboarding/:username", getOnboarding);
router.post("/login", authUser);
router.post("/onboarding", postOnboarding);
router.get("/onboarding", getOnboarding);

export default router;
