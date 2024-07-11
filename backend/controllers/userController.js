import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// @desc    Get onboarding status by username
// @route   Get /api/users/onboarding/:username
// @access  Public
// export const getOnboarding = asyncHandler(async (req, res) => {
//   const username = req.params.username;
//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   return res.status(200).json({ onboarding: user.onboardingStatus });
// });

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username) {
    res.status(400);
    throw new Error("username is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("password is required");
  }
  const user = await User.findOne({ username });
  //   console.log(user);
  if (user && (await user.matchPassword(password))) {
    // generateToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      onboarding: user.onboardingStatus,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    Onboarding
// @route   POST /api/users/onboarding
// @access  Public
export const postOnboarding = asyncHandler(async (req, res) => {
  const { username, formData } = req.body;

  const user = await User.findOneAndUpdate(
    { username },
    {
      $set: {
        onboardingStatus: "Pending",
        "personalInfo.firstName": formData.firstName,
        "personalInfo.lastName": formData.lastName,
        "personalInfo.middleName": formData.middleName,
        "personalInfo.preferredName": formData.preferredName,
        "personalInfo.profilePicture": formData.profilePicture,
        "personalInfo.ssn": formData.ssn,
        "personalInfo.dateOfBirth": formData.dateOfBirth,
        "personalInfo.gender": formData.gender,
        "address.building": formData.address.building,
        "address.street": formData.address.street,
        "address.city": formData.address.city,
        "address.state": formData.address.state,
        "address.zip": formData.address.zip,
        "contactInfo.cellPhone": formData.cellPhone,
        "contactInfo.workPhone": formData.workPhone,
        "citizenshipStatus.isPermanentResident": formData.permanentResident,
        "citizenshipStatus.citizenshipType": formData.citizenshipType,
        "citizenshipStatus.workAuthorizationType": formData.workAuthorization,
        "citizenshipStatus.visaTitle": formData.visaTitle,
        "citizenshipStatus.startDate": formData.startDate,
        "citizenshipStatus.endDate": formData.endDate,
        "reference.firstName": formData.reference.firstName,
        "reference.lastName": formData.reference.lastName,
        "reference.middleName": formData.reference.middleName,
        "reference.phone": formData.reference.phone,
        "reference.email": formData.reference.email,
        "reference.relationship": formData.reference.relationship,
        emergencyContacts: formData.emergencyContacts,
        "documents.profilePicture": formData.documents.profilePicture,
        "documents.driversLicense": formData.documents.driversLicense,
        "documents.workAuthorization": formData.documents.workAuthorization,
        "visaStatus.documents.optReceipt.file": formData.optReceipt,
        // 更新其它visaStatus文档
      },
    },
    { new: true } // 返回更新后的文档
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    username: user.username,
    onboarding: user.onboardingStatus,
  });
});

// @desc    Onboarding
// @route   GET /api/users/onboarding
// @access  Public
export const getOnboarding = asyncHandler(async (req, res) => {
  const username = req.query.username;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log("getttt");
  console.log(user);
  return res.status(200).json(user);
});
