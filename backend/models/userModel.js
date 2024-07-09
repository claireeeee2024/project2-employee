import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["employee", "hr"],
      default: "employee",
    },
    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: String,
      preferredName: String,
      profilePicture: String,
      ssn: String,
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ["male", "female", "do not wish to answer"],
      },
    },
    address: {
      building: String,
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    contactInfo: {
      cellPhone: String,
      workPhone: String,
    },
    citizenshipStatus: {
      isPermanentResident: Boolean,
      citizenshipType: {
        type: String,
        enum: ["Green Card", "Citizen", "Work Authorization"],
      },
      workAuthorizationType: {
        type: String,
        enum: ["H1-B", "L2", "F1(CPT/OPT)", "H4", "Other"],
      },
      visaTitle: String,
      startDate: Date,
      endDate: Date,
    },
    reference: {
      firstName: String,
      lastName: String,
      middleName: String,
      phone: String,
      email: String,
      relationship: String,
    },
    emergencyContacts: [
      {
        firstName: String,
        lastName: String,
        middleName: String,
        phone: String,
        email: String,
        relationship: String,
      },
    ],
    documents: {
      driverLicense: String,
      workAuthorization: String,
    },
    onboardingStatus: {
      type: String,
      enum: ["Not Submitted", "Pending", "Approved", "Rejected"],
      default: "Not Submitted",
    },
    onboardingFeedback: String,
    visaStatus: {
      currentDocument: {
        type: String,
        enum: ["OPT Receipt", "OPT EAD", "I-983", "I-20"],
      },
      documents: {
        optReceipt: {
          file: String,
          status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
          feedback: String,
        },
        optEAD: {
          file: String,
          status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
          feedback: String,
        },
        i983: {
          file: String,
          status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
          feedback: String,
        },
        i20: {
          file: String,
          status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
          feedback: String,
        },
      },
    },
    registrationToken: {
      token: String,
      expiresAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
