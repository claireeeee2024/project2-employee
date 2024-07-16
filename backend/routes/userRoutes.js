import express from "express";
import {
  getVisaStatusById,
  updateVisaStatus,
  authUser,
  verifyRegistrationToken,
  registerUser,
  logoutUser,
  getOnboarding,
  postOnboarding,
  updateInfo,
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

router.post("/verify-token", verifyRegistrationToken);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);

router.post("/onboarding", postOnboarding);
router.get("/onboarding", getOnboarding);
router.put("/info", updateInfo);

export default router;
