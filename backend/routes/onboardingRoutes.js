import express from "express";
import {
  listPendingApplications,
  approveApplication,
  rejectApplication,
  listApprovedApplications,
  listRejectedApplications,
  getApplicationById,
} from "../controllers/onboardingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending", protect, admin, listPendingApplications);
router.put("/pending/:id/approve", protect, admin, approveApplication);
router.put("/pending/:id/reject", protect, admin, rejectApplication);
router.get("/approved", protect, admin, listApprovedApplications);
router.get("/rejected", protect, admin, listRejectedApplications);
router.get("/:id", protect, admin, getApplicationById);

export default router;
