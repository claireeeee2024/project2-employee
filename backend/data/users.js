import bcrypt from "bcryptjs";
const users = [
  // hr onboarding approved
  {
    username: "hrtest",
    password: bcrypt.hashSync("123456", 10),
    email: "hr@email.com",
    role: "hr",
    personalInfo: {
      firstName: "HR",
      lastName: "Williams",
      middleName: "",
      preferredName: "",
      profilePicture: "",
      ssn: "123456789",
      dateOfBirth: new Date("1990-01-15"),
      gender: "female",
    },
    address: {
      building: "123",
      street: "Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    contactInfo: {
      cellPhone: "123-456-7890",
      workPhone: "234-567-8901",
    },
    reference: {
      firstName: "Emily",
      lastName: "Clark",
      middleName: "",
      phone: "345-678-9012",
      email: "emily.clark@example.com",
      relationship: "Colleague",
    },
    emergencyContacts: [
      {
        firstName: "Michael",
        lastName: "Williams",
        middleName: "",
        phone: "456-789-0123",
        email: "michael.williams@example.com",
        relationship: "Spouse",
      },
    ],
    citizenshipStatus: {
      isPermanentResident: true,
      citizenshipType: "Citizen",
    },
    onboardingStatus: "Approved",
  },
  // registered, not submitted
  {
    username: "alice_johnson",
    password: bcrypt.hashSync("123456", 10),
    email: "alice.johnson@example.com",
  },
  // onboarding not submitted
  {
    username: "david_brown",
    password: bcrypt.hashSync("123456", 10),
    email: "david.brown@example.com",
    role: "employee",
    personalInfo: {
      firstName: "David",
      lastName: "Brown",
      dateOfBirth: new Date("1988-06-18"),
      gender: "male",
    },
    address: {
      building: "789",
      street: "Birch St",
      city: "Star City",
      state: "CA",
      zip: "90210",
    },
    contactInfo: {
      cellPhone: "012-345-6789",
      workPhone: "123-456-7893",
    },
    reference: {
      firstName: "David",
      lastName: "Jones",
      middleName: "",
      phone: "567-890-1234",
      email: "david.jones@example.com",
      relationship: "Manager",
    },
    emergencyContacts: [
      {
        firstName: "Sara",
        lastName: "Johnson",
        middleName: "",
        phone: "678-901-2345",
        email: "sara.johnson@example.com",
        relationship: "Sister",
      },
    ],
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      visaTitle: "Project Manager",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2023-12-31"),
    },
    onboardingStatus: "Not Submitted",
    visaStatus: {
      currentDocument: "OPT Receipt",
      documents: {
        optReceipt: {
          file: "opt_receipt_david_brown.pdf",
          status: "Pending",
        },
      },
    },
  },
  // onboarding citizen rejected
  {
    username: "carol_lee",
    password: bcrypt.hashSync("123456", 10),
    email: "carol.lee@example.com",
    role: "employee",
    personalInfo: {
      firstName: "Carol",
      lastName: "Lee",
      dateOfBirth: new Date("1995-11-07"),
      gender: "female",
    },
    address: {
      building: "102",
      street: "Elm St",
      city: "Gotham",
      state: "NY",
      zip: "10001",
    },
    contactInfo: {
      cellPhone: "789-012-3456",
      workPhone: "890-123-4567",
    },
    reference: {
      firstName: "Jennifer",
      lastName: "Smith",
      middleName: "",
      phone: "789-012-3456",
      email: "jennifer.smith@example.com",
      relationship: "Supervisor",
    },
    emergencyContacts: [
      {
        firstName: "Laura",
        lastName: "Brown",
        middleName: "",
        phone: "890-123-4567",
        email: "laura.brown@example.com",
        relationship: "Mother",
      },
    ],
    citizenshipStatus: {
      isPermanentResident: true,
      citizenshipType: "Citizen",
    },
    onboardingStatus: "Rejected",
    onboardingFeedback: "Invalid Format.",
  },
  // onboarding opt receipt pending
  {
    username: "eva_martin",
    password: bcrypt.hashSync("123456", 10),
    email: "eva.martin@example.com",
    role: "employee",
    personalInfo: {
      firstName: "Eva",
      lastName: "Martin",
      dateOfBirth: new Date("1975-12-30"),
      gender: "female",
    },
    address: {
      building: "321",
      street: "Cedar St",
      city: "Central City",
      state: "OH",
      zip: "43215",
    },
    contactInfo: {
      cellPhone: "456-789-0124",
      workPhone: "567-890-1235",
    },
    reference: {
      firstName: "Tom",
      lastName: "Harris",
      middleName: "",
      phone: "901-234-5678",
      email: "tom.harris@example.com",
      relationship: "Colleague",
    },
    emergencyContacts: [
      {
        firstName: "Nancy",
        lastName: "Lee",
        middleName: "",
        phone: "012-345-6789",
        email: "nancy.lee@example.com",
        relationship: "Sister",
      },
    ],
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "F1(CPT/OPT)",
      visaTitle: "Software Engineer",
      startDate: new Date("2024-11-07"),
      endDate: new Date("2024-11-07"),
    },
    onboardingStatus: "Pending",
    visaStatus: {
      currentDocument: "OPT Receipt",
      documents: {
        optReceipt: {
          file: "opt_receipt_eva_martin.pdf",
          status: "Pending",
        },
        optEAD: {
          file: null,
          status: "Pending",
        },
        i983: {
          file: null,
          status: "Pending",
        },
        i20: {
          file: null,
          status: "Pending",
        },
      },
    },
  },
  // onboarding opt receipt rejected
  {
    username: "bob_williams",
    password: bcrypt.hashSync("123456", 10),
    email: "bob.williams@example.com",
    role: "employee",
    personalInfo: {
      firstName: "Bob",
      lastName: "Williams",
      dateOfBirth: new Date("1980-09-23"),
      gender: "male",
    },
    address: {
      building: "456",
      street: "Maple Ave",
      city: "Metropolis",
      state: "TX",
      zip: "75001",
    },
    contactInfo: {
      cellPhone: "456-789-0123",
      workPhone: "567-890-1234",
    },
    reference: {
      firstName: "Anna",
      lastName: "Taylor",
      middleName: "",
      phone: "678-901-2345",
      email: "anna.taylor@example.com",
      relationship: "Mentor",
    },
    emergencyContacts: [
      {
        firstName: "Paul",
        lastName: "Martin",
        middleName: "",
        phone: "789-012-3456",
        email: "paul.martin@example.com",
        relationship: "Brother",
      },
    ],
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "F1(CPT/OPT)",
      visaTitle: null,
      startDate: new Date("2023-09-23"),
      endDate: new Date("2024-09-23"),
    },
    onboardingStatus: "Rejected",
    onboardingFeedback: "Missing something.",
    visaStatus: {
      currentDocument: "OPT Receipt",
      documents: {
        optReceipt: {
          file: "opt_receipt_bob_williams.pdf",
          status: "Rejected",
        },
        optEAD: {
          file: null,
          status: "Pending",
        },
        i983: {
          file: null,
          status: "Pending",
        },
        i20: {
          file: null,
          status: "Pending",
        },
      },
    },
  },
  // visa opt ead pending
  {
    username: "jane_smith",
    password: bcrypt.hashSync("123456", 10),
    email: "jane.smith@example.com",
    role: "employee",
    personalInfo: {
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: new Date("1985-05-20"),
      gender: "female",
    },
    address: {
      building: "456",
      street: "Oak Ave",
      city: "Smallville",
      state: "NY",
      zip: "54321",
    },
    contactInfo: {
      cellPhone: "987-654-3210",
      workPhone: "876-543-2109",
    },
    reference: {
      firstName: "Karen",
      lastName: "Miller",
      middleName: "",
      phone: "890-123-4567",
      email: "karen.miller@example.com",
      relationship: "Supervisor",
    },
    emergencyContacts: [
      {
        firstName: "Steve",
        lastName: "Williams",
        middleName: "",
        phone: "901-234-5678",
        email: "steve.williams@example.com",
        relationship: "Brother",
      },
    ],
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "F1(CPT/OPT)",
      visaTitle: null,
      startDate: new Date("2020-06-01"),
      endDate: new Date("2023-06-01"),
    },
    onboardingStatus: "Approved",
    visaStatus: {
      currentDocument: "OPT EAD",
      documents: {
        optReceipt: {
          file: "opt_receipt_jane_smith.pdf",
          status: "Approved",
        },
        optEAD: {
          file: "opt_ead_jane_smith.pdf",
          status: "Pending",
        },
        i983: {
          file: null,
          status: "Pending",
        },
        i20: {
          file: null,
          status: "Pending",
        },
      },
    },
  },
  // visa i983 rejected
  {
    username: "john_doe",
    password: bcrypt.hashSync("123456", 10),
    email: "john.doe@example.com",
    role: "employee",
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("1992-03-25"),
      gender: "male",
    },
    address: {
      building: "101",
      street: "Pine St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    contactInfo: {
      cellPhone: "321-654-9870",
      workPhone: "432-765-0981",
    },
    reference: {
      firstName: "Alice",
      lastName: "Johnson",
      middleName: "",
      phone: "567-890-1234",
      email: "alice.johnson@example.com",
      relationship: "Colleague",
    },
    emergencyContacts: [
      {
        firstName: "Mary",
        lastName: "Doe",
        middleName: "",
        phone: "678-901-2345",
        email: "mary.doe@example.com",
        relationship: "Wife",
      },
    ],
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "F1(CPT/OPT)",
      visaTitle: "Software Developer",
      startDate: new Date("2022-07-01"),
      endDate: new Date("2025-06-30"),
    },
    onboardingStatus: "Approved",
    visaStatus: {
      currentDocument: "I-983",
      documents: {
        optReceipt: {
          file: "opt_receipt_john_doe.pdf",
          status: "Approved",
        },
        optEAD: {
          file: "opt_receipt_john_doe.pdf",
          status: "Approved",
        },
        i983: {
          file: "i983_john_doe.pdf",
          status: "Rejected",
          feedback: "Invalid Info",
        },
      },
    },
  },
  // visa all approved
  {
    username: "linda_smith",
    password: bcrypt.hashSync("123456", 10),
    email: "linda.smith@example.com",
    role: "employee",
    personalInfo: {
      firstName: "Linda",
      lastName: "Smith",
      dateOfBirth: new Date("1980-10-20"),
      gender: "female",
    },
    address: {
      building: "789",
      street: "Oak St",
      city: "Springfield",
      state: "IL",
      zip: "62704",
    },
    contactInfo: {
      cellPhone: "654-321-9876",
      workPhone: "765-432-1098",
    },
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "F1(CPT/OPT)",
      visaTitle: "Software Developer",
      startDate: new Date("2022-07-01"),
      endDate: new Date("2025-06-30"),
    },
    onboardingStatus: "Approved",
    reference: {
      firstName: "Mark",
      lastName: "Davis",
      middleName: "",
      phone: "789-012-3456",
      email: "mark.davis@example.com",
      relationship: "Former Manager",
    },
    emergencyContacts: [
      {
        firstName: "John",
        lastName: "Smith",
        middleName: "",
        phone: "890-123-4567",
        email: "john.smith@example.com",
        relationship: "Husband",
      },
    ],
    visaStatus: {
      currentDocument: "I-983",
      documents: {
        optReceipt: {
          file: "opt_receipt_linda_smith.pdf",
          status: "Approved",
        },
        optEAD: {
          file: "opt_ead_linda_smith.pdf",
          status: "Approved",
        },
        i983: {
          file: "i983_linda_smith.pdf",
          status: "Approved",
        },
        i20: {
          file: "i20_linda_smith.pdf",
          status: "Approved",
        },
      },
    },
  },
];

export default users;
