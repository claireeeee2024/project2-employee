import express from "express";
import {
  getOnboarding,
  authUser,
  postOnboarding,
} from "../controllers/userController.js";

const router = express.Router();

// router.get("/onboarding/:username", getOnboarding);
router.post("/login", authUser);
router.post("/onboarding", postOnboarding);
router.get("/onboarding", getOnboarding);

export default router;
