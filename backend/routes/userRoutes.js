import express from "express";
import {
  getVisaStatusById,
  updateVisaStatus,
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


// @desc    Get one user's visa status by ID (for employee)
// @route   GET /api/users/visa-status/:id
// @access  Private
router.get("/visa-status/:id", protect, getVisaStatusById);

// @desc    Update one user's visa status by ID (for employee)
// @route   PUT /api/users/visa-status/:id
// @access  Private
router.put("/visa-status/:id", protect, updateVisaStatus);


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
