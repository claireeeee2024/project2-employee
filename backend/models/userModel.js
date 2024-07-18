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
      firstName: { type: String, default: "" },
      lastName: { type: String, default: "" },
      middleName: { type: String, default: "" },
      preferredName: { type: String, default: "" },
      profilePicture: { type: String, default: "" },
      ssn: { type: String, default: "" },
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ["male", "female", "do not wish to answer"],
      },
    },
    address: {
      building: { type: String, default: "" },
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
    },
    contactInfo: {
      cellPhone: { type: String, default: "" },
      workPhone: { type: String, default: "" },
    },
    citizenshipStatus: {
      isPermanentResident: { type: Boolean, default: false },
      citizenshipType: {
        type: String,
        enum: ["Green Card", "Citizen", "Work Authorization", ""],
      },
      workAuthorizationType: {
        type: String,
        enum: ["H1-B", "L2", "F1(CPT/OPT)", "H4", "Other", ""],
      },
      visaTitle: String,
      startDate: Date,
      endDate: Date,
    },
    reference: {
      firstName: { type: String, default: "" },
      lastName: { type: String, default: "" },
      middleName: { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      relationship: { type: String, default: "" },
    },
    emergencyContacts: [
      {
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        middleName: { type: String, default: "" },
        phone: { type: String, default: "" },
        email: { type: String, default: "" },
        relationship: { type: String, default: "" },
      },
    ],
    documents: {
      driverLicense: { type: String, default: "" },
      workAuthorization: { type: String, default: "" },
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
        default: "OPT Receipt",
        enum: ["OPT Receipt", "OPT EAD", "I-983", "I-20"],
      },
      documents: {
        optReceipt: {
          file: { type: String, default: "" },
          status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Approved", "Rejected"],
          },
          feedback: String,
        },
        optEAD: {
          file: { type: String, default: "" },
          status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Approved", "Rejected"],
          },
          feedback: String,
        },
        i983: {
          file: { type: String, default: "" },
          status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Approved", "Rejected"],
          },
          feedback: String,
        },
        i20: {
          file: { type: String, default: "" },
          status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Approved", "Rejected"],
          },
          feedback: String,
        },
      },
    },
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
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
