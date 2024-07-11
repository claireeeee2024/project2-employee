import express from "express";
import {
  authUser,
  sendRegistrationToken,
  verifyRegistrationToken,
  registerUser,
  logoutUser,
  getRegistrationHistory,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.post("/send-token", protect, admin, sendRegistrationToken);
router.post("/verify-token", verifyRegistrationToken);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/registration-history", protect, admin, getRegistrationHistory);

export default router;
