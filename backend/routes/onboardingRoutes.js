import express from "express";
import {
  listApplications,
  getApplicationById,
  updateApplicationStatusById,
} from "../controllers/onboardingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, admin, listApplications);
router.get("/:id", protect, admin, getApplicationById);
router.put("/:id", protect, admin, updateApplicationStatusById);

export default router;
