import bcrypt from "bcryptjs";
const users = [
  {
    username: "hrtest",
    password: bcrypt.hashSync("123456", 10),
    email: "hr@email.com",
    role: "hr",
    personalInfo: {
      firstName: "Jane",
      lastName: "Smith",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "john_doe",
    password: bcrypt.hashSync("123456", 10),
    email: "john.doe@example.com",
    role: "employee",
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("1990-01-15"),
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
      cellPhone: "123-456-7890",
      workPhone: "234-567-8901",
    },
    citizenshipStatus: {
      isPermanentResident: true,
      citizenshipType: "Green Card",
      workAuthorizationType: "H1-B",
      visaTitle: "Software Engineer",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2025-01-01"),
    },
    onboardingStatus: "Pending",
    visaStatus: {
      currentDocument: "OPT EAD",
      documents: {
        optReceipt: {
          file: "opt_receipt.pdf",
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
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Citizen",
      workAuthorizationType: null,
      visaTitle: null,
      startDate: null,
      endDate: null,
    },
    onboardingStatus: "Pending",
    visaStatus: {
      currentDocument: null,
      documents: {
        optReceipt: {
          file: null,
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
  {
    username: "alice_johnson",
    password: bcrypt.hashSync("123456", 10),
    email: "alice.johnson@example.com",
    role: "employee",
    personalInfo: {
      firstName: "Alice",
      lastName: "Johnson",
      dateOfBirth: new Date("1992-03-12"),
      gender: "female",
    },
    address: {
      building: "789",
      street: "Pine St",
      city: "Springfield",
      state: "IL",
      zip: "62704",
    },
    contactInfo: {
      cellPhone: "321-654-0987",
      workPhone: "123-456-7892",
    },
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "F1(CPT/OPT)",
      visaTitle: "Intern",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2024-06-01"),
    },
    onboardingStatus: "Pending",
    visaStatus: {
      currentDocument: "OPT Receipt",
      documents: {
        optReceipt: {
          file: "opt_receipt_alice.pdf",
          status: "Pending",
        },
        optEAD: {
          file: "opt_ead_alice.pdf",
          status: "Pending",
        },
        i983: {
          file: "i983_alice.pdf",
          status: "Pending",
        },
        i20: {
          file: "i20_alice.pdf",
          status: "Pending",
        },
      },
    },
  },
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
    citizenshipStatus: {
      isPermanentResident: true,
      citizenshipType: "Citizen",
      workAuthorizationType: null,
      visaTitle: null,
      startDate: null,
      endDate: null,
    },
    onboardingStatus: "Pending",
    visaStatus: {
      currentDocument: null,
      documents: {
        optReceipt: {
          file: null,
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
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Work Authorization",
      workAuthorizationType: "H1-B",
      visaTitle: "Software Developer",
      startDate: new Date("2023-02-15"),
      endDate: new Date("2026-02-15"),
    },
    onboardingStatus: "Pending",
    visaStatus: {
      currentDocument: "I-983",
      documents: {
        optReceipt: {
          file: "opt_receipt_carol.pdf",
          status: "Rejected",
          feedback: "Missing information",
        },
        optEAD: {
          file: "opt_ead_carol.pdf",
          status: "Pending",
        },
        i983: {
          file: "i983_carol.pdf",
          status: "Rejected",
          feedback: "Incomplete form",
        },
        i20: {
          file: "i20_carol.pdf",
          status: "Pending",
        },
      },
    },
  },
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
    citizenshipStatus: {
      isPermanentResident: true,
      citizenshipType: "Green Card",
      workAuthorizationType: "L2",
      visaTitle: "Project Manager",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2023-12-31"),
    },
    onboardingStatus: "Not Submitted",
    visaStatus: {
      currentDocument: "I-20",
      documents: {
        optReceipt: {
          file: "opt_receipt_david.pdf",
          status: "Approved",
        },
        optEAD: {
          file: "opt_ead_david.pdf",
          status: "Approved",
        },
        i983: {
          file: "i983_david.pdf",
          status: "Approved",
        },
        i20: {
          file: "i20_david.pdf",
          status: "Approved",
        },
      },
    },
  },
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
    citizenshipStatus: {
      isPermanentResident: false,
      citizenshipType: "Citizen",
      workAuthorizationType: null,
      visaTitle: null,
      startDate: null,
      endDate: null,
    },
    onboardingStatus: "Not Submitted",
    visaStatus: {
      currentDocument: null,
      documents: {
        optReceipt: {
          file: null,
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
];

export default users;
