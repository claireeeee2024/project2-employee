import bcrypt from "bcryptjs";

const users = [
  {
    username: "johnDoe",
    password: bcrypt.hashSync("123456", 10),
    email: "john.doe@example.com",
    role: "employee",
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      middleName: "A",
      preferredName: "Johnny",
      profilePicture: "john_doe_profile.jpg",
      ssn: "123-45-6789",
      dateOfBirth: new Date("1990-01-01"),
      gender: "male",
    },
    address: {
      building: "123",
      street: "Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    contactInfo: {
      cellPhone: "555-555-5555",
      workPhone: "555-555-5556",
    },
    citizenshipStatus: {
      isPermanentResident: true,
      citizenshipType: "Citizen",
      visaTitle: "Software Engineer",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2025-01-01"),
    },
    reference: {
      firstName: "Jane",
      lastName: "Smith",
      middleName: "B",
      phone: "555-555-5557",
      email: "jane.smith@example.com",
      relationship: "Colleague",
    },
    emergencyContacts: [
      {
        firstName: "Mary",
        lastName: "Doe",
        middleName: "C",
        phone: "555-555-5558",
        email: "mary.doe@example.com",
        relationship: "Spouse",
      },
    ],
    documents: {
      driverLicense: "john_doe_dl.jpg",
      workAuthorization: "john_doe_wa.jpg",
    },
    onboardingStatus: "Not Submitted",
    onboardingFeedback: "",
    visaStatus: {
      currentDocument: "OPT Receipt",
      documents: {
        optReceipt: {
          file: "opt_receipt.jpg",
          status: "Pending",
          feedback: "",
        },
        optEAD: {
          file: "opt_ead.jpg",
          status: "Pending",
          feedback: "",
        },
        i983: {
          file: "i983.jpg",
          status: "Pending",
          feedback: "",
        },
        i20: {
          file: "i20.jpg",
          status: "Pending",
          feedback: "",
        },
      },
    },
    registrationToken: {
      token: "token123",
      expiresAt: new Date("2024-01-01"),
    },
  },
  {
    username: "janeDoe",
    password: bcrypt.hashSync("123456", 10),
    email: "jane.doe@example.com",
    role: "employee",
    personalInfo: {
      firstName: "Jane",
      lastName: "Doe",
      middleName: "B",
      preferredName: "Janey",
      profilePicture: "jane_doe_profile.jpg",
      ssn: "987-65-4321",
      dateOfBirth: new Date("1985-05-05"),
      gender: "female",
    },
    address: {
      building: "456",
      street: "Broadway",
      city: "Othertown",
      state: "NY",
      zip: "54321",
    },
    contactInfo: {
      cellPhone: "555-555-5559",
      workPhone: "555-555-5560",
    },
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "L2",
      visaTitle: "Project Manager",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2024-01-01"),
    },
    reference: {
      firstName: "John",
      lastName: "Smith",
      middleName: "D",
      phone: "555-555-5561",
      email: "john.smith@example.com",
      relationship: "Manager",
    },
    emergencyContacts: [
      {
        firstName: "Bob",
        lastName: "Doe",
        middleName: "E",
        phone: "555-555-5562",
        email: "bob.doe@example.com",
        relationship: "Brother",
      },
    ],
    documents: {
      driverLicense: "jane_doe_dl.jpg",
      workAuthorization: "jane_doe_wa.jpg",
    },
    onboardingStatus: "Pending",
    onboardingFeedback: "Pending approval from HR.",
    visaStatus: {
      currentDocument: "I-983",
      documents: {
        optReceipt: {
          file: "opt_receipt.jpg",
          status: "Approved",
          feedback: "All good.",
        },
        optEAD: {
          file: "opt_ead.jpg",
          status: "Approved",
          feedback: "All good.",
        },
        i983: {
          file: "i983.jpg",
          status: "Pending",
          feedback: "",
        },
        i20: {
          file: "i20.jpg",
          status: "Rejected",
          feedback: "Missing signature.",
        },
      },
    },
    registrationToken: {
      token: "token456",
      expiresAt: new Date("2024-06-01"),
    },
  },
  {
    username: "markSmith",
    password: bcrypt.hashSync("123456", 10),
    email: "mark.smith@example.com",
    role: "hr",
    personalInfo: {
      firstName: "Mark",
      lastName: "Smith",
      middleName: "F",
      preferredName: "Marky",
      profilePicture: "mark_smith_profile.jpg",
      ssn: "111-22-3333",
      dateOfBirth: new Date("1975-03-15"),
      gender: "do not wish to answer",
    },
    address: {
      building: "789",
      street: "Wall St",
      city: "Bigcity",
      state: "TX",
      zip: "67890",
    },
    contactInfo: {
      cellPhone: "555-555-5563",
      workPhone: "555-555-5564",
    },
    citizenshipStatus: {
      isPermanentResident: true,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "F1(CPT/OPT)",
      visaTitle: "HR Manager",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2023-01-01"),
    },
    reference: {
      firstName: "Alice",
      lastName: "Johnson",
      middleName: "G",
      phone: "555-555-5565",
      email: "alice.johnson@example.com",
      relationship: "Friend",
    },
    emergencyContacts: [
      {
        firstName: "Steve",
        lastName: "Smith",
        middleName: "H",
        phone: "555-555-5566",
        email: "steve.smith@example.com",
        relationship: "Cousin",
      },
    ],
    documents: {
      driverLicense: "mark_smith_dl.jpg",
      workAuthorization: "mark_smith_wa.jpg",
    },
    onboardingStatus: "Approved",
    onboardingFeedback: "Welcome aboard!",
    visaStatus: {
      currentDocument: "I-20",
      documents: {
        optReceipt: {
          file: "opt_receipt.jpg",
          status: "Approved",
          feedback: "All set.",
        },
        optEAD: {
          file: "opt_ead.jpg",
          status: "Rejected",
          feedback: "Incomplete form.",
        },
        i983: {
          file: "i983.jpg",
          status: "Approved",
          feedback: "All good.",
        },
        i20: {
          file: "i20.jpg",
          status: "Approved",
          feedback: "All good.",
        },
      },
    },
    registrationToken: {
      token: "token789",
      expiresAt: new Date("2025-01-01"),
    },
  },
];

export default users;
